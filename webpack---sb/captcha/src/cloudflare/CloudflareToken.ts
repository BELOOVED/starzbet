import { type TurnstileObject, type TurnstileOptions } from "turnstile-types";
import { voidFn } from "@sb/utils";
import { Logger } from "../logger/Logger";
import { CAPTCHA_ENABLED, INVISIBLE_SITE_KEY, VISIBLE_SITE_KEY } from "./Constants";

/**
 * New flow:
 * Attach a script and run challenges on page initialization and generate token (TOKEN_A).
 * When calling 'getToken' the already generated token (TOKEN_A) will be returned,
 * and the next token generation will be triggered with a setTimeout(10) (TOKEN_B).
 *
 * If the first token (TOKEN_A) expires because the user visited the page and didn't call login for a long time,
 * CF automatically checks for it (["refresh-expired"]: "auto"), and a new token will be generated in auto mode.
 *
 * ATTACH_PROMISE will be resolved after the generation of the first token (TOKEN_A).
 * Therefore, if 'getToken' is called immediately after attachment, it will be in a pending state until the token is generated.
 *
 *
 * CHECKS_RUN_PROMISE exists because CF doesn't have its own promises for checks.
 * It works in next case:
 * 1. User calls login.
 * 2. 'getToken' is called.
 * 3. The trigger for generating the next token is called. (sets CHECKS_RUN_PROMISE in pending)
 * 4. If the user clicks login again during this process, CHECKS_RUN_PROMISE will be in a pending state
 *    and 'getToken' will await this promise resolving.
 *
 * If ATTACH_PROMISE promise drops with error - user will send invalid token
 * But, when user clicks 'login' again attachCloudflareScript will be called again.
 * */

declare global {
  interface Window {
    turnstile: TurnstileObject;
  }
}

type TChecksRunPromise = {
  promise: null | Promise<void>;
  resolve: () => void;
  reject: (error?: unknown) => void;
}

type TCaptchaStatus = {
  id: string | null;
  checksRunPromise: TChecksRunPromise;
  siteKey: string | undefined;
  type: "visible" | "invisible";
}

type TTurnstileViewOptions = Pick<TurnstileOptions, "size" | "theme">

type TVisibleCaptchaSubscriber = (isSolved: boolean) => void;

let dummyElement: HTMLDivElement | null = null;

// Support SSR
const getDummyElement = () => {
  if (dummyElement) {
    return dummyElement;
  }

  dummyElement = appendDummyElement();

  return dummyElement;
};

const appendDummyElement = () => {
  const dummyElement = document.createElement("div");
  dummyElement.style.display = "none";
  document.body.appendChild(dummyElement);

  return dummyElement;
};

let ATTACH_PROMISE: Promise<void> | null = null;

const VISIBLE_CAPTCHA: TCaptchaStatus = {
  type: "visible",
  id: null,
  checksRunPromise: {
    promise: null,
    resolve: voidFn,
    reject: voidFn,
  },
  siteKey: VISIBLE_SITE_KEY,
};

let VISIBLE_CAPTCHA_SUBSCRIBERS: TVisibleCaptchaSubscriber[] = [];

const subscribeVisibleCaptchaSolve = (callback: TVisibleCaptchaSubscriber) => {
  VISIBLE_CAPTCHA_SUBSCRIBERS.push(callback);

  return () => {
    VISIBLE_CAPTCHA_SUBSCRIBERS = VISIBLE_CAPTCHA_SUBSCRIBERS.filter((subscriber) => subscriber != callback);
  };
};

const notifyVisibleCaptchaSubscribers = (isSolved: boolean) => {
  VISIBLE_CAPTCHA_SUBSCRIBERS.forEach((subscriber) => subscriber(isSolved));
};

const INVISIBLE_CAPTCHA: TCaptchaStatus = {
  type: "invisible",
  id: null,
  checksRunPromise: {
    promise: null,
    resolve: voidFn,
    reject: voidFn,
  },
  siteKey: INVISIBLE_SITE_KEY,
};

const runChallenge = (captcha: TCaptchaStatus, element: HTMLDivElement, options: TTurnstileViewOptions = {}) => {
  if (!captcha.siteKey) {
    throw new Error(`[Cloudflare turnstile] SITE_KEY for ${captcha.type} captcha is undefined`);
  }

  if (captcha.type === "visible") {
    notifyVisibleCaptchaSubscribers(false);
  }

  /**
   * Set CHECKS_RUN_PROMISE in pending (for next token)
   * */
  captcha.checksRunPromise.promise = new Promise((resolve, reject) => {
    captcha.checksRunPromise.resolve = resolve;
    captcha.checksRunPromise.reject = reject;
  });

  captcha.id = window.turnstile.render(
    element,
    {
      ...options,
      sitekey: captcha.siteKey,
      /**
       * Trigger generate in auto mode if last token expired
       * */
      ["refresh-expired"]: "auto",
      /**
       * Called when checks done
       * */
      callback: () => {
        /**
         * Resolves CHECKS_RUN_PROMISE (CF don't have promises for run)
         * */
        captcha.checksRunPromise.resolve();

        if (captcha.type === "visible") {
          notifyVisibleCaptchaSubscribers(true);
        }

        /**
         * Resolve ATTACH_PROMISE (needed for first getToken)
         * window.turnstile.getResponse method returns last generated token
         * */
      },
      ["expired-callback"]: () => {
        if (captcha.type === "visible") {
          notifyVisibleCaptchaSubscribers(false);
        }
      },
      ["error-callback"]: (error?: unknown) => {
        captcha.checksRunPromise.reject(error);
      },
    },
  );
};

const attachCloudflareScript = () => {
  if (!CAPTCHA_ENABLED) {
    return Promise.resolve();
  }

  if (!ATTACH_PROMISE) {
    ATTACH_PROMISE = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.onload = () => {
        /*If prod and env var CLOUDFLARE_TURNSTILE_INVISIBLE_SITE_KEY not setted - skip*/
        if (INVISIBLE_CAPTCHA.siteKey) {
          runInvisibleCaptcha();
        }

        resolve();
      };
      script.onerror = (err) => {
        script.remove();
        ATTACH_PROMISE = null;
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(err);
      };
      document.body.appendChild(script);
    });
  }

  return ATTACH_PROMISE;
};

const runInvisibleCaptcha = () => {
  runChallenge(INVISIBLE_CAPTCHA, getDummyElement());
};

/**
 * Render captcha
 * */
const runVisibleCaptcha = async (element: HTMLDivElement, options?: TTurnstileViewOptions) => {
  if (!CAPTCHA_ENABLED) {
    return;
  }

  await attachCloudflareScript();

  runChallenge(VISIBLE_CAPTCHA, element, options);
};

const disposeVisibleCaptcha = async () => {
  const widgetId = VISIBLE_CAPTCHA.id;

  if (!widgetId) {
    return;
  }

  try {
    /**
     * Check that captcha script was loaded;
     * */
    await attachCloudflareScript();

    window.turnstile.remove(widgetId);
  } catch (e) {
    Logger.error.app("[Cloudflare turnstile] Can't dispose captcha", e);
  }

  VISIBLE_CAPTCHA.id = null;
  VISIBLE_CAPTCHA.checksRunPromise.promise = null;
  VISIBLE_CAPTCHA.checksRunPromise.reject = voidFn;
  VISIBLE_CAPTCHA.checksRunPromise.resolve = voidFn;
};

/**
 * Returns the already generated token and trigger generating a new token for the next call
 * */
const getInvisibleCaptchaCloudflareToken = async () => {
  await attachCloudflareScript();

  if (INVISIBLE_CAPTCHA.checksRunPromise.promise) {
    await INVISIBLE_CAPTCHA.checksRunPromise.promise;
  }

  const widgetId = INVISIBLE_CAPTCHA.id;

  if (!widgetId) {
    return "error: widgetId undefined";
  }

  setTimeout(
    () => {
      /**
       * Triggers next token generating
       * */
      runInvisibleCaptcha();
    },
    10,
  );

  return window.turnstile.getResponse(widgetId) || "error";
};

const getVisibleCaptchaCloudflareToken = async () => {
  if (!VISIBLE_CAPTCHA.checksRunPromise.promise) {
    throw new Error("Cloudflare visible captcha wasn't rendered");
  }

  await VISIBLE_CAPTCHA.checksRunPromise.promise;

  const widgetId = VISIBLE_CAPTCHA.id;

  if (!widgetId) {
    return "error: widgetId undefined";
  }

  return window.turnstile.getResponse(widgetId) || "error";
};

const getCloudflareToken = (visible: boolean) => visible ? getVisibleCaptchaCloudflareToken() : getInvisibleCaptchaCloudflareToken();

export type { TTurnstileViewOptions };

export {
  attachCloudflareScript,
  getCloudflareToken,
  runVisibleCaptcha,
  disposeVisibleCaptcha,
  subscribeVisibleCaptchaSolve,
};

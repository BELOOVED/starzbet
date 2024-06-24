interface IRunner {
  t: Promise<string>;
  d: () => Promise<void>;
}

type TRunnerConstructor = (timestamp: number, apiUrl: string) => Promise<IRunner>;

type TChallengesRunner = () => Promise<string>;

const TIMEOUTS = {
  loading: 4000,
  init: 5000,
  runtime: 5000,
};

const RETRY_ATTEMPTS = {
  loading: 2,
};

let INIT_TIMESTAMP: number | null = null;
let LOAD_FAILED = false;
let VM_DISPOSE: (() => Promise<void>) | null = null;
const packageName = "[ВоtВуе] ";

function generateId(length: number) {
  const loverCases = new Array(26).fill(null).map((_, i) => String.fromCharCode(97 + i));
  const upperCases = new Array(26).fill(null).map((_, i) => String.fromCharCode(65 + i));
  const numbers = new Array(10).fill(null).map((_, i) => String(i));
  const concatted = loverCases.concat(upperCases, numbers);

  const arrLength = concatted.length;

  return new Array(length)
    .fill(null)
    .map(() => concatted[Math.floor(Math.random() * arrLength)])
    .join("");
}

/* Can't use here generateUserId because test can't mock localStorage at init */
let userId = "";
let sessionId = "";

function generateUserId() {
  if (userId) {
    return userId;
  }

  try {
    const saved = localStorage.getItem("__botbye_uid");

    if (saved) {
      userId = saved;

      return userId;
    }

    userId = generateId(10);

    localStorage.setItem("__botbye_uid", userId);

    return userId;
  } catch (e) {
    return generateId(10);
  }
}

function generateSessionId() {
  if (sessionId) {
    return sessionId;
  }

  try {
    const saved = sessionStorage.getItem("__botbye_sid");

    if (saved) {
      sessionId = saved;

      return sessionId;
    }

    sessionId = generateId(8);

    sessionStorage.setItem("__botbye_sid", userId);

    return sessionId;
  } catch (e) {
    return generateId(8);
  }
}

let vmId = generateId(8);

const tokenBuilder = (payload: string) => `visitorId=${generateUserId()}&sessionId=${generateSessionId()}&token=${encodeURIComponent(payload)}`;

const createError = (message: string, e?: unknown) => {
  if (e instanceof Error) {
    return new Error(`${message} ${e.message}`);
  }

  return new Error(message);
};

const awaitWithTimeout = async <T>(promise: Promise<T>, ms: number, timeoutMessage: string) => {
  let timer: null | ReturnType<typeof setTimeout> = null;

  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(
      () => {
        resolve(null);
      },
      ms,
    );
  });

  const result = await Promise.race([promise, timeout]);

  if (timer) {
    clearTimeout(timer);
  }
  if (!result) {
    throw new Error(timeoutMessage);
  }

  return result;
};

const withRetryAndTimeout = async <T>(promiseFactory: () => Promise<T>, attempts: number, ms: number, timeoutMessage: string) => {
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const result = await awaitWithTimeout(promiseFactory(), ms, timeoutMessage);

      return result;
    } catch (e) {

    }
  }

  throw new Error(timeoutMessage + ` (${attempts} attempts)`);
};

const loadRunnerCode = async (url: string, siteKey: string) => {
  try {
    const promiseFactory = () => fetch(`${url}/challenges/v1/${siteKey}/${vmId}`).then(
      async (r) => {
        if (!r.ok) {
          const message = await r.text();
          throw createError(message);
        }

        const code = await r.text();
        const timestamp = r.headers.get("X-Server-Timestamp");

        return {
          code,
          timestamp,
        };
      },
    );

    return await withRetryAndTimeout(
      promiseFactory,
      RETRY_ATTEMPTS.loading,
      TIMEOUTS.loading,
      "loading.timeout",
    );
  } catch (e) {
    throw createError("error.runner.loading", e);
  }
};

const parseRunnerCode = (runnerCode: string) => {
  try {
    return new Function("tsmp", "api", runnerCode) as unknown as TRunnerConstructor;
  } catch (e) {
    throw createError("error.runner.parse", e);
  }
};

const initRunner = async (runnerConstructor: TRunnerConstructor, timestamp: number, apiUrl: string) => {
  let runner: IRunner;
  try {
    runner = await awaitWithTimeout(runnerConstructor(timestamp, apiUrl), TIMEOUTS.init, "init.timeout");

    runner.t = (() => vmId) as unknown as Promise<string>;

    VM_DISPOSE = runner.d;

    return runner;
  } catch (e) {
    throw createError("error.runner.init", e);
  }
};

const main = async (url: string, siteKey: string) => {
  let runner: IRunner;
  try {
    const { code, timestamp } = await loadRunnerCode(url, siteKey);

    const normalizedTimestamp = timestamp ? Number.parseFloat(timestamp) * 1000 : Date.now();

    const runnerConstructor = parseRunnerCode(code);

    runner = await initRunner(runnerConstructor, normalizedTimestamp, url);
  } catch (e) {
    if (e instanceof Error) {
      LOAD_FAILED = true;
      const { message } = e;

      return () => Promise.resolve(tokenBuilder(packageName + `error.init ${message}`));
    }

    return () => Promise.resolve(tokenBuilder(packageName + "error.init.unknown"));
  }

  return async () => {
    try {
      return await awaitWithTimeout(runner.t, TIMEOUTS.runtime, "runtime.timeout");
    } catch (e) {
      const { message } = createError("error.runner.runtime", e);

      return tokenBuilder(packageName + message);
    }
  };
};

let initPromise: Promise<TChallengesRunner> | null = null;

const initChallengesMain = async (url: string, siteKey: string, withoutReload = false) => {
  if (initPromise) {
    throw createError("Init script already called");
  }

  INIT_TIMESTAMP = Date.now();
  LOAD_FAILED = false;

  initPromise = new Promise((resolve) => {
    main(url, siteKey).then((runner) => {
      if (!withoutReload) {
        reloadLoop(url, siteKey);
      }
      resolve(runner);
    }).catch(
      (e) => {
        const { message } = createError("error.main", e);
        if (!withoutReload) {
          reloadLoop(url, siteKey);
        }
        resolve(() => Promise.resolve(tokenBuilder(packageName + message)));
      },
    );
  });

  await initPromise;

  return runChallenge;
};

const reloadLoop = (url: string, siteKey: string) => {
  setTimeout(
    () => {
      const now = Date.now();
      const elapsed = now - (INIT_TIMESTAMP ?? 0);

      if (LOAD_FAILED || elapsed < 0 || elapsed > 5 * 60 * 1000) {
        dispose();
        vmId = generateId(8);
        void initChallengesMain(url, siteKey);
      } else {
        reloadLoop(url, siteKey);
      }
    },
    10000,
  );
};

const runChallenge: TChallengesRunner = async () => {
  if (!initPromise) {
    throw createError("Init script should be called first");
  }

  const runner = await initPromise;

  return runner();
};

const dispose = () => {
  if (VM_DISPOSE) {
    VM_DISPOSE().catch(() => void 0);
    VM_DISPOSE = null;
  }

  initPromise = null;
};

const initTelemetry = async (url: string, siteKey: string) => {
  try {
    const promiseFactory = () => fetch(`${url}/analytics/v1/${siteKey}`).then(
      async (r) => {
        if (!r.ok) {
          const message = await r.text();
          throw createError(message);
        }

        return r.text();
      },
    );

    const code = await withRetryAndTimeout(
      promiseFactory,
      RETRY_ATTEMPTS.loading,
      TIMEOUTS.loading,
      "loading.timeout",
    );

    new Function("sk", "api", code)(siteKey, url);
  } catch {
  }
};

const initChallenges = (url: string, siteKey: string, withoutReload = false, withoutTelemetry = false) => {
  if (!withoutTelemetry) {
    initTelemetry(url, siteKey).catch(() => void 0);
  }

  return initChallengesMain(url, siteKey, withoutReload);
};

export {
  initChallenges,
  runChallenge,
  dispose,
  TIMEOUTS,
  RETRY_ATTEMPTS,
  reloadLoop,
  initTelemetry,
};

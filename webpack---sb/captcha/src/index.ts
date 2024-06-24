import { type IMetadata } from "@sb/network-bus/Model";
import { attachCloudflareScript, getCloudflareToken } from "./cloudflare/CloudflareToken";
import { Logger } from "./logger/Logger";
import { CloudflareTurnstile } from "./cloudflare/CloudflareTurnstile";
import { CAPTCHA_ENABLED, INVISIBLE_SITE_KEY, VISIBLE_SITE_KEY } from "./cloudflare/Constants";
import { useIsTurnstileSolved } from "./cloudflare/UseIsTurnstileSolved";

const initCaptcha = () => {
  if (!CAPTCHA_ENABLED) {
    return;
  }

  attachCloudflareScript()
    .catch((e) => Logger.error.app("[Cloudflare turnstile] Can't load cloudflare script", e));
};

const createMetadata = (token: string, siteKey: string): IMetadata => ({
  ["cf-validation-token"]: token,
  ["cf-site-key"]: siteKey,
});

const loadCaptchaMetadata = async (visible = false): Promise<IMetadata> => {
  if (!CAPTCHA_ENABLED) {
    return createMetadata("disabled", "");
  }

  const siteKey = visible ? VISIBLE_SITE_KEY : INVISIBLE_SITE_KEY;

  if (!siteKey) {
    Logger.error.app(`[Cloudflare turnstile] siteKey for ${visible ? "visible" : "invisible"} not setted`);
  }

  try {
    const token = await getCloudflareToken(visible);

    return createMetadata(token, siteKey ?? "");
  } catch (e) {
    Logger.error.app("[Cloudflare turnstile]", e);

    return createMetadata("error", siteKey ?? "");
  }
};

export {
  initCaptcha,
  loadCaptchaMetadata,
  CloudflareTurnstile,
  useIsTurnstileSolved,
};

import { isE2E, isProd } from "@sb/utils";
import { initChallenges, runChallenge } from "@sb/protection-client-internal";
import { Logger } from "./Utils/Logger";

let getProtectionToken = (): Promise<string> => Promise.resolve(`visitorId=0000000000&token=${encodeURIComponent("[ВоtВуе]")}`);

const attachProtection = () => {
  if (isProd && !isE2E) {
    const SITE_KEY = process.env.PROTECTION_SITE_KEY;
    const URL = process.env.PROTECTION_API_URL;

    if (!SITE_KEY) {
      Logger.error("[BotBye] SITE_KEY not found");

      return;
    }

    if (!URL) {
      Logger.error("[BotBye] URL not found");

      return;
    }

    /**
     * If runChallenge calls while init promise in pending
     * it's also awaits for resolve under hood and then calls challenges
     * initPromise resolves () => Promise<string> in any cases even if drops error
     * */
    getProtectionToken = runChallenge;

    initChallenges(URL, SITE_KEY).catch((e) => {
      /**
       * If initChallenges won't be called more than once, this part of the code is unreachable.
       * */
      if (e instanceof Error) {
        Logger.error(`[BotBye] Can't init. ${e.message}`);
      } else {
        Logger.error("[BotBye] Can't init");
      }
    });
  }
};

attachProtection();

export { getProtectionToken };

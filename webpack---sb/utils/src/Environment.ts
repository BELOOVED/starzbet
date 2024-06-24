type TOperatingSystem = "MACOS" | "IOS" | "WINDOWS" | "ANDROID" | "LINUX";

type TBrowser = "Chrome" | "Firefox" | "Safari" | "Opera" | "Edge" | "Unknown";

const FALLBACK_OPERATING_SYSTEM: TOperatingSystem = "WINDOWS";

/**
 * Despite untyped and deprecated usages it is the best solution right now
 */
const detectOperatingSystem = (): TOperatingSystem => {
  try {
    const userAgent = window.navigator.userAgent;
    // @ts-ignore
    const platform = window.navigator?.userAgentData?.platform || window.navigator.platform;

    if (["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(platform) !== -1) {
      return "MACOS";
    }

    if (["iPhone", "iPad", "iPod"].indexOf(platform) !== -1) {
      return "IOS";
    }

    if (/Linux/.test(platform)) {
      return "LINUX";
    }

    if (/Android/.test(userAgent)) {
      return "ANDROID";
    }

    if (["Win32", "Win64", "Windows", "WinCE"].indexOf(platform) !== -1) {
      return "WINDOWS";
    }

    return FALLBACK_OPERATING_SYSTEM;
  } catch {
    return FALLBACK_OPERATING_SYSTEM;
  }
};

const detectBrowser = (): TBrowser => {
  try {

    const userAgent = navigator.userAgent;

    if (/chrome|chromium|crios/i.exec(userAgent)) {
      return "Chrome";
    }
    if (/firefox|fxios/i.exec(userAgent)) {
      return "Firefox";
    }

    if (/safari/i.exec(userAgent)) {
      return "Safari";
    }
    if (/opr\//i.exec(userAgent)) {
      return "Opera";
    }

    if (/edg/i.exec(userAgent)) {
      return "Edge";
    }

    return "Unknown";
  } catch {
    return "Unknown";
  }
};

const detectIsMobile = () => {
  try {
    return /ipad|iphone|ipod|android|blackberry|webos|windows phone|mobile/i.test(navigator.userAgent.toLowerCase());
  } catch {
    return false;
  }
};

const OPERATING_SYSTEM = detectOperatingSystem();
const BROWSER = detectBrowser();
const IS_MOBILE = detectIsMobile();
const IS_SERVER = typeof window === "undefined";

export {
  type TOperatingSystem,
  type TBrowser,
  OPERATING_SYSTEM,
  BROWSER,
  IS_MOBILE,
  IS_SERVER,
};

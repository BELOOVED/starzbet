import { IS_SERVER, OPERATING_SYSTEM } from "./Environment";

const DEVICE_INFO = {
  applicationVersion: "x.x.x",
  operatingSystem: OPERATING_SYSTEM,
  platform: "BROWSER" as const,
  userAgent: IS_SERVER ? "user_agent" : window.navigator.userAgent,
};

export { DEVICE_INFO };

// eslint-disable-next-line no-restricted-imports
import { IS_MOBILE, IS_SERVER } from "@sb/utils";
import { type TPlatform } from "../../Model/TPlatform";

/**
 * Only for Client Side
 */
const isMobileClientSide = () => {
  if (IS_SERVER) {
    throw new Error("[isMobileClientSide]: Unexpected usage on Server Side");
  }

  return IS_MOBILE;
};

const IS_MOBILE_CLIENT_SIDE = isMobileClientSide();

const PLATFORM_CLIENT_SIDE: TPlatform = IS_MOBILE_CLIENT_SIDE
  ? "mobile"
  : "desktop";

export { PLATFORM_CLIENT_SIDE, IS_MOBILE_CLIENT_SIDE };

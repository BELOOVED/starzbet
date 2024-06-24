// eslint-disable-next-line no-restricted-imports
import { getNotNil, IS_MOBILE, IS_SERVER } from "@sb/utils";
import { type TPlatform } from "../../Model/TPlatform";

interface IWithDeviceInfoState {
  deviceInfo: TPlatform;
}

const PLATFORM_CLIENT_SIDE = IS_MOBILE
  ? "mobile"
  : "desktop";

const getDeviceInfoState = (device?: IWithDeviceInfoState["deviceInfo"]): IWithDeviceInfoState => ({
  deviceInfo: IS_SERVER
    ? getNotNil(
      device,
      ["getDeviceInfoState"],
      "deviceInfo",
    )
    : PLATFORM_CLIENT_SIDE,
});

export type { IWithDeviceInfoState };
export {
  getDeviceInfoState,
};

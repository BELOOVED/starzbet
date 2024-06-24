// eslint-disable-next-line no-restricted-imports
import { IS_MOBILE } from "@sb/utils";
import { IS_SERVER_SIDE_SETUP } from "../../IsServerSideSetup";
import { type IWithDeviceInfoState } from "./DeviceInfoState";

const isMobileStateSelector = (state: IWithDeviceInfoState) =>
  state.deviceInfo === "mobile";

const isMobileClient = () => IS_MOBILE;

const isMobileSelector = IS_SERVER_SIDE_SETUP
  ? isMobileStateSelector
  : isMobileClient;

export { isMobileSelector };

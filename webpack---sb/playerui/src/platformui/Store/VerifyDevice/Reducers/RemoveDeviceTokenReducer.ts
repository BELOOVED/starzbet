import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type removeDeviceTokenAction } from "../VerifyDeviceActions";

const removeDeviceTokenReducer: TReducer<TPlatformAppState, typeof removeDeviceTokenAction> = (
  state,
) => ({
  ...state,
  tokenDto: null,
  device: null,
});

export { removeDeviceTokenReducer };

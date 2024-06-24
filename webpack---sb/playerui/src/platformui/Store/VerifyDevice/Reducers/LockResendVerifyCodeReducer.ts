import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type lockResendVerifyCodeAction } from "../VerifyDeviceActions";

const lockResendVerifyCodeReducer: TReducer<TPlatformAppState, typeof lockResendVerifyCodeAction> = (
  state,
) => ({
  ...state,
  isAvailableResend: false,
});

export { lockResendVerifyCodeReducer };

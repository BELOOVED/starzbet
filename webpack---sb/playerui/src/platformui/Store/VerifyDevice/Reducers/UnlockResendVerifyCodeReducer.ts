import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type unlockResendVerifyCodeAction } from "../VerifyDeviceActions";

const unlockResendVerifyCodeReducer: TReducer<TPlatformAppState, typeof unlockResendVerifyCodeAction> = (
  state,
) => ({
  ...state,
  isAvailableResend: true,
});

export { unlockResendVerifyCodeReducer };

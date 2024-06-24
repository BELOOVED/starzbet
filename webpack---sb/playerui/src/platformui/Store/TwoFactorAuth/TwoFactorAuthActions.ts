import { type IOneTimePasswordSecretDto } from "@sb/sdk/authprofile/twofactorauthentication/dto/OneTimePasswordSecretDto";
import type { TLoginForm } from "../Auth/Forms/Login/Model";

const secretReceivedAction = (payload: IOneTimePasswordSecretDto) => ({
  type: "@PLATFORM/2FA_SECRET_RECEIVED",
  payload,
});

const backupCodesReceivedAction = (payload: string[]) => ({
  type: "@PLATFORM/2FA_BACKUP_CODES_RECEIVED",
  payload,
});

// During Login (if player switch on 2FA)
const startTwoFactorAuthStepAction = (payload: TLoginForm) => ({
  type: "@PLATFORM/2FA_START_STEP",
  payload,
});

const finishTwoFactorAuthStepAction = () => ({
  type: "@PLATFORM/2FA_FINISH_STEP",
});

export {
  secretReceivedAction,
  startTwoFactorAuthStepAction,
  finishTwoFactorAuthStepAction,
  backupCodesReceivedAction,
};

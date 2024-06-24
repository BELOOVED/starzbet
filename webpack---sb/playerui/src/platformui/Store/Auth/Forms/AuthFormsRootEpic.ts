import { combineEpics } from "redux-observable";
import { CPFCheckEpic } from "../../Form/Epics/CPFCheckEpic";
import { twoFactorAuthLoginEpic } from "../../TwoFactorAuth/Epics/FormEpics/TwoFactorAuthFormsEpic";
import { updatePasswordFormEpic } from "./UpdatePasswordByEmail/Epics/UpdatePasswordEpic";
import { forgotPasswordFormEpic } from "./ForgetPassword/Epics/ForgotPasswordEpic";
import { loginFormEpic } from "./Login/Epics/LoginEpic";
import { registrationFormEpic } from "./Registration/Epics/RegistrationEpic";
import { privateRegistrationFormEpic } from "./Registration/Epics/PrivateRegistrationEpic";
import { brazilRegistrationFormEpic } from "./Registration/Epics/BrazilRegistrationEpic";
import { doAuthorizeEpic } from "./Registration/Epics/RegistrationSubmitEpic";

const authFormsRootEpic = combineEpics(
  updatePasswordFormEpic,
  forgotPasswordFormEpic,
  loginFormEpic,
  registrationFormEpic,
  privateRegistrationFormEpic,
  brazilRegistrationFormEpic,
  CPFCheckEpic,
  doAuthorizeEpic,
  twoFactorAuthLoginEpic,
);

export { authFormsRootEpic };

import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { withParams } from "@sb/utils";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { isAuthModalByTypeSelector } from "../../../../../../common/Store/Modal/Selectors/IsAuthModalByTypeSelector";
import { type TPlatformAppState } from "../../../../PlatformInitialState";
import { FORGOT_PASSWORD_FORM_NAME } from "../Model";
import { FORGOT_PASSWORD_FORM_CONFIG } from "../ForgotPasswordFormConfig";

const forgotPasswordFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  withParams(isAuthModalByTypeSelector, EAuthModal.forgotPassword),
  FORGOT_PASSWORD_FORM_NAME,
  FORGOT_PASSWORD_FORM_CONFIG,
);

export { forgotPasswordFormEpic };

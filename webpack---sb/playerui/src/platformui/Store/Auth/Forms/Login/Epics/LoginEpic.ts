import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { withParams } from "@sb/utils";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { isAuthModalByTypeSelector } from "../../../../../../common/Store/Modal/Selectors/IsAuthModalByTypeSelector";
import { type TPlatformAppState } from "../../../../PlatformInitialState";
import { LOGIN_FORM_NAME } from "../Model";
import { LOGIN_FORM_CONFIG } from "../LoginFormConfig";

const loginFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  withParams(isAuthModalByTypeSelector, EAuthModal.login),
  LOGIN_FORM_NAME,
  LOGIN_FORM_CONFIG,
);

export { loginFormEpic };

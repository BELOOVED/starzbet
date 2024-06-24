import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { withParams } from "@sb/utils";
import { isAuthModalByTypeSelector } from "../../../../../../common/Store/Modal/Selectors/IsAuthModalByTypeSelector";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import type { TPlatformAppState } from "../../../../PlatformInitialState";
import { PRIVATE_REGISTRATION_FORM_NAME } from "../Model";
import { PRIVATE_REGISTRATION_FORM_CONFIG } from "../FormConfigs/PrivateRegistrationFormConfig";

const privateRegistrationFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  withParams(isAuthModalByTypeSelector, EAuthModal.privateRegistration),
  PRIVATE_REGISTRATION_FORM_NAME,
  PRIVATE_REGISTRATION_FORM_CONFIG,
  {
    registrationConsent: true,
  },
);

export { privateRegistrationFormEpic };

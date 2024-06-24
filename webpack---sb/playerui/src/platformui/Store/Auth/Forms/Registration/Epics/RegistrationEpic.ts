import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { withParams } from "@sb/utils";
import { isAuthModalByTypeSelector } from "../../../../../../common/Store/Modal/Selectors/IsAuthModalByTypeSelector";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { getDefaultPhoneCode } from "../../../../../../common/Utils/GetDefaultPhoneCode";
import type { TPlatformAppState } from "../../../../PlatformInitialState";
import { REGISTRATION_FORM_NAME } from "../Model";
import { REGISTRATION_FORM_CONFIG } from "../FormConfigs/RegistrationFormConfig";

const registrationFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  withParams(isAuthModalByTypeSelector, EAuthModal.registration),
  REGISTRATION_FORM_NAME,
  REGISTRATION_FORM_CONFIG,
  {
    mobilePhone: {
      code: getDefaultPhoneCode(),
    },
    registrationConsent: true,
  },
);

export { registrationFormEpic };

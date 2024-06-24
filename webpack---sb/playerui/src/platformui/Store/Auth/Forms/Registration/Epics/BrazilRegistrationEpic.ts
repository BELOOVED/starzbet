import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { DEFAULT_PHONE_CODES } from "@sb/phone-number";
import { isAuthModalByTypeSelector } from "../../../../../../common/Store/Modal/Selectors/IsAuthModalByTypeSelector";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { IS_BRAZIL } from "../../../../../Utils/RegionCheck";
import type { TPlatformAppState } from "../../../../PlatformInitialState";
import { BRAZIL_REGISTRATION_FORM_NAME } from "../Model";
import { BRAZIL_REGISTRATION_FORM_CONFIG } from "../FormConfigs/BrazilRegistrationFormConfig";

const brazilRegistrationFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  (state) => isAuthModalByTypeSelector(state, EAuthModal.registration) && IS_BRAZIL,
  BRAZIL_REGISTRATION_FORM_NAME,
  BRAZIL_REGISTRATION_FORM_CONFIG,
  {
    mobilePhone: {
      code: DEFAULT_PHONE_CODES.BRA,
    },
    registrationConsent: true,
  },
);

export { brazilRegistrationFormEpic };

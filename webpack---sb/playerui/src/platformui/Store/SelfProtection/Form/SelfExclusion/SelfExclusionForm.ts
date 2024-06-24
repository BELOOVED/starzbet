import {
  createForm,
  createFormFieldPaths,
  field,
  form,
  type IBuilder,
  submittingExtension,
  type TFieldDefs,
  validationExtension,
  withValidation,
} from "@sb/form-new";
import { call_AddSelfProtectionBagsCommand } from "@sb/sdk/SDKClient/selfprotection";
import { formSubmitEpicFactory } from "../../../../Utils/FormSubmitEpicFactory";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { selfProtectionSelfExclusionCallPayloadSelector } from "../../Selectors/SelfProtectionSelectors";
import { requestSelfProtectionBagsEpic } from "../../Epics/RequestSelfProtectionBagsEpic";
import { SELF_EXCLUSION_FORM, type TSelfExclusionFormModel } from "./SelfExclusionFormModel";

const EXTENSIONS: IBuilder["extensions"] = withValidation(formRequiredValidation());

const SELF_EXCLUSION_FORM_FIELDS: TFieldDefs<keyof TSelfExclusionFormModel> = {
  period: field({ extensions: EXTENSIONS }),
  password: field({ extensions: EXTENSIONS }),
  product: field({ extensions: EXTENSIONS }),
};

const SELF_EXCLUSION_FORM_FIELD_PATHS = createFormFieldPaths(SELF_EXCLUSION_FORM_FIELDS);

const SELF_EXCLUSION_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension],

  form: form({ fields: SELF_EXCLUSION_FORM_FIELDS }),

  epics: [
    formSubmitEpicFactory({
      formName: SELF_EXCLUSION_FORM,
      callPair: [call_AddSelfProtectionBagsCommand, selfProtectionSelfExclusionCallPayloadSelector],
      onSuccess: () => requestSelfProtectionBagsEpic,
    }),
  ],
});

export {
  SELF_EXCLUSION_FORM_FIELD_PATHS,
  SELF_EXCLUSION_FORM_CONFIG,
};

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
import { selfProtectionAccountClosureCallPayloadSelector } from "../../Selectors/SelfProtectionSelectors";
import { requestSelfProtectionBagsEpic } from "../../Epics/RequestSelfProtectionBagsEpic";
import { ACCOUNT_CLOSURE_FORM, type TAccountClosureFormModel } from "./AccountClosureFormModel";

const EXTENSIONS: IBuilder["extensions"] = withValidation(formRequiredValidation());

const ACCOUNT_CLOSURE_FORM_FIELDS: TFieldDefs<keyof TAccountClosureFormModel> = {
  period: field({ extensions: EXTENSIONS }),
  password: field({ extensions: EXTENSIONS }),
  reason: field({ extensions: EXTENSIONS }),
};

const ACCOUNT_CLOSURE_FORM_FIELD_PATHS = createFormFieldPaths(ACCOUNT_CLOSURE_FORM_FIELDS);

const ACCOUNT_CLOSURE_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension],

  form: form({ fields: ACCOUNT_CLOSURE_FORM_FIELDS }),

  epics: [
    formSubmitEpicFactory({
      formName: ACCOUNT_CLOSURE_FORM,
      callPair: [call_AddSelfProtectionBagsCommand, selfProtectionAccountClosureCallPayloadSelector],
      onSuccess: () => requestSelfProtectionBagsEpic,
    }),
  ],
});

export {
  ACCOUNT_CLOSURE_FORM_FIELD_PATHS,
  ACCOUNT_CLOSURE_FORM_CONFIG,
};

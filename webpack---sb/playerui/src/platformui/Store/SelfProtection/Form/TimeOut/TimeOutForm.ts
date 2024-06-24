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
import { selfProtectionTimeOutCallPayloadSelector } from "../../Selectors/SelfProtectionSelectors";
import { requestSelfProtectionBagsEpic } from "../../Epics/RequestSelfProtectionBagsEpic";
import { type TSelfProtectionBaseModel } from "../../Model/SelfProtectionModel";
import { TIME_OUT_FORM } from "./TimeOutFormModel";

const EXTENSIONS: IBuilder["extensions"] = withValidation(formRequiredValidation());

const TIME_OUT_FORM_FIELDS: TFieldDefs<keyof TSelfProtectionBaseModel> = {
  period: field({ extensions: EXTENSIONS }),
  password: field({ extensions: EXTENSIONS }),
};

const TIME_OUT_FORM_FIELD_PATHS = createFormFieldPaths(TIME_OUT_FORM_FIELDS);

const TIME_OUT_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension],

  form: form({ fields: TIME_OUT_FORM_FIELDS }),

  epics: [
    formSubmitEpicFactory({
      formName: TIME_OUT_FORM,
      callPair: [call_AddSelfProtectionBagsCommand, selfProtectionTimeOutCallPayloadSelector],
      onSuccess: () => requestSelfProtectionBagsEpic,
    }),
  ],
});

export {
  TIME_OUT_FORM_FIELD_PATHS,
  TIME_OUT_FORM_CONFIG,
};

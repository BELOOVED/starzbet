import {
  createForm,
  createFormFieldPaths,
  disableExtension,
  field,
  form,
  type IBuilder,
  submittingExtension,
  type TFieldDefs,
  validationExtension,
  withDisableCheck,
  withValidation,
} from "@sb/form-new";
import { call_AddSelfProtectionBagsCommand } from "@sb/sdk/SDKClient/selfprotection";
import { EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import { formSubmitEpicFactory } from "../../../../Utils/FormSubmitEpicFactory";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { canAddBagSelector, selfProtectionRealityCheckCallPayloadSelector } from "../../Selectors/SelfProtectionSelectors";
import { requestSelfProtectionBagsEpic } from "../../Epics/RequestSelfProtectionBagsEpic";
import { type TSelfProtectionBaseModel } from "../../Model/SelfProtectionModel";
import { REALITY_CHECK_FORM } from "./RealityCheckFormModel";

const EXTENSIONS: IBuilder["extensions"] = {
  ...withValidation(formRequiredValidation()),
  ...withDisableCheck<TPlatformAppState>((state) => !canAddBagSelector(state, EPlatform_SelfProtectionBagType.realityCheckByTimeBag)),
};

const REALITY_CHECK_FORM_FIELDS: TFieldDefs<keyof TSelfProtectionBaseModel> = {
  period: field({ extensions: EXTENSIONS }),
  password: field({ extensions: EXTENSIONS }),
};

const REALITY_CHECK_FORM_FIELD_PATHS = createFormFieldPaths(REALITY_CHECK_FORM_FIELDS);

const REALITY_CHECK_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension, disableExtension],

  form: form({ fields: REALITY_CHECK_FORM_FIELDS }),

  epics: [
    formSubmitEpicFactory({
      formName: REALITY_CHECK_FORM,
      callPair: [call_AddSelfProtectionBagsCommand, selfProtectionRealityCheckCallPayloadSelector],
      onSuccess: () => requestSelfProtectionBagsEpic,
    }),
  ],
});

export {
  REALITY_CHECK_FORM_FIELD_PATHS,
  REALITY_CHECK_FORM_CONFIG,
};

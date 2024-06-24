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
import { EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import { call_AddSelfProtectionBagsCommand } from "@sb/sdk/SDKClient/selfprotection";
import { formSubmitEpicFactory } from "../../../../Utils/FormSubmitEpicFactory";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { formResetDecorator } from "../../../Form/Utils/FormResetDecorator";
import {
  canAddBagSelector,
  selfProtectionDepositLimitCallPayloadSelector,
  selfProtectionDepositLimitFormInitialValueSelector,
} from "../../Selectors/SelfProtectionSelectors";
import { requestSelfProtectionBagsEpic } from "../../Epics/RequestSelfProtectionBagsEpic";
import { type TSelfProtectionWithAmountModel } from "../../Model/SelfProtectionModel";
import { DEPOSIT_LIMIT_FORM } from "./DepositLimitFormModel";

const EXTENSIONS: IBuilder["extensions"] = {
  ...withValidation(formRequiredValidation()),
  ...withDisableCheck<TPlatformAppState>((state) => !canAddBagSelector(state, EPlatform_SelfProtectionBagType.maxDepositBag)),
};

const DEPOSIT_LIMIT_FORM_FIELDS: TFieldDefs<keyof TSelfProtectionWithAmountModel> = {
  period: field({ extensions: EXTENSIONS }),
  amount: field({ extensions: EXTENSIONS }),
  password: field({ extensions: EXTENSIONS }),
};

const DEPOSIT_LIMIT_FORM_FIELD_PATHS = createFormFieldPaths(DEPOSIT_LIMIT_FORM_FIELDS);

const DEPOSIT_LIMIT_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension, disableExtension],

  form: form({ fields: DEPOSIT_LIMIT_FORM_FIELDS }),

  epics: [
    formSubmitEpicFactory({
      formName: DEPOSIT_LIMIT_FORM,
      callPair: [call_AddSelfProtectionBagsCommand, selfProtectionDepositLimitCallPayloadSelector],
      onSuccess: () => requestSelfProtectionBagsEpic,
    }),
  ],

  decorators: [
    formResetDecorator(
      DEPOSIT_LIMIT_FORM,
      selfProtectionDepositLimitFormInitialValueSelector,
    ),
  ],
});

export {
  DEPOSIT_LIMIT_FORM_FIELD_PATHS,
  DEPOSIT_LIMIT_FORM_CONFIG,
};

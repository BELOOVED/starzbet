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
  selfProtectionPlayLimitCallPayloadSelector,
  selfProtectionPlayLimitFormInitialValueSelector,
} from "../../Selectors/SelfProtectionSelectors";
import { requestSelfProtectionBagsEpic } from "../../Epics/RequestSelfProtectionBagsEpic";
import { type TSelfProtectionWithAmountModel } from "../../Model/SelfProtectionModel";
import { PLAY_LIMIT_FORM } from "./PlayLimitFormModel";

const EXTENSIONS: IBuilder["extensions"] = {
  ...withValidation(formRequiredValidation()),
  ...withDisableCheck<TPlatformAppState>((state) => !canAddBagSelector(state, EPlatform_SelfProtectionBagType.playLimitBag)),
};

const PLAY_LIMIT_FORM_FIELDS: TFieldDefs<keyof TSelfProtectionWithAmountModel> = {
  period: field({ extensions: EXTENSIONS }),
  amount: field({ extensions: EXTENSIONS }),
  password: field({ extensions: EXTENSIONS }),
};

const PLAY_LIMIT_FORM_FIELD_PATHS = createFormFieldPaths(PLAY_LIMIT_FORM_FIELDS);

const PLAY_LIMIT_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension, disableExtension],

  form: form({ fields: PLAY_LIMIT_FORM_FIELDS }),

  epics: [
    formSubmitEpicFactory({
      formName: PLAY_LIMIT_FORM,
      callPair: [call_AddSelfProtectionBagsCommand, selfProtectionPlayLimitCallPayloadSelector],
      onSuccess: () => requestSelfProtectionBagsEpic,
    }),
  ],

  decorators: [
    formResetDecorator(
      PLAY_LIMIT_FORM,
      selfProtectionPlayLimitFormInitialValueSelector,
    ),
  ],
});

export {
  PLAY_LIMIT_FORM_FIELD_PATHS,
  PLAY_LIMIT_FORM_CONFIG,
};

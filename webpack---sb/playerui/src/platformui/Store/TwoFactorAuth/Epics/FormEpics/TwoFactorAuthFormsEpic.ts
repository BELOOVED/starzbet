import { combineEpics } from "redux-observable";
import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import {
  TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_CONFIRM_FORM_NAME,
  TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
} from "../../SubmitForm/Model";
import {
  TWO_FACTOR_AUTH_CONFIRM_FORM_CONFIG,
  TWO_FACTOR_AUTH_DISABLE_FORM_CONFIG,
  TWO_FACTOR_AUTH_ENABLE_FORM_CONFIG,
} from "../../SubmitForm/TwoFactorAuthFormConfig";
import {
  twoFactorAuthActivateFormEnableSelector,
  twoFactorAuthDeactivateFormEnableSelector,
  twoFactorAuthSelectors,
} from "../../TwoFactorAuthSelectors";

const enableFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  twoFactorAuthActivateFormEnableSelector,
  TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_ENABLE_FORM_CONFIG,
);

const disableFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  twoFactorAuthDeactivateFormEnableSelector,
  TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_DISABLE_FORM_CONFIG,
);

const twoFactorAuthFormsEpic = combineEpics(
  enableFormEpic,
  disableFormEpic,
);

const twoFactorAuthLoginEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  twoFactorAuthSelectors.isTwoFactorAuthStep,
  TWO_FACTOR_AUTH_CONFIRM_FORM_NAME,
  TWO_FACTOR_AUTH_CONFIRM_FORM_CONFIG,
);

export { twoFactorAuthFormsEpic, twoFactorAuthLoginEpic };

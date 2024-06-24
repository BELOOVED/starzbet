import type { AnyAction } from "redux";
import {
  createForm,
  form,
  type IFormAction,
  type IWithFormsState,
  submittingExtension,
  type TFormEpic,
  validationExtension,
} from "@sb/form-new";
import { loginAfterTwoFactorAuthSubmitEpic } from "../../Auth/Forms/Login/Epics/LoginSubmitEpic";
import { twoFactorAuthDisableFormSubmitEpic, twoFactorAuthEnableFormSubmitEpic } from "../Epics/FormEpics/TwoFactorAuthFormSubmitEpics";
import { TWO_FACTOR_AUTHS_FORM_FIELDS } from "./Model";

const twoFactorAuthFormConfigFactory = <T extends IWithFormsState>(...epics: TFormEpic<IFormAction, AnyAction, T>[]) => createForm<T>({
  extensions: [validationExtension, submittingExtension],
  form: form({
    fields: TWO_FACTOR_AUTHS_FORM_FIELDS,
  }),
  epics,
});

const TWO_FACTOR_AUTH_ENABLE_FORM_CONFIG = twoFactorAuthFormConfigFactory(twoFactorAuthEnableFormSubmitEpic);
const TWO_FACTOR_AUTH_DISABLE_FORM_CONFIG = twoFactorAuthFormConfigFactory(twoFactorAuthDisableFormSubmitEpic);
const TWO_FACTOR_AUTH_CONFIRM_FORM_CONFIG = twoFactorAuthFormConfigFactory(loginAfterTwoFactorAuthSubmitEpic);

export { TWO_FACTOR_AUTH_ENABLE_FORM_CONFIG, TWO_FACTOR_AUTH_DISABLE_FORM_CONFIG, TWO_FACTOR_AUTH_CONFIRM_FORM_CONFIG };

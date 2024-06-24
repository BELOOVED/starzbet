import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { platformui_2fa_checkInput_warn_length } from "@sb/translates/platformui/CommonTKeys";
import { formMinWidthValidation, formRequiredValidation } from "../../Form/Utils/FormValidations";

type TWithOneTimePassword = {
  oneTimePassword: string;
}

const TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME = "twoFactorAuthActivate";
const TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME = "twoFactorAuthDeactivate";
const TWO_FACTOR_AUTH_CONFIRM_FORM_NAME = "twoFactorAuthConfirm";

const TWO_FACTOR_AUTHS_FORM_FIELDS: TFieldDefs<keyof TWithOneTimePassword> = {
  oneTimePassword: field({
    extensions: withValidation(formRequiredValidation(), formMinWidthValidation(platformui_2fa_checkInput_warn_length, 6)),
  }),
};

const TWO_FACTOR_AUTHS_FORM_PATH = createFormFieldPaths(TWO_FACTOR_AUTHS_FORM_FIELDS);

export type { TWithOneTimePassword };
export {
  TWO_FACTOR_AUTHS_FORM_FIELDS,
  TWO_FACTOR_AUTHS_FORM_PATH,
  TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_CONFIRM_FORM_NAME,
};

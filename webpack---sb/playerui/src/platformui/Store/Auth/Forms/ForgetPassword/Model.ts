import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formEmailValidation, formRequiredValidation } from "../../../Form/Utils/FormValidations";

type TWithEmail = {
  email: string;
}

const FORGOT_PASSWORD_FORM_NAME = "forgotPassword";

const FORGOT_PASSWORD_FORM_FIELDS: TFieldDefs<keyof TWithEmail> = {
  email: field({ extensions: withValidation(formRequiredValidation(), formEmailValidation()) }),
};

const FORGOT_PASSWORD_FORM_PATH = createFormFieldPaths(FORGOT_PASSWORD_FORM_FIELDS);

export type { TWithEmail };
export {
  FORGOT_PASSWORD_FORM_FIELDS,
  FORGOT_PASSWORD_FORM_PATH,
  FORGOT_PASSWORD_FORM_NAME,
};

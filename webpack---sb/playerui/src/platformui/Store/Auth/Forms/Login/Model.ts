import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";

type TLoginForm = {
  username: string;
  password: string;
}

const LOGIN_FORM_NAME = "login";

const LOGIN_FORM_FIELDS: TFieldDefs<keyof TLoginForm> = {
  username: field({ extensions: withValidation(formRequiredValidation()) }),
  password: field({ extensions: withValidation(formRequiredValidation()) }),
};

const LOGIN_FORM_PATH = createFormFieldPaths(LOGIN_FORM_FIELDS);

export type { TLoginForm };
export {
  LOGIN_FORM_FIELDS,
  LOGIN_FORM_PATH,
  LOGIN_FORM_NAME,
};

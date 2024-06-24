import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formPasswordValidation, formRequiredValidation } from "../../../Form/Utils/FormValidations";

type TWithPassword = {
  newPassword: string;
}

const UPDATE_PASSWORD_FORM_NAME = "updatePassword";

const UPDATE_PASSWORD_FORM_FIELDS: TFieldDefs<keyof TWithPassword> = {
  newPassword: field({
    extensions: withValidation(
      formRequiredValidation(),
      formPasswordValidation,
    ),
  }),
};

const UPDATE_PASSWORD_FORM_PATH = createFormFieldPaths(UPDATE_PASSWORD_FORM_FIELDS);

export type { TWithPassword };
export {
  UPDATE_PASSWORD_FORM_FIELDS,
  UPDATE_PASSWORD_FORM_PATH,
  UPDATE_PASSWORD_FORM_NAME,
};

import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../Form/Utils/FormValidations";

type TWithVerifyCode = {
  verifyCode: string;
}

const VERIFY_CODE_FORM_NAME = "verifyCode";

const VERIFY_CODE_FORM_FIELDS: TFieldDefs<keyof TWithVerifyCode> = {
  verifyCode: field({ extensions: withValidation(formRequiredValidation()) }),
};

const VERIFY_CODE_FORM_PATH = createFormFieldPaths(VERIFY_CODE_FORM_FIELDS);

export type { TWithVerifyCode };
export {
  VERIFY_CODE_FORM_FIELDS,
  VERIFY_CODE_FORM_PATH,
  VERIFY_CODE_FORM_NAME,
};

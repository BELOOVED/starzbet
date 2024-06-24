import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";

const FIX_FIN_VEVO_PARAZULA_SMS_FORM = "fixFinVevoParazulaForm";

type TFixFinVevoParazulaSmsFormModel = {
  sms: string;
}

const FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELDS: TFieldDefs<keyof TFixFinVevoParazulaSmsFormModel> = {
  sms: field({ extensions: withValidation(formRequiredValidation()) }),
};

const FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELD_PATHS = createFormFieldPaths(FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELDS);

export type { TFixFinVevoParazulaSmsFormModel };
export { FIX_FIN_VEVO_PARAZULA_SMS_FORM, FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELDS, FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELD_PATHS };

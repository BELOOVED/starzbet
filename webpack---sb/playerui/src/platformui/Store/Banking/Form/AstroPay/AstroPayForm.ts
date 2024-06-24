import { createFormFieldPaths, field, form, oneOf, selectFieldValue, type TFieldDefs, type TResolver, withValidation } from "@sb/form-new";
import { formPhoneNumberValidation, formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { EAstroPayTab } from "../../Models/AstroPayFormModel";
import { type TAstroPayFormModel } from "./AstroPayFormModel";

const resolver: TResolver = (_, __, formName, state) =>
  selectFieldValue<EAstroPayTab>(state, formName, ASTRO_PAY_FORM_FIELD_PATHS.formType);

const ASTRO_PAY_FORM_FIELDS: TFieldDefs<keyof TAstroPayFormModel> = {
  formType: field(),

  details: oneOf({
    fields: {
      [EAstroPayTab.bankAccount]: form({
        fields: {
          bankAccount: field({ extensions: withValidation(formRequiredValidation()) }),
        },
      }),
      [EAstroPayTab.phoneNumber]: form({
        fields: {
          phoneNumber: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),
        },
      }),
    },
    resolver: resolver,
  }),
};

const ASTRO_PAY_FORM_FIELD_PATHS = createFormFieldPaths(ASTRO_PAY_FORM_FIELDS);
const ASTRO_PAY_FORM_PHONE_NUMBER_FIELD_PATHS = ASTRO_PAY_FORM_FIELD_PATHS.details.concat(["phoneNumber"]);
const ASTRO_PAY_FORM_BANK_ACCOUNT_FIELD_PATHS = ASTRO_PAY_FORM_FIELD_PATHS.details.concat(["bankAccount"]);

export {
  ASTRO_PAY_FORM_FIELDS,
  ASTRO_PAY_FORM_FIELD_PATHS,
  ASTRO_PAY_FORM_PHONE_NUMBER_FIELD_PATHS,
  ASTRO_PAY_FORM_BANK_ACCOUNT_FIELD_PATHS,
};

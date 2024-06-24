import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import {
  platformui_deposit_validation_error_invalid_cardNumber,
  platformui_deposit_validation_error_invalid_cvv,
  platformui_deposit_validation_error_invalid_month,
  platformui_deposit_validation_error_invalid_year,
} from "@sb/translates/platformui/CommonTKeys";
import { type TNullable } from "@sb/utils";
import { FORM_STRING_SIZE_VALIDATION, formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TFixFinSistemnakitCreaditCardFormModel } from "./FixFinSistemnakitCreaditCardFormModel";

const FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELDS: TFieldDefs<keyof TFixFinSistemnakitCreaditCardFormModel> = {
  govId: field({
    extensions: withValidation(
      formRequiredValidation(),
    ),
  }),
  birthYear: field({
    extensions: withValidation(
      formRequiredValidation(),
      FORM_STRING_SIZE_VALIDATION(platformui_deposit_validation_error_invalid_year, 4),
    ),
  }),
  number: field({
    extensions: withValidation(
      formRequiredValidation(),
      FORM_STRING_SIZE_VALIDATION(platformui_deposit_validation_error_invalid_cardNumber, 16),
    ),
  }),
  year: field({
    extensions: withValidation(
      formRequiredValidation(),
      FORM_STRING_SIZE_VALIDATION(platformui_deposit_validation_error_invalid_year, 2),
    ),
  }),
  month: field({
    extensions: withValidation(
      formRequiredValidation(),
      (value: TNullable<string>) => {
        if (value && (+value > 12 || +value < 1)) {
          return { tKey: platformui_deposit_validation_error_invalid_month };
        }

        return undefined;
      },
    ),
  }),
  cvv: field({
    extensions: withValidation(
      formRequiredValidation(),
      FORM_STRING_SIZE_VALIDATION(platformui_deposit_validation_error_invalid_cvv, 3),
    ),
  }),
};

const FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS = createFormFieldPaths(FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELDS);

export {
  FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELDS,
  FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS,
};

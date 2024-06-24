import { createFormFieldPaths, field, type TFieldDefs, withDisableCheck, withValidation } from "@sb/form-new";
import { formPhoneNumberValidation, formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { bankingMuchBetterPhoneNumberExistSelector } from "../../Selectors/PlatformBankingSelectors";

type TMuchBetterFormModel = {
  phoneNumber: string;
}

const MUCH_BETTER_FORM_FIELDS: TFieldDefs<keyof TMuchBetterFormModel> = {
  phoneNumber: field({
    extensions: {
      ...withValidation(formRequiredValidation(), formPhoneNumberValidation()),
      ...withDisableCheck<TPlatformAppState>((state) => !bankingMuchBetterPhoneNumberExistSelector(state)),
    },
  }),
};

const MUCH_BETTER_FORM_FIELD_PATHS = createFormFieldPaths(MUCH_BETTER_FORM_FIELDS);

export type { TMuchBetterFormModel };
export {
  MUCH_BETTER_FORM_FIELDS,
  MUCH_BETTER_FORM_FIELD_PATHS,
};

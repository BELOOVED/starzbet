import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectType,
  platformui_starzbet_title_bankAccountNumberBeneficiary,
  platformui_starzbet_title_fullNameBeneficiary,
  platformui_starzbet_title_ifscBeneficiary,
  platformui_starzbet_title_transferType,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type EPlatform_PaymentClipTransferType } from "@sb/graphql-client";
import { type IWithFieldPath } from "@sb/form-new";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { PAYMENT_CLIP_DETAILS_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/BankAccount/BankAccountForm";
import { PAYMENT_CLIP_TRANSFER_TYPE_OPTIONS } from "../../../../../Store/PaymentAccount/Models/PaymentClipTransferTypeModel";

const PaymentClipBankAccountForm = memo<IWithFieldPath>(({ fieldPath }) => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={fieldPath.concat(PAYMENT_CLIP_DETAILS_FIELD_PATHS.name)}
        label={t(platformui_starzbet_title_fullNameBeneficiary)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={fieldPath.concat(PAYMENT_CLIP_DETAILS_FIELD_PATHS.number)}
        label={t(platformui_starzbet_title_bankAccountNumberBeneficiary)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={fieldPath.concat(PAYMENT_CLIP_DETAILS_FIELD_PATHS.bankIfsc)}
        label={t(platformui_starzbet_title_ifscBeneficiary)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <SelectField<EPlatform_PaymentClipTransferType>
        fieldPath={fieldPath.concat(PAYMENT_CLIP_DETAILS_FIELD_PATHS.transferType)}
        placeholder={t.plain(platformui_starzbet_placeholder_selectType)}
        label={t(platformui_starzbet_title_transferType)}
        options={PAYMENT_CLIP_TRANSFER_TYPE_OPTIONS}
      />
    </>
  );
});
PaymentClipBankAccountForm.displayName = "PaymentClipBankAccountForm";

export { PaymentClipBankAccountForm };

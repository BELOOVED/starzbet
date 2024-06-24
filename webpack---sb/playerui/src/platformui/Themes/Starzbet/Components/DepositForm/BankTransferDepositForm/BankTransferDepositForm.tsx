import { useSelector } from "react-redux";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bankAccount_accountHolder,
  platformui_starzbet_bankAccount_accountNumber,
  platformui_starzbet_bankAccount_branchCode,
  platformui_starzbet_bankAccount_iban,
  platformui_starzbet_placeholder_enterFirstName,
  platformui_starzbet_placeholder_enterIdentityNumber,
  platformui_starzbet_placeholder_enterLastName,
  platformui_starzbet_placeholder_enterReferenceId,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_firstName,
  platformui_starzbet_title_identityNumber,
  platformui_starzbet_title_lastName,
  platformui_starzbet_title_playerNote,
  platformui_starzbet_title_referenceId,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { BANK_TRANSFER_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/BankTransfer/BankTransferForm";
import {
  bankTransferAccountBankNameSelector,
  bankTransferAccountSelectors,
} from "../../../../../Store/Banking/Form/BankTransfer/BankTransferAccountSelectors";
import { DepositFormItem } from "../DepositFormItem";

const FormFields = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={BANK_TRANSFER_FORM_FIELD_PATHS.firstName}
        label={t(platformui_starzbet_title_firstName)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterFirstName)}
      />

      <TextField
        fieldPath={BANK_TRANSFER_FORM_FIELD_PATHS.lastName}
        label={t(platformui_starzbet_title_lastName)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterLastName)}
      />

      <TextField
        fieldPath={BANK_TRANSFER_FORM_FIELD_PATHS.identityNumber}
        label={t(platformui_starzbet_title_identityNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterIdentityNumber)}
      />

      <TextField
        fieldPath={BANK_TRANSFER_FORM_FIELD_PATHS.referenceId}
        label={t(platformui_starzbet_title_referenceId)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterReferenceId)}
        optional
      />
    </>
  );
});
FormFields.displayName = "FormFields";

const BankTransferDepositForm = memo(() => {
  const [t] = useTranslation();
  const bankName = useSelector(bankTransferAccountBankNameSelector);
  const holderName = useSelector(bankTransferAccountSelectors.holderName);
  const branchCode = useSelector(bankTransferAccountSelectors.branchCode);
  const accountNumber = useSelector(bankTransferAccountSelectors.accountNumber);
  const iban = useSelector(bankTransferAccountSelectors.iban);

  return (
    <>
      <div className={classes.bankNameTitle}>
        {bankName}
      </div>

      <div className={classes.formGroup}>
        <div className={classes.formGroupItem}>
          <DepositFormItem title={platformui_starzbet_bankAccount_accountHolder} value={holderName} />

          <DepositFormItem title={platformui_starzbet_bankAccount_branchCode} value={branchCode} />

          <DepositFormItem title={platformui_starzbet_bankAccount_accountNumber} value={accountNumber} withCopy />

          <DepositFormItem title={platformui_starzbet_bankAccount_iban} value={iban} withCopy />

          <TextField
            fieldPath={BANK_TRANSFER_FORM_FIELD_PATHS.playerNote}
            label={t(platformui_starzbet_title_playerNote)}
            placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
            optional
          />
        </div>

        <div className={classes.formGroupItem}>
          <FormFields />
        </div>
      </div>
    </>
  );
});
BankTransferDepositForm.displayName = "BankTransferDepositForm";

export { BankTransferDepositForm };

import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectBank,
  platformui_starzbet_title_accountNumber,
  platformui_starzbet_title_bank,
  platformui_starzbet_title_ifscBeneficiary,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Exxogate/ExxogateForm";
import { exxogateBankOptionsSelector } from "../../../../../Store/Banking/Form/Exxogate/ExxogateFormSelectors";
import { ExxogateBankOption } from "../../../../../Components/ExxogateBankOption/ExxogateBankOption";
import { AmountField } from "../AmountField/AmountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";

const ExxogateImps43WithdrawForm = memo(() => {
  const [t] = useTranslation();

  const options = useSelector(exxogateBankOptionsSelector);

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <SelectField
          fieldPath={EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELD_PATHS.bankId}
          label={t(platformui_starzbet_title_bank)}
          placeholder={t.plain(platformui_starzbet_placeholder_selectBank)}
          options={options}
          optionComponent={ExxogateBankOption}
        />

        <TextField
          fieldPath={EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELD_PATHS.bankAccountNumber}
          label={t(platformui_starzbet_title_accountNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELD_PATHS.ifsc}
          label={t(platformui_starzbet_title_ifscBeneficiary)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <AmountField />
      </div>
    </>
  );
});
ExxogateImps43WithdrawForm.displayName = "ExxogateImps43WithdrawForm";

export { ExxogateImps43WithdrawForm };

import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_accountNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { FIX_FIN_FIAT_WITHDRAW_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/FixFin/FixFinFiatForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

interface IFixFinFiatWithdrawalFormProps {
  headerTKey?: string;
}

const FixFinFiatWithdrawalForm = memo<IFixFinFiatWithdrawalFormProps>(({
  headerTKey = platformui_starzbet_title_accountNumber,
}) => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={FIX_FIN_FIAT_WITHDRAW_FORM_FIELD_PATHS.accountNumber}
          label={t(headerTKey)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <AmountField />
      </div>
    </>
  );
});
FixFinFiatWithdrawalForm.displayName = "FixFinFiatWithdrawalForm";

export { FixFinFiatWithdrawalForm };

import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_cryptoAddress,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { FIX_FIN_CRYPTO_WITHDRAW_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/FixFin/FixFinCryptoForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const FixFinCryptoWithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={FIX_FIN_CRYPTO_WITHDRAW_FORM_FIELD_PATHS.address}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
          label={t(platformui_starzbet_title_cryptoAddress)}
        />

        <AmountField />
      </div>
    </>
  );
});
FixFinCryptoWithdrawForm.displayName = "FixFinCryptoWithdrawForm";

export { FixFinCryptoWithdrawForm };

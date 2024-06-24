import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_paymentAccountName,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { ONE_SEPA_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/OneIO/OneIOForm";
import { PlayerPaymentAccountField } from "../PlayerPaymentAccountField/PlayerPaymentAccountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const OneSEPAWithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <PlayerPaymentAccountField />

      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={ONE_SEPA_FORM_FIELD_PATHS.name}
          label={t(platformui_starzbet_title_paymentAccountName)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <AmountField />
      </div>
    </>
  );
});
OneSEPAWithdrawForm.displayName = "OneSEPAWithdrawForm";

export { OneSEPAWithdrawForm };

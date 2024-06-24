import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_playerNote,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { PLAYER_NOTE_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/BaseFormModel";
import { PlayerPaymentAccountField } from "../PlayerPaymentAccountField/PlayerPaymentAccountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const PaymentAccountWithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <PlayerPaymentAccountField />

      <div className={classes.form}>
        <AmountField />

        <TextField
          fieldPath={PLAYER_NOTE_FORM_FIELD_PATHS.playerNote}
          label={t(platformui_starzbet_title_playerNote)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
          optional
        />
      </div>
    </>
  );
});
PaymentAccountWithdrawForm.displayName = "PaymentAccountWithdrawForm";

export { PaymentAccountWithdrawForm };

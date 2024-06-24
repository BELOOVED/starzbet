import { memo } from "react";
import {
  platformui_starzbet_paymentAccount_title_paymentAccountName,
  platformui_starzbet_placeholder_enterText,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import classes from "../../PaymentAccountCreateForm/PaymentAccountCreateForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { PAYMENT_ACCOUNT_NAME_FORM_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/PaymentAccountBaseFormModel";

const PaymentAccountNameField = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <TextField
        fieldPath={PAYMENT_ACCOUNT_NAME_FORM_FIELD_PATHS.paymentAccountName}
        label={t(platformui_starzbet_paymentAccount_title_paymentAccountName)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        qaAttribute={PlayerUIQaAttributes.PaymentAccountsPage.PaymentAccountNameInput}
        optional
      />
    </div>
  );
});
PaymentAccountNameField.displayName = "PaymentAccountNameField";

export { PaymentAccountNameField };

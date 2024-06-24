import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_createBankAccount_placeholder_city,
  platformui_starzbet_headline_address,
  platformui_starzbet_headline_postcode,
  platformui_starzbet_paymentAccount_title_city,
  platformui_starzbet_placeholder_enterEmail,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_pleaseSelect,
  platformui_starzbet_placeholder_postcode,
  platformui_starzbet_title_email,
  platformui_starzbet_title_mobileNumber,
  platformui_starzbet_title_state,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/FixFin/FixFinPayFutureForm";
import { INDIAN_STATE_ABBREVIATION_OPTIONS } from "../../../../../Store/Banking/Models/IndianStateAbbreviation";

const FixFinPayFutureDepositForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <TextField
          fieldPath={FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS.address}
          label={t(platformui_starzbet_headline_address)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS.city}
          label={t(platformui_starzbet_paymentAccount_title_city)}
          placeholder={t.plain(platformui_starzbet_createBankAccount_placeholder_city)}
        />

        <TextField
          fieldPath={FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS.email}
          label={t(platformui_starzbet_title_email)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterEmail)}
        />
      </div>

      <div className={classes.formGroupItem}>
        <TextField
          fieldPath={FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS.phone}
          label={t(platformui_starzbet_title_mobileNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
        />

        <TextField
          fieldPath={FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS.postcode}
          label={t(platformui_starzbet_headline_postcode)}
          placeholder={t.plain(platformui_starzbet_placeholder_postcode)}
        />

        <SelectField
          fieldPath={FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS.state}
          options={INDIAN_STATE_ABBREVIATION_OPTIONS}
          label={t(platformui_starzbet_title_state)}
          placeholder={t.plain(platformui_starzbet_placeholder_pleaseSelect)}
        />
      </div>
    </div>
  );
});
FixFinPayFutureDepositForm.displayName = "FixFinPayFutureDepositForm";

export { FixFinPayFutureDepositForm };

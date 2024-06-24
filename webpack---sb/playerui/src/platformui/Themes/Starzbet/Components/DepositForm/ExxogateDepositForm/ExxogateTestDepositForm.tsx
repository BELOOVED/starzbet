import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_createBankAccount_placeholder_city,
  platformui_starzbet_headline_address,
  platformui_starzbet_headline_country,
  platformui_starzbet_paymentAccount_title_city,
  platformui_starzbet_placeholder_enterFirstName,
  platformui_starzbet_placeholder_enterLastName,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_firstName,
  platformui_starzbet_title_lastName,
  platformui_starzbet_title_mobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { platformui_title_personId } from "@sb/translates/platformui/CommonTKeys";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Exxogate/ExxogateForm";

const ExxogateTestDepositForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <TextField
          fieldPath={EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS.address}
          label={t(platformui_starzbet_headline_address)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS.city}
          label={t(platformui_starzbet_paymentAccount_title_city)}
          placeholder={t.plain(platformui_starzbet_createBankAccount_placeholder_city)}
        />

        <TextField
          fieldPath={EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS.countryCode}
          label={t(platformui_starzbet_headline_country)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS.personId}
          label={t(platformui_title_personId)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />
      </div>

      <div className={classes.formGroupItem}>
        <TextField
          fieldPath={EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS.firstName}
          label={t(platformui_starzbet_title_firstName)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterFirstName)}
        />

        <TextField
          fieldPath={EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS.lastName}
          label={t(platformui_starzbet_title_lastName)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterLastName)}
        />

        <TextField
          fieldPath={EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS.phone}
          label={t(platformui_starzbet_title_mobileNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
        />
      </div>
    </div>
  );
});
ExxogateTestDepositForm.displayName = "ExxogateTestDepositForm";

export { ExxogateTestDepositForm };

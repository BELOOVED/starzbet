import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterFirstName,
  platformui_starzbet_placeholder_enterLastName,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_title_firstName,
  platformui_starzbet_title_lastName,
  platformui_starzbet_title_mobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { EXXOGATE_UPI_43_DEPOSIT_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Exxogate/ExxogateForm";

const ExxogateUpi43DepositForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <TextField
          fieldPath={EXXOGATE_UPI_43_DEPOSIT_FORM_FIELD_PATHS.firstName}
          label={t(platformui_starzbet_title_firstName)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterFirstName)}
        />

        <TextField
          fieldPath={EXXOGATE_UPI_43_DEPOSIT_FORM_FIELD_PATHS.lastName}
          label={t(platformui_starzbet_title_lastName)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterLastName)}
        />

        <TextField
          fieldPath={EXXOGATE_UPI_43_DEPOSIT_FORM_FIELD_PATHS.phone}
          label={t(platformui_starzbet_title_mobileNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
        />
      </div>
    </div>
  );
});
ExxogateUpi43DepositForm.displayName = "ExxogateUpi43DepositForm";

export { ExxogateUpi43DepositForm };

import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_title_mobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { EXXOGATE_UPI_41_DEPOSIT_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Exxogate/ExxogateForm";

const ExxogateUpi41DepositForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <TextField
          fieldPath={EXXOGATE_UPI_41_DEPOSIT_FORM_FIELD_PATHS.phone}
          label={t(platformui_starzbet_title_mobileNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
        />
      </div>
    </div>
  );
});
ExxogateUpi41DepositForm.displayName = "ExxogateUpi41DepositForm";

export { ExxogateUpi41DepositForm };

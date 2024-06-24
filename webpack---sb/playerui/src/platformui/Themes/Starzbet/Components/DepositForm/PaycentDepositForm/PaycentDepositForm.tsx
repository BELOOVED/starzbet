import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_placeholder_enterText, platformui_starzbet_title_bic } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { PAYCENT_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Paycent/PaycentForm";

const PaycentDepositForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroupItem}>
      <TextField
        fieldPath={PAYCENT_FORM_FIELD_PATHS.bic}
        label={t(platformui_starzbet_title_bic)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        optional
      />
    </div>
  );
});
PaycentDepositForm.displayName = "PaycentDepositForm";

export { PaycentDepositForm };

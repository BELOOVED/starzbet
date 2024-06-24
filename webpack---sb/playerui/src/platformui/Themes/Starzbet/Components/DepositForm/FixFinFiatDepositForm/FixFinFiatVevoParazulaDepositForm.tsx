import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_password,
  platformui_starzbet_title_identityNumberGov,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { FIX_FIN_VEVO_PARAZULA_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/FixFin/FixFinVevoParazulaForm";

const FixFinFiatVevoParazulaDepositForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <TextField
          fieldPath={FIX_FIN_VEVO_PARAZULA_FORM_FIELD_PATHS.playerGovId}
          label={t(platformui_starzbet_title_identityNumberGov)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={FIX_FIN_VEVO_PARAZULA_FORM_FIELD_PATHS.accountPassword}
          label={t(platformui_starzbet_placeholder_password)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />
      </div>
    </div>
  );
});
FixFinFiatVevoParazulaDepositForm.displayName = "FixFinFiatVevoParazulaDepositForm";

export { FixFinFiatVevoParazulaDepositForm };

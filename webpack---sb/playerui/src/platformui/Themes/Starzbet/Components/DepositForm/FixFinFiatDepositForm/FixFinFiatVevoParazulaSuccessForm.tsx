import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { withProps } from "@sb/utils";
import { Form } from "@sb/form-new";
import {
  platformui_starzbet_button_submit,
  platformui_starzbet_myDetails_placeholder_smsCode,
  platformui_starzbet_placeholder_enterText,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { TickIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import {
  FIX_FIN_VEVO_PARAZULA_SMS_FORM,
  FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELD_PATHS,
} from "../../../../../Store/Banking/Form/FixFin/FixFInVevoParazulaSmsFormModel";
import { bankingFormErrorFunction } from "../../../../../Store/Banking/Utils/BankingFormErrorFunction";
import { useFixFinVevoParazulaSmsForm } from "../../../../../Store/Banking/Hooks/UseFixFinVevoParazulaSmsForm";
import { ThemedModalFormSubmitResult } from "../../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const FixFinFiatVevoParazulaSuccessFormContent = memo(() => {
  const [t] = useTranslation();
  const {
    message,
    goToPending,
    onSubmit,
    loading,
  } = useFixFinVevoParazulaSmsForm();

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <ThemedModalFormSubmitResult extractError={bankingFormErrorFunction} onSuccess={goToPending} />

        <div className={classes.label}>
          <TickIcon size={"m"} color={"green"} />

          {message}
        </div>

        <TextField
          fieldPath={FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELD_PATHS.sms}
          label={t(platformui_starzbet_myDetails_placeholder_smsCode)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <Button
          colorScheme={"orange-gradient"}
          className={classes.depositButton}
          onClick={onSubmit}
          loading={loading}
          wide
        >
          {t(platformui_starzbet_button_submit)}
        </Button>
      </div>
    </div>
  );
});
FixFinFiatVevoParazulaSuccessFormContent.displayName = "FixFinFiatVevoParazulaSuccessFormContent";

// without <form />, to avoid nesting form (DepositForm wrapped)
const FixFinFiatVevoParazulaSuccessForm = withProps(Form)({
  content: FixFinFiatVevoParazulaSuccessFormContent,
  formName: FIX_FIN_VEVO_PARAZULA_SMS_FORM,
});

export { FixFinFiatVevoParazulaSuccessForm };

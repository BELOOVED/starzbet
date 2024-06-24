import { memo } from "react";
import {
  platformui_starzbet_paymentAccount_title_cardDetails,
  platformui_starzbet_paymentAccount_title_cardholderName,
  platformui_starzbet_paymentAccount_title_cardNumber,
  platformui_starzbet_paymentAccount_title_expiryDate,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectDate,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { simpleValueExtractor } from "@sb/form-new";
import classes from "../../PaymentAccountCreateForm/PaymentAccountCreateForm.module.css";
import { FieldCreator } from "../../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { BANK_CARD_FORM_FIELD_PATH } from "../../../../../Store/PaymentAccount/Form/BankCard/BankCardForm";
import { DatePickerInput } from "../../Inputs/DatePickerInput/DatePickerInput";
import { PaymentAccountBillingAddressField } from "./PaymentAccountBillingAddressField";

const CardDetails = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_cardDetails)}
      </div>

      <TextField
        fieldPath={BANK_CARD_FORM_FIELD_PATH.cardHolderName}
        label={t(platformui_starzbet_paymentAccount_title_cardholderName)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={BANK_CARD_FORM_FIELD_PATH.cardNumber}
        label={t(platformui_starzbet_paymentAccount_title_cardNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <FieldCreator<string>
        ThemedField={Field}
        fieldPath={BANK_CARD_FORM_FIELD_PATH.expiryDate}
        label={t(platformui_starzbet_paymentAccount_title_expiryDate)}
        valueExtractor={simpleValueExtractor}
      >
        {
          (props) => (
            <DatePickerInput
              placeholder={t.plain(platformui_starzbet_placeholder_selectDate)}
              {...props}
            />
          )
        }
      </FieldCreator>
    </div>
  );
});
CardDetails.displayName = "CardDetails";

const PaymentAccountBankCardForm = memo(() => (
  <>
    <CardDetails />

    <PaymentAccountBillingAddressField />
  </>
));
PaymentAccountBankCardForm.displayName = "PaymentAccountBankCardForm";

export { PaymentAccountBankCardForm };

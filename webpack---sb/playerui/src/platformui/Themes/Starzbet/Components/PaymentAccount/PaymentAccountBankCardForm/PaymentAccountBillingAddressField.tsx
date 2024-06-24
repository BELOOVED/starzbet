import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_paymentAccount_title_addressLine1,
  platformui_starzbet_paymentAccount_title_addressLine2,
  platformui_starzbet_paymentAccount_title_billingAddress,
  platformui_starzbet_paymentAccount_title_city,
  platformui_starzbet_paymentAccount_title_country,
  platformui_starzbet_paymentAccount_title_postcode,
  platformui_starzbet_paymentAccount_title_region,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_select_country,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../../PaymentAccountCreateForm/PaymentAccountCreateForm.module.css";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { countriesOptions } from "../../../../../Utils/CountriesUtils";
import { CountryOption } from "../../../../../Components/CountryOption/CountryOption";
import { BANK_CARD_FORM_FIELD_PATH } from "../../../../../Store/PaymentAccount/Form/BankCard/BankCardForm";

const PaymentAccountBillingAddressField = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_billingAddress)}
      </div>

      <SelectField<string>
        fieldPath={BANK_CARD_FORM_FIELD_PATH.countryId}
        options={countriesOptions}
        placeholder={t.plain(platformui_starzbet_placeholder_select_country)}
        label={t(platformui_starzbet_paymentAccount_title_country)}
        optionComponent={CountryOption}
      />

      <TextField
        fieldPath={BANK_CARD_FORM_FIELD_PATH.addressLine1}
        label={t(platformui_starzbet_paymentAccount_title_addressLine1)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={BANK_CARD_FORM_FIELD_PATH.addressLine2}
        label={t(platformui_starzbet_paymentAccount_title_addressLine2)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={BANK_CARD_FORM_FIELD_PATH.city}
        label={t(platformui_starzbet_paymentAccount_title_city)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={BANK_CARD_FORM_FIELD_PATH.postcode}
        label={t(platformui_starzbet_paymentAccount_title_postcode)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={BANK_CARD_FORM_FIELD_PATH.region}
        label={t(platformui_starzbet_paymentAccount_title_region)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        optional
      />
    </div>
  );
});
PaymentAccountBillingAddressField.displayName = "PaymentAccountBillingAddressField";

export { PaymentAccountBillingAddressField };

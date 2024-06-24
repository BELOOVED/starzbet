import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_creditCard_title_cardholderName,
  platformui_starzbet_creditCard_title_cardNumber,
  platformui_starzbet_placeholder_enterMonth,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_enterYear,
  platformui_starzbet_title_birthYear,
  platformui_starzbet_title_cvv,
  platformui_starzbet_title_identityNumberGov,
  platformui_starzbet_title_monthExpiredCard,
  platformui_starzbet_title_yearExpiredCard,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../DepositForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { platformBankingCardHolderNameSelector } from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import {
  FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS,
} from "../../../../../Store/Banking/Form/FixFin/FixFinSistemnakitCreaditCardForm";
import { DepositFormItem } from "../DepositFormItem";

const PersonalInfo = memo(() => {
  const [t] = useTranslation();
  const cardHolderName = useSelector(platformBankingCardHolderNameSelector);

  return (
    <>
      <DepositFormItem
        title={platformui_starzbet_creditCard_title_cardholderName}
        value={cardHolderName}
      />

      <TextField
        fieldPath={FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS.birthYear}
        label={t(platformui_starzbet_title_birthYear)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterYear)}
        type={"number"}
      />

      <TextField
        fieldPath={FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS.govId}
        label={t(platformui_starzbet_title_identityNumberGov)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />
    </>
  );
});
PersonalInfo.displayName = "PersonalInfo";

const CardInfo = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS.number}
        label={t(platformui_starzbet_creditCard_title_cardNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        type={"number"}
      />

      <TextField
        fieldPath={FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS.year}
        label={t(platformui_starzbet_title_yearExpiredCard)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterYear)}
        type={"number"}
      />

      <TextField
        fieldPath={FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS.month}
        label={t(platformui_starzbet_title_monthExpiredCard)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterMonth)}
        type={"number"}
      />

      <TextField
        fieldPath={FIX_FIN_SISTEMNAKIT_CREDIT_CARD_FORM_FIELD_PATHS.cvv}
        label={t(platformui_starzbet_title_cvv)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        type={"number"}
      />
    </>
  );
});
CardInfo.displayName = "CardInfo";

const FixFinSistemnakitCreditCardDepositForm = memo(() => (
  <div className={classes.formGroup}>
    <div className={classes.formGroupItem}>
      <PersonalInfo />
    </div>

    <div className={classes.formGroupItem}>
      <CardInfo />
    </div>
  </div>
));
FixFinSistemnakitCreditCardDepositForm.displayName = "FixFinSistemnakitCreditCardDepositForm";

export { FixFinSistemnakitCreditCardDepositForm };

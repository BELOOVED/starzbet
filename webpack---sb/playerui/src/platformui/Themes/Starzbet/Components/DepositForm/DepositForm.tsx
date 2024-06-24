import clsx from "clsx";
import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, type IMoney, isNotNil, Money, type TVoidFn, withProps } from "@sb/utils";
import {
  platformui_starzbet_menu_button_deposit,
  platformui_starzbet_placeholder_enterAmount,
  platformui_starzbet_title_depositAmount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { FormWithWrapper, simpleValueExtractor } from "@sb/form-new";
import { EPlatform_PaymentMethodType } from "@sb/graphql-client";
import classes from "./DepositForm.module.css";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { FieldCreator } from "../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../common/Themes/Starzbet/Components/Field/Field";
import { MoneyInput } from "../../../../../common/Themes/Starzbet/Components/MoneyInput/MoneyInput";
import { platformBankingDepositPaymentMethodNonNullableSelector } from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../../../../Store/Banking/Models/PaymentMethodIdModel";
import { isPaymentMethodWithRedirect } from "../../../../Store/Banking/Models/PaymentMethodWithRedirect";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { platformDepositLoadingSelector } from "../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { depositAmountQuickButtonsSelector } from "../../../../Store/Banking/Form/DepositFormSelectors";
import { useFormSubmitResult } from "../../../../Store/Form/Hooks/UseFormSubmitResult";
import { bankingFormErrorFunction } from "../../../../Store/Banking/Utils/BankingFormErrorFunction";
import { DEPOSIT_FORM } from "../../../../Store/Banking/Utils/Variables";
import { DEPOSIT_BASE_FIELD_PATHS } from "../../../../Store/Banking/Form/BaseFormModel";
import { getCryptoMethodsMap } from "../../../../Store/Banking/Models/FixFinCryptoModel";
import { DepositPromotionBonusField } from "./DepositPromotionBonusField/DepositPromotionBonusField";
import { DepositShowSuccessModal } from "./DepositShowSuccessModal/DepositShowSuccessModal";
import { DepositShowErrorModal } from "./DepositShowErrorModal/DepositShowErrorModal";
import { DepositModalWithRedirect } from "./DepositModalWithRedirect/DepositModalWithRedirect";
import { KolayPayHavaleDepositForm } from "./KolayPayHavaleDepositForm/KolayPayHavaleDepositForm";
import { BankTransferDepositForm } from "./BankTransferDepositForm/BankTransferDepositForm";
import { AstroPayDepositForm } from "./AstroPayDepositForm/AstroPayDepositForm";
import { MuchBetterDepositForm } from "./MuchBetterDepositForm/MuchBetterDepositForm";
import { FixFinCryptoSuccessForm } from "./FixFinCryptoDepositForm/FixFinCryptoSuccessForm";
import { FixFinFiatBankAccountsSuccessForm } from "./FixFinFiatDepositForm/FixFinFiatBankAccountsSuccessForm";
import { BankTransferDepositExtraContent } from "./BankTransferDepositForm/BankTransferDepositExtraContent";
import { FixFinSistemnakitCreditCardDepositForm } from "./FixFinFiatDepositForm/FixFinSistemnakitCreditCardDepositForm";
import { FixFinFiatBankSelectedSuccessForm } from "./FixFinFiatDepositForm/FixFinFiatBankSelectedSuccessForm";
import { FixFinFiatSistemnakitSuccessForm } from "./FixFinFiatDepositForm/FixFinFiatSistemnakitSuccessForm";
import { FixFinFastlineDepositForm } from "./FixFinFastlineDepositForm/FixFinFastlineDepositForm";
import { PaycentDepositForm } from "./PaycentDepositForm/PaycentDepositForm";
import { FixFinFiatVevoHavaleSuccessForm } from "./FixFinFiatDepositForm/FixFinFiatVevoHavaleSuccessForm";
import { FixFinFiatVevoParazulaDepositForm } from "./FixFinFiatDepositForm/FixFinFiatVevoParazulaDepositForm";
import { FixFinFiatVevoParazulaSuccessForm } from "./FixFinFiatDepositForm/FixFinFiatVevoParazulaSuccessForm";
import { FixFinPayFutureDepositForm } from "./FixFinFiatDepositForm/FixFinPayFutureDepositForm";
import { ExxogateTestDepositForm } from "./ExxogateDepositForm/ExxogateTestDepositForm";
import { ExxogateUpiBaseDepositForm } from "./ExxogateDepositForm/ExxogateUpiBaseDepositForm";
import { ExxogateUpi41DepositForm } from "./ExxogateDepositForm/ExxogateUpi41DepositForm";
import { ExxogateUpi43DepositForm } from "./ExxogateDepositForm/ExxogateUpi43DepositForm";

interface ISelectAmountProps {
  money: IMoney;
  onChange: TVoidFn;
}

const SelectAmount = memo<ISelectAmountProps>(({ money, onChange }) => {
  const onSelect = () => onChange(money);

  return (
    <div className={classes.amount} onClick={onSelect}>
      <Ellipsis>
        {Money.toFormat(money, EMoneyFormat.symbolLeft)}
      </Ellipsis>
    </div>
  );
});
SelectAmount.displayName = "SelectAmount";

const AmountField = memo(() => {
  const [t] = useTranslation();

  const quickButtons = useSelector(depositAmountQuickButtonsSelector);

  return (
    <FieldCreator<IMoney>
      ThemedField={Field}
      fieldPath={DEPOSIT_BASE_FIELD_PATHS.amount}
      valueExtractor={simpleValueExtractor}
      label={t(platformui_starzbet_title_depositAmount)}
    >
      {
        (props) => (
          <div className={classes.formItem}>
            <div className={classes.amountList}>
              {
                quickButtons.map((value) => (
                  <SelectAmount
                    money={value}
                    key={value.amount}
                    onChange={props.onChange}
                  />
                ))
              }
            </div>

            <MoneyInput
              placeholder={t.plain(platformui_starzbet_placeholder_enterAmount)}
              {...props}
            />
          </div>
        )
      }
    </FieldCreator>
  );
});
AmountField.displayName = "AmountField";

const DepositButton = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(platformDepositLoadingSelector);

  return (
    <Button
      colorScheme={"orange-gradient"}
      loading={loading}
      type={"submit"}
      className={classes.button}
      wide
    >
      {t(platformui_starzbet_menu_button_deposit)}
    </Button>
  );
});
DepositButton.displayName = "DepositButton";

const depositFormPerMethodMap: Partial<Record<TPaymentMethodId, ComponentType>> = {
  [PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_DEPOSIT_ID]: BankTransferDepositForm,
  [PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_DEPOSIT_ID]: KolayPayHavaleDepositForm,
  [PAYMENT_METHOD_ID_MAP.ASTRO_PAY_DEPOSIT_ID]: AstroPayDepositForm,
  [PAYMENT_METHOD_ID_MAP.MUCH_BETTER_DEPOSIT_ID]: MuchBetterDepositForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SISTEMNAKIT_CREDIT_CARD]: FixFinSistemnakitCreditCardDepositForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FASTLINE_QR]: FixFinFastlineDepositForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FASTLINE_CEPBANK]: FixFinFastlineDepositForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SISTEMNAKIT_HAVALE]: FixFinFastlineDepositForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_VEVO_PARAZULA]: FixFinFiatVevoParazulaDepositForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_PAYFUTURE]: FixFinPayFutureDepositForm,
  [PAYMENT_METHOD_ID_MAP.PAYCENT_GIROPAY_DEPOSIT_ID]: PaycentDepositForm,
  [PAYMENT_METHOD_ID_MAP.PAYCENT_SOFORT_DEPOSIT_ID]: PaycentDepositForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_TEST_DEPOSIT_ID]: ExxogateTestDepositForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_UPI_9_DEPOSIT_ID]: ExxogateUpiBaseDepositForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_UPI_29_DEPOSIT_ID]: ExxogateUpiBaseDepositForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_UPI_41_DEPOSIT_ID]: ExxogateUpi41DepositForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_UPI_43_DEPOSIT_ID]: ExxogateUpi43DepositForm,
};

const successExtraContent: Partial<Record<TPaymentMethodId, ComponentType>> = {
  ...getCryptoMethodsMap(EPlatform_PaymentMethodType.deposit, FixFinCryptoSuccessForm),
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_VEGAPAY_HAVALE]: FixFinFiatBankAccountsSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_KOLAYPAY_HAVALE]: FixFinFiatBankAccountsSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SISTEMNAKIT_PAPARA]: FixFinFiatSistemnakitSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SISTEMNAKIT_HAVALE]: FixFinFiatSistemnakitSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_VEVO_HAVALE]: FixFinFiatVevoHavaleSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_TR_HAVALE_EFT]: FixFinFiatBankSelectedSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FIN2]: FixFinFiatBankSelectedSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SERIPAY1]: FixFinFiatBankSelectedSuccessForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_VEVO_PARAZULA]: FixFinFiatVevoParazulaSuccessForm,
};

const formExtraInfo: Partial<Record<TPaymentMethodId, ComponentType>> = {
  [PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_DEPOSIT_ID]: BankTransferDepositExtraContent,
};

const DepositFormContent = memo(() => {
  const paymentMethodId = useSelector(platformBankingDepositPaymentMethodNonNullableSelector);
  const {
    submitSucceeded,
    submitErrors,
    reset,
  } = useFormSubmitResult(bankingFormErrorFunction);

  const content = depositFormPerMethodMap[paymentMethodId];

  const successContent = successExtraContent[paymentMethodId];

  const formExtraContent = formExtraInfo[paymentMethodId];

  if (submitSucceeded && isNotNil(successContent)) {
    return createElement(successContent);
  }

  return (
    <div>
      {isNotNil(content) ? createElement(content) : null}

      <div className={clsx(classes.formGroup, classes.footer)}>
        <div className={classes.formGroupItem}>
          <AmountField />

          {submitErrors ? <DepositShowErrorModal {...submitErrors} hideModal={reset} /> : null}

          {
            submitSucceeded && !isPaymentMethodWithRedirect(paymentMethodId)
              ? <DepositShowSuccessModal />
              : null
          }

          {
            submitSucceeded && isPaymentMethodWithRedirect(paymentMethodId)
              ? <DepositModalWithRedirect paymentMethodId={paymentMethodId} />
              : null
          }

          <DepositPromotionBonusField />

          <DepositButton />
        </div>

        {isNotNil(formExtraContent) ? createElement(formExtraContent) : null}
      </div>
    </div>
  );
});
DepositFormContent.displayName = "DepositFormContent";

const DepositForm = withProps(FormWithWrapper)({
  content: DepositFormContent,
  formName: DEPOSIT_FORM,
});

export { DepositForm };

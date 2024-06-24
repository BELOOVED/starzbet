import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { isNotNil, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_message_failed,
  platformui_starzbet_paymentAccount_message_successCreate,
  platformui_starzbet_paymentAccount_title_create,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EPlatform_PlayerPaymentAccountType } from "@sb/graphql-client";
import { FormWithWrapper } from "@sb/form-new";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import classes from "./PaymentAccountCreateForm.module.css";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { usePaymentAccountSuccessForm } from "../../../../Store/Banking/Hooks/UsePaymentAccountSuccessForm";
import { paymentAccountCreateAccountTypeNotNilSelector } from "../../../../Store/PaymentAccount/Selectors/PaymentAccountSelectors";
import { PAYMENT_ACCOUNT_CREATE_FORM } from "../../../../Store/PaymentAccount/Models/Variables";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";
import { PaymentAccountBankCardForm } from "../PaymentAccount/PaymentAccountBankCardForm/PaymentAccountBankCardForm";
import { PaymentAccountNameField } from "../PaymentAccount/PaymentAccountNameFormField/PaymentAccountNameField";
import { PaymentAccountBankAccountCreateForm } from "./PaymentAccountBankAccountForm/PaymentAccountBankAccountForm";
import { PaymentAccountCryptoWalletForm } from "./PaymentAccountCryptoWalletForm/PaymentAccountCryptoWalletForm";
import { PaymentAccountEWalletForm } from "./PaymentAccountEWalletForm/PaymentAccountEWalletForm";

const CreateButton = memo(() => {
  const [t] = useTranslation();

  return (
    <Button
      qaAttribute={PlayerUIQaAttributes.PaymentAccountsPage.CreateButton}
      colorScheme={"orange-gradient"}
      type={"submit"}
      wide
    >
      {t(platformui_starzbet_paymentAccount_title_create)}
    </Button>
  );
});
CreateButton.displayName = "CreateButton";

const paymentAccountFormMap: Record<EPlatform_PlayerPaymentAccountType, ComponentType> = {
  [EPlatform_PlayerPaymentAccountType.bankAccount]: PaymentAccountBankAccountCreateForm,
  [EPlatform_PlayerPaymentAccountType.bankCard]: PaymentAccountBankCardForm,
  [EPlatform_PlayerPaymentAccountType.cryptoWallet]: PaymentAccountCryptoWalletForm,
  [EPlatform_PlayerPaymentAccountType.eWallet]: PaymentAccountEWalletForm,
};

const PaymentAccountCreateFormContent = memo(() => {
  const accountType = useSelector(paymentAccountCreateAccountTypeNotNilSelector);
  const onSuccess = usePaymentAccountSuccessForm();

  const content = paymentAccountFormMap[accountType];

  return (
    <div className={classes.form}>
      <PaymentAccountNameField />

      <div className={classes.formContainer}>
        {isNotNil(content) ? createElement(content) : null}
      </div>

      <div className={classes.formFooter}>
        <CreateButton />
      </div>

      <ThemedModalFormSubmitResult
        errorTitle={platformui_starzbet_message_failed}
        successSubtitle={platformui_starzbet_paymentAccount_message_successCreate}
        onSuccess={onSuccess}
      />
    </div>
  );
});
PaymentAccountCreateFormContent.displayName = "PaymentAccountCreateFormContent";

const PaymentAccountCreateForm = withProps(FormWithWrapper)({
  content: PaymentAccountCreateFormContent,
  formName: PAYMENT_ACCOUNT_CREATE_FORM,
});

export {
  PaymentAccountCreateForm,
};

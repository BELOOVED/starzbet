import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { isNotNil, withPreventDefault, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_button_cancel,
  platformui_starzbet_button_save,
  platformui_starzbet_message_failed,
  platformui_starzbet_paymentAccount_message_successEdit,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import type { TPlatform_PlayerPaymentAccountDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import { FormWithWrapper } from "@sb/form-new";
import classes from "./PaymentAccountEditForm.module.css";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useLocalizedPushPath } from "../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { usePaymentAccountSuccessForm } from "../../../../Store/Banking/Hooks/UsePaymentAccountSuccessForm";
import { PAYMENT_ACCOUNT_EDIT_FORM } from "../../../../Store/PaymentAccount/Models/Variables";
import { paymentAccountEditCurrentAccountTypeSelector } from "../../../../Store/PaymentAccount/Selectors/PaymentAccountSelectors";
import { getPaymentAccountCryptoMap } from "../../../../Store/PaymentAccount/Utils/GetPaymentAccountCryptoDetails";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";
import { PaymentAccountNameField } from "../PaymentAccount/PaymentAccountNameFormField/PaymentAccountNameField";
import { PaymentAccountBankCardForm } from "../PaymentAccount/PaymentAccountBankCardForm/PaymentAccountBankCardForm";
import { PaymentAccountCryptoWalletForm } from "./PaymentAccountCryptoWalletForm/PaymentAccountCryptoWalletForm";
import { PaymentAccountEWalletForm } from "./PaymentAccountEWalletForm/PaymentAccountEWalletForm";
import { PaymentAccountBankAccountEditForm } from "./PaymentAccountBankAccountForm/PaymentAccountBankAccountForm";

const paymentAccountFormMap: Record<TPlatform_PlayerPaymentAccountDetails_Fragment["__typename"], ComponentType> = {
  Platform_BankAccountDetails: PaymentAccountBankAccountEditForm,
  Platform_PaymentClipBankAccountDetails: PaymentAccountBankAccountEditForm,
  Platform_BankCardDetails: PaymentAccountBankCardForm,
  Platform_PaparaAccountDetails: PaymentAccountEWalletForm,
  ...getPaymentAccountCryptoMap(PaymentAccountCryptoWalletForm),
};

const CancelButton = memo(() => {
  const [t] = useTranslation();
  const cancel = useLocalizedPushPath(routeMap.bankingPaymentAccountsRoute);

  return (
    <Button
      colorScheme={"secondary-transparent"}
      onClick={withPreventDefault(cancel)}
      wide
    >
      {t(platformui_starzbet_button_cancel)}
    </Button>
  );
});
CancelButton.displayName = "CancelButton";

const SaveButton = memo(() => {
  const [t] = useTranslation();

  return (
    <Button
      colorScheme={"orange-gradient"}
      type={"submit"}
      wide
    >
      {t(platformui_starzbet_button_save)}
    </Button>
  );
});
SaveButton.displayName = "SaveButton";

const PaymentAccountEditFormContent = memo(() => {
  const accountType = useSelector(paymentAccountEditCurrentAccountTypeSelector);
  const content = paymentAccountFormMap[accountType];
  const onSuccess = usePaymentAccountSuccessForm();

  return (
    <div className={classes.form}>
      <PaymentAccountNameField />

      <div className={classes.formContainer}>
        {isNotNil(content) ? createElement(content) : null}
      </div>

      <div className={classes.formFooter}>
        <CancelButton />

        <SaveButton />
      </div>

      <ThemedModalFormSubmitResult
        errorTitle={platformui_starzbet_message_failed}
        successSubtitle={platformui_starzbet_paymentAccount_message_successEdit}
        onSuccess={onSuccess}
      />
    </div>
  );
});
PaymentAccountEditFormContent.displayName = "PaymentAccountEditFormContent";

const PaymentAccountEditForm = withProps(FormWithWrapper)({
  content: PaymentAccountEditFormContent,
  formName: PAYMENT_ACCOUNT_EDIT_FORM,
});

export { PaymentAccountEditForm };

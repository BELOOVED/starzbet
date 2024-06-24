import { selectFieldValue, selectFormValue, type TWithFormsState } from "@sb/form-new";
import { createSimpleSelector } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { banksLoadedSelector } from "../../Banking/Selectors/PlatformBankingLoaderSelectors";
import { PAYMENT_ACCOUNT_CREATE_FORM, PAYMENT_ACCOUNT_EDIT_FORM } from "../Models/Variables";
import {
  isPaymentAccountEditCurrentAccountAvailableSelector,
  paymentAccountCreateAccountKindSelector,
  paymentAccountEditCurrentAccountKindSelector,
} from "../Selectors/PaymentAccountSelectors";
import { isPaymentAccountBankAccountBaseForm } from "../Models/PaymentAccountTypeModel";
import {
  PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS,
  type TWithPaymentAccountKindFormModel,
  type TWithPaymentAccountNameFormModel,
} from "./PaymentAccountBaseFormModel";

const paymentAccountCreateWithAccountKindFormInitialValueSelector = createSimpleSelector(
  [paymentAccountCreateAccountKindSelector],
  (accountKind): Partial<TWithPaymentAccountKindFormModel> => ({ accountKind }),
);

const paymentAccountFormValueSelector = <T>(state: TPlatformAppState, formName: string) =>
  selectFormValue<T & TWithPaymentAccountNameFormModel>(state, formName);

const paymentAccountCreateFormValueSelector = <T>(state: TPlatformAppState) =>
  paymentAccountFormValueSelector<T>(state, PAYMENT_ACCOUNT_CREATE_FORM);

const paymentAccountEditFormValueSelector = <T>(state: TPlatformAppState) =>
  paymentAccountFormValueSelector<T>(state, PAYMENT_ACCOUNT_EDIT_FORM);

const paymentAccountCreateKindFieldValueSelector = <V extends string = string>(state: TWithFormsState) => selectFieldValue<V>(
  state,
  PAYMENT_ACCOUNT_CREATE_FORM,
  PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS.accountKind,
);

const isPaymentAccountEditFormShouldRenderSelector = (state: TPlatformAppState) => {
  const isAvailable = isPaymentAccountEditCurrentAccountAvailableSelector(state);

  if (!isAvailable) {
    return isAvailable;
  }
  const accountKind = paymentAccountEditCurrentAccountKindSelector(state);

  if (accountKind && !isPaymentAccountBankAccountBaseForm(accountKind)) {
    return banksLoadedSelector(state);
  }

  return isAvailable;
};

export {
  paymentAccountCreateFormValueSelector,
  paymentAccountEditFormValueSelector,
  paymentAccountCreateWithAccountKindFormInitialValueSelector,
  paymentAccountCreateKindFieldValueSelector,
  isPaymentAccountEditFormShouldRenderSelector,
};

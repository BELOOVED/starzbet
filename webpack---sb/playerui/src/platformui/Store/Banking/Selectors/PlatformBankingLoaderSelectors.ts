import { callManagerErrorSelector, callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { selectIsFormSubmittingStarted } from "@sb/form-new";
import { createSimpleSelector } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { getCallSymbolError } from "../../Form/Utils/GetCallSymbolError";
import {
  BANKS_LOADING_SYMBOL,
  DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL,
  DEPOSIT_FORM,
  MUCH_BETTER_PHONE_NUMBER_CALL_SYMBOL,
  PAYMENT_METHODS_LOADING_SYMBOL,
  WITHDRAW_FORM,
} from "../Utils/Variables";
import { FIX_FIN_VEVO_PARAZULA_SMS_FORM } from "../Form/FixFin/FixFInVevoParazulaSmsFormModel";

const paymentMethodsLoadingSelector = callManagerStartedSelector.with.symbol(PAYMENT_METHODS_LOADING_SYMBOL);
const paymentMethodsLoadedSelector = callManagerSucceededSelector.with.symbol(PAYMENT_METHODS_LOADING_SYMBOL);

const platformDepositLoadingSelector = (state: TPlatformAppState) => selectIsFormSubmittingStarted(state, DEPOSIT_FORM);
const fixFinVevoParazulaSmsLoadingSelector = (state: TPlatformAppState) =>
  selectIsFormSubmittingStarted(state, FIX_FIN_VEVO_PARAZULA_SMS_FORM);

const platformWithdrawLoadingSelector = (state: TPlatformAppState) => selectIsFormSubmittingStarted(state, WITHDRAW_FORM);

const depositMethodSelectedErrorSelector = createSimpleSelector(
  [callManagerErrorSelector.with.symbol(DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL)],
  getCallSymbolError,
);
const depositMethodSelectedSucceededSelector = callManagerSucceededSelector.with.symbol(DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL);
const depositMethodSelectedLoadingSelector = callManagerStartedSelector.with.symbol(DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL);

const muchBetterPhoneNumberLoadedSelector = callManagerSucceededSelector.with.symbol(MUCH_BETTER_PHONE_NUMBER_CALL_SYMBOL);

const banksLoadedSelector = callManagerSucceededSelector.with.symbol(BANKS_LOADING_SYMBOL);

export {
  paymentMethodsLoadingSelector,
  paymentMethodsLoadedSelector,

  platformDepositLoadingSelector,
  fixFinVevoParazulaSmsLoadingSelector,
  platformWithdrawLoadingSelector,

  depositMethodSelectedErrorSelector,
  depositMethodSelectedSucceededSelector,
  depositMethodSelectedLoadingSelector,

  muchBetterPhoneNumberLoadedSelector,
  banksLoadedSelector,
};

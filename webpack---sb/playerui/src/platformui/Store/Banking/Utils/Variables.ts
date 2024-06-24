import { createCallManagerSymbol } from "@sb/call-manager";

const PAYMENT_METHODS_LOADING_SYMBOL = createCallManagerSymbol("paymentMethods");
const BANKS_LOADING_SYMBOL = createCallManagerSymbol("banks");
const DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL = createCallManagerSymbol("depositFixFinMethodSelected");
const DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL = createCallManagerSymbol("depositBankSelected");
const DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL = createCallManagerSymbol("depositTrHavaleConfirm");
const MUCH_BETTER_PHONE_NUMBER_CALL_SYMBOL = createCallManagerSymbol("muchBetterPhoneNumber");
const DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL = createCallManagerSymbol("depositFixFinVevoHavaleBankSelect");
const WITHDRAW_FORM = "withdrawForm";
const DEPOSIT_FORM = "depositForm";

export {
  PAYMENT_METHODS_LOADING_SYMBOL,
  DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL,
  DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL,
  DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL,
  BANKS_LOADING_SYMBOL,
  MUCH_BETTER_PHONE_NUMBER_CALL_SYMBOL,
  DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL,
  WITHDRAW_FORM,
  DEPOSIT_FORM,
};

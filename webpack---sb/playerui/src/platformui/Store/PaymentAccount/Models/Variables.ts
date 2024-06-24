import { createCallManagerSymbol } from "@sb/call-manager";

const PAYMENT_ACCOUNT_CREATE_FORM = "paymentAccountCreateForm";
const PAYMENT_ACCOUNT_EDIT_FORM = "paymentAccountEditForm";
const PAYMENT_ACCOUNT_REMOVE_FORM = "paymentAccountRemoveForm";

const PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL = createCallManagerSymbol("playerPaymentAccounts");

export {
  PAYMENT_ACCOUNT_CREATE_FORM,
  PAYMENT_ACCOUNT_EDIT_FORM,
  PAYMENT_ACCOUNT_REMOVE_FORM,

  PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL,
};

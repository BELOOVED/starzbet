import { callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL } from "../Models/Variables";

const playerPaymentAccountsLoadingSelector = callManagerStartedSelector.with.symbol(PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL);
const playerPaymentAccountsLoadedSelector = callManagerSucceededSelector.with.symbol(PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL);

export {
  playerPaymentAccountsLoadedSelector,
  playerPaymentAccountsLoadingSelector,
};

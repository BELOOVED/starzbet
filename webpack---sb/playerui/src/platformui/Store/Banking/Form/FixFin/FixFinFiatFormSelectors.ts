import { createPropertySelector, createPropertySelectors, createSimpleSelector, getNotNil } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import { type call_FixFinMakeFiatWithdrawalCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { platformBankingWithdrawPaymentMethodNonNullableSelector } from "../../Selectors/PlatformBankingSelectors";
import {
  assertsFixFinFiatSistemnakitResponse,
  assertsFixFinFiatWithBankAccountResponse,
  assertsFixFinFiatWithBanksResponse,
  assertsFixFinVevoHavaleResponse,
} from "../../Models/FixFinFiatModel";
import { withdrawFormValueSelector } from "../WithdrawFormSelectors";
import { depositFormResponseSelectorFactory } from "../DepositFormSelectors";
import { type TFixFinFiatFormModel } from "./FixFinFiatFormModel";

const withdrawFixFinFiatCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TFixFinFiatFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_FixFinMakeFiatWithdrawalCommand> => ({
    accountNumber: formState.accountNumber,
    paymentMethodId: paymentMethodId,
    sum: formState.amount,
  }),
);

const depositFixFinFiatWithBankAccountsFormResponseSelector = depositFormResponseSelectorFactory(
  assertsFixFinFiatWithBankAccountResponse,
  "depositFixFinFiatWithBankAccountsFormResponseSelector",
);

const depositFixFinFiatWithBankAccountsFormResponseRequestIdSelector = createPropertySelector(
  depositFixFinFiatWithBankAccountsFormResponseSelector,
  "requestId",
);

const depositFixFinFiatWithBankAccountsFormResponseBankAccountsSelector = createPropertySelector(
  depositFixFinFiatWithBankAccountsFormResponseSelector,
  ["info", "bankAccounts"],
);

const depositFixFinFiatSistemnakitFormResponseSelector = depositFormResponseSelectorFactory(
  assertsFixFinFiatSistemnakitResponse,
  "depositFixFinFiatSistemnakitFormResponseSelector",
);

const depositFixFinFiatSistemnakitFormResponseInfoSelector = createPropertySelector(
  depositFixFinFiatSistemnakitFormResponseSelector,
  "info",
);

const depositFixFinFiatSistemnakitFormResponseInfoSelectors = createPropertySelectors(
  depositFixFinFiatSistemnakitFormResponseInfoSelector,
);

const depositFixFinFiatVevoHavaleFormResponseSelector = depositFormResponseSelectorFactory(
  assertsFixFinVevoHavaleResponse,
  "depositFixFinFiatVevoHavaleFormResponseSelector",
);

const depositFixFinFiatWithBanksFormResponseSelector = depositFormResponseSelectorFactory(
  assertsFixFinFiatWithBanksResponse,
  "depositFixFinFiatWithBanksFormResponseSelector",
);

const depositFixFinFiatWithBanksFormResponseSelectors = createPropertySelectors(depositFixFinFiatWithBanksFormResponseSelector);

const depositFixFinFiatWithBanksFormResponseInfoBanksSelector = createPropertySelector(
  depositFixFinFiatWithBanksFormResponseSelectors.info,
  "banks",
);

const depositFixFinFiatCurrentBankSelector = createSimpleSelector(
  [
    depositFixFinFiatWithBanksFormResponseInfoBanksSelector,
    (_, bankId: string) => bankId,
  ],
  (banks, bankId) => getNotNil(
    banks.find((it) => it.id === bankId),
    ["depositFixFinFiatCurrentBankSelector"],
    `banks[${bankId}]`,
  ),
);

const depositFixFinFiatWithBankShouldRequestAccountInfoSelector = createPropertySelector(
  depositFixFinFiatCurrentBankSelector,
  "shouldRequestAccountInfo",
);

export {
  withdrawFixFinFiatCallPayloadSelector,

  depositFixFinFiatWithBankAccountsFormResponseRequestIdSelector,
  depositFixFinFiatWithBankAccountsFormResponseBankAccountsSelector,
  depositFixFinFiatSistemnakitFormResponseInfoSelectors,

  depositFixFinFiatWithBanksFormResponseSelector,
  depositFixFinFiatWithBanksFormResponseSelectors,
  depositFixFinFiatWithBanksFormResponseInfoBanksSelector,

  depositFixFinFiatCurrentBankSelector,
  depositFixFinFiatWithBankShouldRequestAccountInfoSelector,
  depositFixFinFiatVevoHavaleFormResponseSelector,
};

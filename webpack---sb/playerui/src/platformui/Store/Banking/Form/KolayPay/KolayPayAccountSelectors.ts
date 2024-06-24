import { createPropertySelectors, createSimpleSelector, getNotNil } from "@sb/utils";
import type { TPlatform_KolayPayBankAccount_Fragment } from "@sb/graphql-client/PlayerUI";
import { bankingSystemBankAccountsSelector, depositActiveBankAccountIdNotNilSelector } from "../../Selectors/PlatformBankingSelectors";
import { type TPlatformSystemBankAccountType } from "../../PlatformBankingInitialState";

const isKolayPayAccount = (bankAccount: TPlatformSystemBankAccountType[]): bankAccount is TPlatform_KolayPayBankAccount_Fragment[] =>
  bankAccount.every(({ __typename }) => __typename === "Platform_KolayPayBankAccount");

const kolayPayAccountActiveSelector = createSimpleSelector(
  [
    bankingSystemBankAccountsSelector,
    depositActiveBankAccountIdNotNilSelector,
  ],
  (bankAccounts, activeBankAccountId) => {
    if (!isKolayPayAccount(bankAccounts)) {
      throw new Error("Unexpected bank account data selected");
    }

    return getNotNil(
      bankAccounts.find(({ bankAccountId }) => bankAccountId === activeBankAccountId),
      ["bankingKolayPayAccountActiveSelector"],
      activeBankAccountId ?? "activeBankAccountId",
    );
  },
);

const kolayPayAccountActiveSelectors = createPropertySelectors(kolayPayAccountActiveSelector);

export { kolayPayAccountActiveSelectors, kolayPayAccountActiveSelector };

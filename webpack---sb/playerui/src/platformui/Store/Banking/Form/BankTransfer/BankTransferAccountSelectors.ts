import { createPropertySelector, createPropertySelectors, createSimpleSelector, getNotNil } from "@sb/utils";
import type { TPlatform_SystemBankAccount_Fragment } from "@sb/graphql-client/PlayerUI";
import { platformConfigSystemLocaleSelector } from "../../../../../common/Store/Config/Selectors/ConfigSelectors";
import { getTranslatedText } from "../../../../Components/TranslateRecord/TranslateRecord";
import { localeSelector } from "../../../Locale/Selectors/localeSelector";
import { bankingSystemBankAccountsSelector, depositActiveBankAccountIdNotNilSelector } from "../../Selectors/PlatformBankingSelectors";
import type { TPlatformSystemBankAccountType } from "../../PlatformBankingInitialState";

const isBankTransferAccount = (bankAccount: TPlatformSystemBankAccountType[]): bankAccount is TPlatform_SystemBankAccount_Fragment[] =>
  bankAccount.every(({ __typename }) => __typename === "Platform_SystemBankAccount");

const bankTransferAccountActiveSelector = createSimpleSelector(
  [
    bankingSystemBankAccountsSelector,
    depositActiveBankAccountIdNotNilSelector,
  ],
  (bankAccounts, activeBankAccountId) => {
    if (!isBankTransferAccount(bankAccounts)) {
      throw new Error("Unexpected bank account data selected");
    }

    return getNotNil(
      bankAccounts.find(({ id }) => id === activeBankAccountId),
      ["bankTransferAccountActiveSelector", "bankAccounts[activeBankAccountId]"],
      activeBankAccountId,
    );
  },
);

const bankTransferAccountSelectors = createPropertySelectors(bankTransferAccountActiveSelector);

const bankTransferAccountBankNameSelector = createPropertySelector(
  bankTransferAccountSelectors.bank,
  "name",
);

const bankTransferAccountDepositNodeTextSelector = createSimpleSelector(
  [
    bankTransferAccountSelectors.depositNote,
    localeSelector,
    platformConfigSystemLocaleSelector,
  ],
  getTranslatedText,
);

export {
  bankTransferAccountDepositNodeTextSelector,
  bankTransferAccountBankNameSelector,
  bankTransferAccountSelectors,
};

import type {
  TPlatform_AstroPayAccount_Fragment,
  TPlatform_AvailablePaymentMethod_Fragment,
  TPlatform_Bank_Fragment,
  TPlatform_ExxogateBank_Fragment,
  TPlatform_FixFinBank_Fragment,
  TPlatform_KolayPayBankAccount_Fragment,
  TPlatform_PlayerPaymentAccount_Fragment,
  TPlatform_SystemBankAccount_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { EAstroPayTab } from "./Models/AstroPayFormModel";
import { type TPayportMethod } from "./Form/Payport/PayportFormModel";

type TPlatformSystemBankAccountType =
  TPlatform_SystemBankAccount_Fragment
  | TPlatform_KolayPayBankAccount_Fragment
  | TPlatform_AstroPayAccount_Fragment
  | TPlatform_FixFinBank_Fragment
  | TPlatform_ExxogateBank_Fragment

type TPlatformBankType = TPlatform_Bank_Fragment | TPlatform_FixFinBank_Fragment

interface IWithPlatformBankingInitialState {
  banking: {
    availableMethods: TPlatform_AvailablePaymentMethod_Fragment[];
    systemBankAccount: {
      loading: boolean;
      bankAccounts: TPlatformSystemBankAccountType[];
    };
    form: {
      activeBankAccountId: string | null;
      payportMethod: TPayportMethod | null;
    };
    astroPayActiveTab: EAstroPayTab;
    muchBetterPhoneNumber: {
      phoneNumber: string | null;
      trackingCode: string | null;
    };
    playerPaymentAccounts: TPlatform_PlayerPaymentAccount_Fragment[];
    banks: TPlatformBankType[];
    depositLink: string | null;
    formResponse: unknown;
  };
}

const bankingFormInitialState: IWithPlatformBankingInitialState["banking"]["form"] = {
  activeBankAccountId: null,
  payportMethod: null,
};

const bankingInitialState: IWithPlatformBankingInitialState = {
  banking: {
    availableMethods: [],
    systemBankAccount: {
      loading: false,
      bankAccounts: [],
    },
    form: {
      ...bankingFormInitialState,
    },
    astroPayActiveTab: EAstroPayTab.bankAccount,
    muchBetterPhoneNumber: {
      phoneNumber: null,
      trackingCode: null,
    },
    playerPaymentAccounts: [],
    banks: [],
    depositLink: null,
    formResponse: null,
  },
};

export {
  bankingInitialState,
  type IWithPlatformBankingInitialState,
  type TPlatformSystemBankAccountType,
  type TPlatformBankType,
};

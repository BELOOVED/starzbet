import type {
  TPlatform_AvailablePaymentMethod_Fragment,
  TPlatform_Bank_Fragment,
  TPlatform_FixFinBank_Fragment,
  TPlatform_PlayerPaymentAccount_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { actionCreator, actionWithPayloadCreator } from "@sb/utils";
import { type TPlatformSystemBankAccountType } from "./PlatformBankingInitialState";
import { type EAstroPayTab } from "./Models/AstroPayFormModel";
import { type TPayportMethod } from "./Form/Payport/PayportFormModel";

const PREFIX = "@PLATFORM/BANKING";

const platformAvailablePaymentMethodsReceiveAction = actionWithPayloadCreator(PREFIX)(
  "_AVAILABLE_PAYMENT_METHOD_RECEIVE",
  (availableMethods: TPlatform_AvailablePaymentMethod_Fragment[]) => ({ availableMethods }),
);

const platformSystemBankAccountsReceiveAction = (systemBankAccounts: TPlatformSystemBankAccountType[]) => ({
  type: `${PREFIX}_SYSTEM_BANK_ACCOUNT_RECEIVE`,
  payload: { systemBankAccounts },
});

const platformSystemBankAccountsLoadingAction = (loading: boolean) => ({
  type: `${PREFIX}_SYSTEM_BANK_ACCOUNT_LOADING`,
  payload: { loading },
});

const platformBankAccountChangeAction = (bankAccountId: string | null) => ({
  type: `${PREFIX}_BANK_ACCOUNT_CHANGE`,
  payload: { bankAccountId },
});

const platformSystemBankAccountClearFormAction = () => ({
  type: `${PREFIX}_CLEAR_FORM`,
});

const platformBankingClearAllAction = () => ({
  type: `${PREFIX}_CLEAR_ALL`,
});

const platformBankingClearAllBankAction = () => ({
  type: `${PREFIX}_CLEAR_BANK`,
});

const platformBankingAstroPayChangeTabAction = (tab: EAstroPayTab) => ({
  type: `${PREFIX}_ASTRO_PAY_CHANGE_ACTIVE_TAB`,
  payload: { tab },
});

const platformBankingMuchBetterPhoneNumberAction = (phoneNumber: string) => ({
  type: `${PREFIX}_MUCH_BETTER_PHONE_NUMBER`,
  payload: { phoneNumber },
});

const platformBankingMuchBetterTrackingCodeAction = (trackingCode: string | null) => ({
  type: `${PREFIX}_MUCH_BETTER_TRACKING_CODE`,
  payload: { trackingCode },
});

const platformBankingPlayerPaymentAccountFetchAction = actionCreator(
  PREFIX,
)("PLAYER_PAYMENT_ACCOUNTS_FETCH");

const platformBankingPlayerPaymentAccountsReceiveAction = (paymentAccounts: TPlatform_PlayerPaymentAccount_Fragment[]) => ({
  type: `${PREFIX}_PLAYER_PAYMENT_ACCOUNTS_RECEIVE`,
  payload: { paymentAccounts },
});

const platformBankingMethodSelectedAction = actionWithPayloadCreator(PREFIX)(
  "_METHOD_SELECTED",
  (
    bankId: string,
    type: string,
  ) => ({
    bankId,
    type,
  }),
);

const platformBanksReceiveAction = actionWithPayloadCreator(PREFIX)(
  "BANKS_RECEIVE",
  (banks: (TPlatform_Bank_Fragment | TPlatform_FixFinBank_Fragment)[]) => ({ banks }),
);

const depositLinkReceiveAction = actionWithPayloadCreator(PREFIX)(
  "DEPOSIT_LINK_RECEIVE",
  (depositLink) => ({ depositLink }),
);

const depositFixFinBankSelectedAction = actionWithPayloadCreator(PREFIX)(
  "DEPOSIT_FIX_FIN_BANK_SELECTED",
  (bankId: string) => ({ bankId }),
);

const depositFixFinSelectedBankConfirmAction = actionCreator(PREFIX)("DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM");

const bankingFormReceiveResponseAction = actionWithPayloadCreator(PREFIX)(
  "FORM_RECEIVE_RESPONSE",
  (formResponse) => ({ formResponse }),
);

const payportMethodChangeAction = actionWithPayloadCreator(PREFIX)(
  "PAYPORT_METHOD_CHANGE",
  (payportMethod: TPayportMethod) => ({ payportMethod }),
);

const fixFinVevoHavaleBankAccountSelectAction = actionWithPayloadCreator(PREFIX)(
  "FIX_FIN_VEVO_HAVALE_BANK_SELECT",
  (bankAccountId: string) => ({ bankAccountId }),
);

export {
  platformAvailablePaymentMethodsReceiveAction,
  platformSystemBankAccountsReceiveAction,
  platformSystemBankAccountsLoadingAction,
  platformBankAccountChangeAction,
  platformSystemBankAccountClearFormAction,
  platformBankingClearAllAction,
  platformBankingClearAllBankAction,
  platformBankingAstroPayChangeTabAction,
  platformBankingMuchBetterPhoneNumberAction,
  platformBankingMuchBetterTrackingCodeAction,
  platformBankingPlayerPaymentAccountsReceiveAction,
  platformBankingMethodSelectedAction,
  platformBankingPlayerPaymentAccountFetchAction,
  platformBanksReceiveAction,
  depositLinkReceiveAction,
  depositFixFinBankSelectedAction,
  depositFixFinSelectedBankConfirmAction,
  bankingFormReceiveResponseAction,
  payportMethodChangeAction,
  fixFinVevoHavaleBankAccountSelectAction,
};

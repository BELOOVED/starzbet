import type { TPlatform_TransactionRequestDataPayload_Fragment } from "@sb/graphql-client/PlayerUI";
import { isVoid, type TNullable } from "@sb/utils";

const getTransactionRequestDescription = (
  payload: TNullable<TPlatform_TransactionRequestDataPayload_Fragment>,
): string | null => {
  if (isVoid(payload)) {
    return null;
  }

  switch (payload.__typename) {
    case "Platform_BankTransferDepositData":
      return payload.systemBankAccount.bank.name;

    case "Platform_BankTransferWithdrawalData":
    case "Platform_KolayPayHavaleWithdrawalRequestData":
      return payload.playerPaymentAccount.nickname;

    case "Platform_MuchBetterDepositRequestData":
      return payload.depositMuchBetterPhoneNumber;

    case "Platform_MuchBetterWithdrawalRequestData":
      return payload.withdrawalMuchBetterPhoneNumber;

    case "Platform_FixFinCryptoDepositRequestData":
      return `${payload.coin.toUpperCase()} (${payload.network})`;

    case "Platform_FixFinCryptoWithdrawalRequestAfterApplyData":
      return `${payload.cryptoCurrency} (${payload.network})`;

    case "Platform_FixFinSistemnakitPaparaDepositRequestData":
      return payload.paparaFullName;

    case "Platform_FixFinSistemnakitHavaleDepositRequestData":
      return payload.accountIban;

    case "Platform_FixFinVegapayHavaleApprovedDepositRequestData":
      return payload.bankAccountType;

    case "Platform_FixFinFiatWithdrawalRequestData":
    case "Platform_FixFinVegapayHavaleWithdrawalRequestData":
    case "Platform_FixFinVegapayPaparaWithdrawalRequestAfterApplyData":
    case "Platform_FixFinUltrapayWithdrawalRequestData":
    case "Platform_PayRetailersWithdrawalViaBankDetailsRequestData":
    case "Platform_FixFinKolayPayPaparaWithdrawalRequestData":
    case "Platform_FixFinKolayPayPaparaWithdrawalRequestAfterApplyData":
    case "Platform_FixFinKolayPayHavaleWithdrawalRequestData":
    case "Platform_FixFinSistemnakitHavaleWithdrawalRequestData":
    case "Platform_FixFinSistemnakitHavaleWithdrawalRequestAfterApplyData":
    case "Platform_FixFinFinpayHavaleWithdrawalRequestData":
    case "Platform_FixFinSeripay1WithdrawalRequestData":
    case "Platform_FixFinFin2WithdrawalRequestData":
    case "Platform_FixFinPayfutureWithdrawalRequestData":
    case "Platform_FixFinTurkpayWithdrawalRequestData":
      return payload.accountNumber;

    case "Platform_FixFinVevoHavaleDepositRequestData":
      return payload.iban;

    case "Platform_PayRetailersWithdrawalViaPixRequestData":
      return payload.recipientPixKey;

    case "Platform_AnSpacePayTransferPixRequestData":
    case "Platform_VpagWithdrawalRequestData":
      return payload.pixKey;

    case "Platform_FixFinPopyparaWithdrawalRequestAfterApplyData":
      return payload.address;

    case "Platform_FixFinTrHavaleEftWithdrawalRequestData":
      return payload.accountNumberNullable;

    case "Platform_LuxonPayWithdrawalRequestData":
    case "Platform_SkrillTransferRequestData":
      return payload.playerEmail;

    case "Platform_OneSepaWithdrawalPaymentRequestData":
    case "Platform_OneSwiftWithdrawalPaymentRequestData":
      return payload.playerAccountName;

    case "Platform_ExxogateImps29PayoutRequestData":
    case "Platform_ExxogateImps41PayoutRequestData":
    case "Platform_ExxogateBankPayoutRequestData":
    case "Platform_PaymentClipPayoutRequestData":
      return payload.bankAccountNumber;

    case "Platform_PayPortWithdrawalRequestData": {
      switch (payload.withdrawalDetails.__typename) {
        case "Platform_PayPortBankDetails":
          return payload.withdrawalDetails.accountNumber;
        case "Platform_PayPortClientAccountDetails":
          return payload.withdrawalDetails.accountInfo;
        case "Platform_PayPortCashDetails":
          return payload.withdrawalDetails.phone;

        default:
          return null;
      }
    }

    default:
      return null;
  }
};

export { getTransactionRequestDescription };

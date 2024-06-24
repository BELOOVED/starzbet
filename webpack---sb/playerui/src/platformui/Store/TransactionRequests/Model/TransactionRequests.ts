import { type EPlatform_TransactionRequestWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { EPluginCode } from "@sb/betting-core/EPluginCode";

const paymentPlugins = [
  EPluginCode.BANK_TRANSFER,
  EPluginCode.KOLAY_PAY,
  EPluginCode.ASTRO_PAY,
  EPluginCode.MUCH_BETTER,
  EPluginCode.FIX_FIN,
  EPluginCode.PAY_RETAILERS,
  EPluginCode.VPAG,
  EPluginCode.AN_SPACE_PAY,
  EPluginCode.LUXON_PAY,
  EPluginCode.SKRILL,
  EPluginCode.ONE,
  EPluginCode.PAYMENT_CLIP,
  EPluginCode.PAYCENT,
  EPluginCode.PAY_PORT,
  EPluginCode.EXXOGATE,
];

const getPaymentPluginOperands = <T extends EPlatform_TransactionRequestWhereFieldPaths>(
  fieldPath: T,
) => paymentPlugins.map(
    (value) => ({
      predicate: EWhere_Predicate.eq,
      fieldPath,
      value,
    }),
  );

const transactionRequestPayloadKind = {
  BankTransferDepositData: "BankTransferDepositData",
  BankTransferWithdrawalData: "BankTransferWithdrawalData",
};

const transactionRequestPayloadType = {
  Platform_BankTransferDepositData: "Platform_BankTransferDepositData",
  Platform_BankTransferWithdrawalData: "Platform_BankTransferWithdrawalData",
  Platform_CorrectionRequestData: "Platform_CorrectionRequestData",

  Platform_SportsbookBetRequestData: "Platform_SportsbookBetRequestData",
  Platform_SportsbookBetData: "Platform_SportsbookBetData",
  Platform_SportsbookBetRequestBatchData: "Platform_SportsbookBetRequestBatchData",

  Platform_PragmaticPlayBetRequestData: "PlatformPragmaticPlay_BetRequestData",
  Platform_PragmaticPlayResultRequestData: "Platform_PragmaticPlayResultRequestData",
  Platform_PragmaticPlayEndRoundRequestData: "Platform_PragmaticPlayEndRoundRequestData",
  Platform_PragmaticPlayRefundRequestData: "Platform_PragmaticPlayRefundRequestData",
  Platform_PragmaticPlayBonusWinRequestData: "Platform_PragmaticPlayBonusWinRequestData",
  Platform_PragmaticPlayJackpotWinRequestData: "Platform_PragmaticPlayJackpotWinRequestData",
  Platform_PragmaticPlayPromoWinRequestData: "Platform_PragmaticPlayPromoWinRequestData",

  Platform_EzugiDebitRequestData: "Platform_EzugiDebitRequestData",
  Platform_EzugiCreditRequestData: "Platform_EzugiCreditRequestData",
  Platform_EzugiRollbackRequestData: "Platform_EzugiRollbackRequestData",

  Platform_PlayerBonusWinInfo: "Platform_PlayerBonusWinInfo",
  Platform_PlayerBonusActivationInfo: "Platform_PlayerBonusActivationInfo",
  Platform_PlayerBonusFinishedInfo: "Platform_PlayerBonusFinishedInfo",
};

export {
  getPaymentPluginOperands,
  transactionRequestPayloadKind,
  transactionRequestPayloadType,
};

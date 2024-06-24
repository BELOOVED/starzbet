import {
  platformui_transactionRequest_step_approved,
  platformui_transactionRequest_step_paid,
  platformui_transactionRequest_step_requestReceived,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";

enum ETransactionRequestDisplayedStatusStep {
  received = "received",
  approved = "approved",
  paid = "paid"
}

const TRANSACTION_REQUEST_STEP_TRANSLATE_MAP: Record<ETransactionRequestDisplayedStatusStep, TCommonTKeys> = {
  [ETransactionRequestDisplayedStatusStep.received]: platformui_transactionRequest_step_requestReceived,
  [ETransactionRequestDisplayedStatusStep.approved]: platformui_transactionRequest_step_approved,
  [ETransactionRequestDisplayedStatusStep.paid]: platformui_transactionRequest_step_paid,
};

export { ETransactionRequestDisplayedStatusStep, TRANSACTION_REQUEST_STEP_TRANSLATE_MAP };

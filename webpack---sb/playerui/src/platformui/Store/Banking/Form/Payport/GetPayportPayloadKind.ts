import { EPlatform_PayPortPaymentSystemType } from "@sb/graphql-client";

const getPayportPayloadKind = (payportMethod: EPlatform_PayPortPaymentSystemType) => {
  switch (payportMethod) {
    case EPlatform_PayPortPaymentSystemType.upi:
    case EPlatform_PayPortPaymentSystemType.phonepe:
    case EPlatform_PayPortPaymentSystemType.paytm:
      return "PayPortClientAccountDetails";

    case EPlatform_PayPortPaymentSystemType.imps:
    case EPlatform_PayPortPaymentSystemType.neft:
    case EPlatform_PayPortPaymentSystemType.rtgs:
      return "PayPortBankDetails";

    case EPlatform_PayPortPaymentSystemType.cash:
      return "PayPortCashDetails";

    default:
      throw new Error(`[getPayportPayloadKind]: Unknown payload kind for ${payportMethod}`);
  }
};

export { getPayportPayloadKind };

import { type TCallResponsePayload } from "@sb/sdk";
import { type call_PayPortGetAvailablePaymentMethodsQuery } from "@sb/sdk/SDKClient/paymentintegration";
import { EPlatform_PayPortPaymentSystemType } from "@sb/graphql-client";
import { getSelectOptions } from "../../../../../common/Components/Field/SelectModel";

const PAYPORT_METHOD_FORM = "payportMethodForm";

type TPayportMethod = TCallResponsePayload<typeof call_PayPortGetAvailablePaymentMethodsQuery>[number]

function assertsPayportMethodSystemType(method: unknown): asserts method is EPlatform_PayPortPaymentSystemType {
  if (!Object.values(EPlatform_PayPortPaymentSystemType).some((it) => it === method)) {
    throw new Error(`[assertsPayportMethodSystemType]: Incompatible types ${method} to EPlatform_PayPortPaymentSystemType`);
  }
}

const getPayportMethod = (method: unknown): EPlatform_PayPortPaymentSystemType => {
  assertsPayportMethodSystemType(method);

  return method;
};

interface IPayPortBankDetails {
  accountNumber: string;
  beneficiaryName: string;
  branchName: string;
  ifscCode: string;
}

interface IPayPortCashDetails {
  customerName: string;
  email: string;
  phone: string;
}

interface IPayPortClientAccountDetails {
  accountInfo: string;
}

enum EPayportPaytmFormType {
  phone = "phone",
  upi = "upi"
}

const PAYPORT_PAYTM_SELECT_OPTIONS = getSelectOptions(Object.values(EPayportPaytmFormType));

interface IPayportPaytmFormDetails {
  type: EPayportPaytmFormType;
  accountInfo: string;
}

type TPayportWithdrawForm = {
  details:
    IPayPortBankDetails |
    IPayPortCashDetails |
    IPayPortClientAccountDetails |
    IPayportPaytmFormDetails;
}

export type {
  TPayportMethod,
  IPayPortBankDetails,
  IPayPortCashDetails,
  IPayPortClientAccountDetails,
  IPayportPaytmFormDetails,
  TPayportWithdrawForm,
};
export {
  PAYPORT_METHOD_FORM,
  getPayportMethod,
  PAYPORT_PAYTM_SELECT_OPTIONS,
  EPayportPaytmFormType,
};

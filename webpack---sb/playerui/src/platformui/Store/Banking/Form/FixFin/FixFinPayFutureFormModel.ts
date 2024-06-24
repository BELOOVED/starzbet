import { EPlatform_FixFinPayfutureMethodType } from "@sb/graphql-client";
import {
  platformui_withdraw_payfuture_methodType_bankTransfer,
  platformui_withdraw_payfuture_methodType_netBanking,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { type EIndianStateAbbreviation } from "../../Models/IndianStateAbbreviation";

type TFixFinPayFutureDepositFormModel = {
  address: string;
  city: string;
  email: string;
  phone: string;
  postcode: string;
  state: EIndianStateAbbreviation;
}

type TFixFinPayFutureWithdrawNetBankingFormModel = {
  methodType: EPlatform_FixFinPayfutureMethodType.netbanking;
  details: {
    bankBranch: string;
    bankName: string;
    /**
     * 10 digits format
     */
    accountNumber: string;
  };
}

type TFixFinPayFutureWithdrawBankTransferFormModel = {
  methodType: EPlatform_FixFinPayfutureMethodType.banktransfer;
  details: {
    /**
     * IBAN format
     */
    accountNumber: string;
  };
}

type TFixFinPayFutureWithdrawFormModel = (TFixFinPayFutureWithdrawNetBankingFormModel | TFixFinPayFutureWithdrawBankTransferFormModel) & {
  accountHolderName: string;
  email: string;
  phone: string;
  bankCode: string;
}

const FIX_FIN_PAY_FUTURE_METHOD_TYPE_OPTIONS = Object.values(EPlatform_FixFinPayfutureMethodType);

const FIX_FIN_PAY_FUTURE_METHOD_TYPE_TRANSLATE_MAP: Record<EPlatform_FixFinPayfutureMethodType, TCommonTKeys> = {
  [EPlatform_FixFinPayfutureMethodType.banktransfer]: platformui_withdraw_payfuture_methodType_bankTransfer,
  [EPlatform_FixFinPayfutureMethodType.netbanking]: platformui_withdraw_payfuture_methodType_netBanking,
};

export type {
  TFixFinPayFutureDepositFormModel,

  TFixFinPayFutureWithdrawNetBankingFormModel,
  TFixFinPayFutureWithdrawBankTransferFormModel,
  TFixFinPayFutureWithdrawFormModel,
};
export {
  FIX_FIN_PAY_FUTURE_METHOD_TYPE_OPTIONS,
  FIX_FIN_PAY_FUTURE_METHOD_TYPE_TRANSLATE_MAP,
};

import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FinancialsSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FinancialsSummaryMeasures_Fragment";
import {
  Platform_DepositsWithdrawalsSummaryMeasures_Normalizer,
} from "./Platform_DepositsWithdrawalsSummaryMeasures_Normalizer";
import { Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer } from "./Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer";
import { Platform_FirstTimeDepositsSummaryMeasures_Normalizer } from "./Platform_FirstTimeDepositsSummaryMeasures_Normalizer";
import { Platform_SystemFinancialsSummaryMeasures_Normalizer } from "./Platform_SystemFinancialsSummaryMeasures_Normalizer";

type TPlatform_FinancialsSummaryMeasures_Record = TRecord & Partial<{
  ftDepositsSummaryId: string | null;
  systemFinancialsSummaryId: string | null;
  ftWithdrawalsSummaryId: string | null;
  depositsWithdrawalsSummaryId: string | null;
}>

type TPlatform_FinancialsSummaryMeasures_AdditionalData = { id: string; }

const Platform_FinancialsSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FinancialsSummaryMeasures_Fragment,
  TPlatform_FinancialsSummaryMeasures_Record,
  TPlatform_FinancialsSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFinancialsSummaryMeasures,
  ERecordName.platformFinancialsSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.id;
    const financialsSummaryMeasures: TPlatform_FinancialsSummaryMeasures_Record = { id };

    if (hasOwnProperty(fragment, "ftDepositsSummary")) {
      financialsSummaryMeasures.ftDepositsSummaryId = fragment.ftDepositsSummary
        ? Platform_FirstTimeDepositsSummaryMeasures_Normalizer(recordsManager, fragment.ftDepositsSummary, { id }).id
        : null;
    }

    if (hasOwnProperty(fragment, "systemFinancialsSummary")) {
      financialsSummaryMeasures.systemFinancialsSummaryId = fragment.systemFinancialsSummary
        ? Platform_SystemFinancialsSummaryMeasures_Normalizer(recordsManager, fragment.systemFinancialsSummary, { id }).id
        : null;
    }

    if (hasOwnProperty(fragment, "ftWithdrawalsSummary")) {
      financialsSummaryMeasures.ftWithdrawalsSummaryId = fragment.ftWithdrawalsSummary
        ? Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer(recordsManager, fragment.ftWithdrawalsSummary, { id }).id
        : null;
    }

    if (hasOwnProperty(fragment, "depositsWithdrawalsSummary")) {
      financialsSummaryMeasures.depositsWithdrawalsSummaryId = fragment.depositsWithdrawalsSummary
        ? Platform_DepositsWithdrawalsSummaryMeasures_Normalizer(
          recordsManager,
          fragment.depositsWithdrawalsSummary,
          { id },
        ).id
        : null;
    }

    return financialsSummaryMeasures;
  },
);

export type { TPlatform_FinancialsSummaryMeasures_Record };
export { Platform_FinancialsSummaryMeasures_Normalizer };

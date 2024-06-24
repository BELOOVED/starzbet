import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_PaidInvoiceSummary_QueryResult } from "../../Generated/Services/Platform/Types/TPlatform_PaidInvoiceSummary_QueryResult";
import {
  type TPlatform_PaidInvoiceSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_PaidInvoiceSummary_QueryNormalizationData";
import { Platform_PaidInvoiceSummary_Normalizer } from "./Platform_PaidInvoiceSummary_Normalizer";

type TPlatform_PaidInvoiceSummary_QueryResult_Record = TRecord & {
  paidInvoiceSummaryId: string;
}

const Platform_PaidInvoiceSummary_QueryResult_Normalizer = normalizerCreator<TPlatform_PaidInvoiceSummary_QueryResult,
  TPlatform_PaidInvoiceSummary_QueryResult_Record,
  TPlatform_PaidInvoiceSummary_QueryNormalizationData>(
    "Platform_PaidInvoiceSummary_QueryResult",
    ERecordName.platformPaidInvoiceSummaryQueryResult,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.resultId,
      paidInvoiceSummaryId: Platform_PaidInvoiceSummary_Normalizer(
        recordsManager,
        fragment.platform.PaidInvoiceSummary,
        { key: additionalData.resultId },
      ).id,
    }),
  );

export type { TPlatform_PaidInvoiceSummary_QueryResult_Record };
export { Platform_PaidInvoiceSummary_QueryResult_Normalizer };

import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_PendingInvoiceSummary_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_PendingInvoiceSummary_QueryResult";
import {
  type TPlatform_PendingInvoiceSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_PendingInvoiceSummary_QueryNormalizationData";
import { Platform_PendingInvoiceSummary_Normalizer } from "./Platform_PendingInvoiceSummary_Normalizer";

type TPlatform_PendingInvoiceSummary_QueryResult_Record = TRecord & {
  pendingInvoiceSummaryId: string;
}

const Platform_PendingInvoiceSummary_QueryResult_Normalizer = normalizerCreator<TPlatform_PendingInvoiceSummary_QueryResult,
  TPlatform_PendingInvoiceSummary_QueryResult_Record,
  TPlatform_PendingInvoiceSummary_QueryNormalizationData>(
    "Platform_PendingInvoiceSummary_QueryResult",
    ERecordName.platformPendingInvoiceSummaryQueryResult,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.resultId,
      pendingInvoiceSummaryId: Platform_PendingInvoiceSummary_Normalizer(
        recordsManager,
        fragment.platform.PendingInvoiceSummary,
        { key: additionalData.resultId },
      ).id,
    }),
  );

export type { TPlatform_PendingInvoiceSummary_QueryResult_Record };
export { Platform_PendingInvoiceSummary_QueryResult_Normalizer };

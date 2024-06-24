import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_SystemFinancialsSummaryGroupingSet_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_SystemFinancialsSummaryGroupingSet_Fragment";

type TPlatform_SystemFinancialsSummaryGroupingSet_AdditionalData = { id: string; }

type TPlatform_SystemFinancialsSummaryGroupingSet_Record = TRecord & {
  periodStart: string | null;
  periodEnd: string | null;
}

const Platform_SystemFinancialsSummaryGroupingSet_Normalizer = normalizerCreator<TPlatform_SystemFinancialsSummaryGroupingSet_Fragment,
  TPlatform_SystemFinancialsSummaryGroupingSet_Record,
  TPlatform_SystemFinancialsSummaryGroupingSet_AdditionalData>(
    EPlatform_Typename.platformSystemFinancialsSummaryGroupingSet,
    ERecordName.platformSystemFinancialsSummaryGroupingSet,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.id,
      periodStart: fragment.periodStart ?? null,
      periodEnd: fragment.periodStart ?? null,
    }),
  );

export type { TPlatform_SystemFinancialsSummaryGroupingSet_Record };
export { Platform_SystemFinancialsSummaryGroupingSet_Normalizer };

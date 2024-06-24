import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_FinancialsSummary_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_FinancialsSummary_Fragment";
import { Platform_FinancialsSummaryMeasures_Normalizer } from "./Platform_FinancialsSummaryMeasures_Normalizer";
import { Platform_FinancialsSummaryGroupingSet_Normalizer } from "./Platform_FinancialsSummaryGroupingSet_Normalizer";

type TPlatform_FinancialsSummary_AdditionalData = {
  id: string;
}

type TPlatform_FinancialsSummary_Record = TRecord & {
  dataId: string;
  groupId: string;
}

const Platform_FinancialsSummary_Normalizer = normalizerCreator<
  TPlatform_FinancialsSummary_Fragment,
  TPlatform_FinancialsSummary_Record,
  TPlatform_FinancialsSummary_AdditionalData
>(
  EPlatform_Typename.platformFinancialsSummary,
  ERecordName.platformFinancialsSummary,
  (
    recordsManager,
    fragment,
    additionalData,
  ) => {
    const id = additionalData.id;
    const dataId = `Platform_FinancialsSummaryMeasures_${id}`;
    const groupId = `Platform_FinancialsSummaryGroupingSet_${id}`;

    if (fragment.group) {
      Platform_FinancialsSummaryGroupingSet_Normalizer(recordsManager, fragment.group, { id: groupId });
    }

    return {
      id,
      dataId: Platform_FinancialsSummaryMeasures_Normalizer(recordsManager, fragment.data, { id: dataId }).id,
      groupId,
    };
  },
);

export type { TPlatform_FinancialsSummary_Record };
export { Platform_FinancialsSummary_Normalizer };

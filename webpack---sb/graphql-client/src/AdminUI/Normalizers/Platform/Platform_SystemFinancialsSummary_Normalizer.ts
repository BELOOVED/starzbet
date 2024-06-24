import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_SystemFinancialsSummary_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_SystemFinancialsSummary_Fragment";
import { Platform_SystemFinancialsSummaryGroupingSet_Normalizer } from "./Platform_SystemFinancialsSummaryGroupingSet_Normalizer";
import { Platform_SystemFinancialsSummaryMeasures_Normalizer } from "./Platform_SystemFinancialsSummaryMeasures_Normalizer";

type TPlatform_SystemFinancialsSummary_AdditionalData = {
  key: string;
}

type TPlatform_SystemFinancialsSummary_Record = TRecord & {
  dataId: string;
  groupId: string;
}

const Platform_SystemFinancialsSummary_Normalizer = normalizerCreator<TPlatform_SystemFinancialsSummary_Fragment,
  TPlatform_SystemFinancialsSummary_Record,
  TPlatform_SystemFinancialsSummary_AdditionalData>(
    EPlatform_Typename.platformSystemFinancialsSummary,
    ERecordName.platformSystemFinancialsSummary,
    (recordsManager, fragment, additionalData) => {
      const id = `platformSystemFinancialsSummary_${additionalData.key}`;

      const groupId = `${additionalData.key}_systemFinancialsSummaryGroupingSet`;

      if (fragment.group) {
        Platform_SystemFinancialsSummaryGroupingSet_Normalizer(recordsManager, fragment.group, { id: groupId });
      }

      return {
        id,
        dataId: Platform_SystemFinancialsSummaryMeasures_Normalizer(recordsManager, fragment.data, { id }).id,
        groupId,
      };
    },
  );

export type { TPlatform_SystemFinancialsSummary_Record };
export { Platform_SystemFinancialsSummary_Normalizer };

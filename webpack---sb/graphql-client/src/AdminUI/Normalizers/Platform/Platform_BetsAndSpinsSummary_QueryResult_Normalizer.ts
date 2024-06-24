import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_BetsAndSpinsSummary_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_BetsAndSpinsSummary_QueryResult";
import {
  type TPlatform_BetsAndSpinsSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_BetsAndSpinsSummary_QueryNormalizationData";
import { Sportsbook_BetsSummary_Normalizer } from "../Sportsbook/Sportsbook_BetsSummary_Normalizer";

type TPlatform_BetsAndSpinsSummary_QueryResult_Record = TRecord & {
  ids: string[];
};

const Platform_BetsAndSpinsSummary_QueryResult_Normalizer = normalizerCreator<
  TPlatform_BetsAndSpinsSummary_QueryResult,
  TPlatform_BetsAndSpinsSummary_QueryResult_Record,
  TPlatform_BetsAndSpinsSummary_QueryNormalizationData
  >(
    "Platform_BetsAndSpinsSummary_QueryResult",
    ERecordName.platformBetsAndSpinsSummaryQueryResult,
    (recordsManager, result, additionalData) => {
      const ids = result
        .platform
        .BetsAndSpinsSummary
        .map(
          (fragment, index) => Sportsbook_BetsSummary_Normalizer(
            recordsManager,
            fragment,
            { key: `${additionalData.resultId}_${index}` },
          ).id,
        );

      return {
        id: additionalData.resultId,
        ids,
      };
    },
  );

export type { TPlatform_BetsAndSpinsSummary_QueryResult_Record };
export { Platform_BetsAndSpinsSummary_QueryResult_Normalizer };

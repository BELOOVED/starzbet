import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_BetsSummary_QueryResult } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetsSummary_QueryResult";
import {
  type TSportsbook_BetsSummary_QueryNormalizationData,
} from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetsSummary_QueryNormalizationData";
import { Sportsbook_BetsSummary_Normalizer } from "./Sportsbook_BetsSummary_Normalizer";

type TSportsbook_BetsSummary_QueryResult_Record = TRecord & {
  ids: string[];
};

const Sportsbook_BetsSummary_QueryResult_Normalizer = normalizerCreator<
  TSportsbook_BetsSummary_QueryResult,
  TSportsbook_BetsSummary_QueryResult_Record,
  TSportsbook_BetsSummary_QueryNormalizationData
  >(
    "Sportsbook_BetsSummary_QueryResult",
    ERecordName.sportsbookBetsSummaryQueryResult,
    (recordsManager, result, additionalData) => {
      const ids = result
        .sportsbook
        .BetsSummary
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

export type { TSportsbook_BetsSummary_QueryResult_Record };
export { Sportsbook_BetsSummary_QueryResult_Normalizer };

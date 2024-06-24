import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TSportsbook_BetRequestsSummary_QueryResult,
} from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetRequestsSummary_QueryResult";
import {
  type TSportsbook_BetRequestsSummary_QueryNormalizationData,
} from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetRequestsSummary_QueryNormalizationData";
import { Sportsbook_BetRequestsSummary_Normalizer } from "./Sportsbook_BetRequestsSummary_Normalizer";

type TSportsbook_BetRequestsSummary_QueryResult_Record = TRecord & {
  ids: string[];
};

const Sportsbook_BetRequestsSummary_QueryResult_Normalizer = normalizerCreator<
  TSportsbook_BetRequestsSummary_QueryResult,
  TSportsbook_BetRequestsSummary_QueryResult_Record,
  TSportsbook_BetRequestsSummary_QueryNormalizationData
>(
  "Sportsbook_BetRequestsSummary_QueryResult",
  ERecordName.sportsbookBetRequestsSummaryQueryResult,
  (recordsManager, result, additionalData) => {
    const ids = result
      .sportsbook
      .BetRequestsSummary
      .map(
        (fragment, index) => Sportsbook_BetRequestsSummary_Normalizer(
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

export type { TSportsbook_BetRequestsSummary_QueryResult_Record };
export { Sportsbook_BetRequestsSummary_QueryResult_Normalizer };

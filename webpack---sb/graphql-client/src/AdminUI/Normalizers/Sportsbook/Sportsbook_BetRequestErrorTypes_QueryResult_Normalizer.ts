import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_BetRequestErrorTypes_QueryResult } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetRequestErrorTypes_QueryResult";
import { type TSportsbook_BetRequestErrorTypes_QueryNormalizationData } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetRequestErrorTypes_QueryNormalizationData";

type TSportsbook_BetRequestErrorTypes_QueryResult_Record = TRecord & {
  ids: string[];
};

const Sportsbook_BetRequestErrorTypes_QueryResult_Normalizer = normalizerCreator<TSportsbook_BetRequestErrorTypes_QueryResult,
  TSportsbook_BetRequestErrorTypes_QueryResult_Record,
  TSportsbook_BetRequestErrorTypes_QueryNormalizationData>(
    "Sportsbook_BetRequestErrorTypes_QueryResult",
    ERecordName.sportsbookBetRequestErrorTypesQueryResult,
    (recordsManager, result, additionalData) => ({
      id: additionalData.resultId,
      ids: result.sportsbook.BetRequestErrorTypes,
    }),
  );

export type { TSportsbook_BetRequestErrorTypes_QueryResult_Record };
export { Sportsbook_BetRequestErrorTypes_QueryResult_Normalizer };

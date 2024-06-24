import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_BetRequestsSummary_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetRequestsSummary_Fragment";
import { Sportsbook_BetsSummaryMeasures_Normalizer } from "./Sportsbook_BetsSummaryMeasures_Normalizer";

type TSportsbook_BetRequestsSummary_Record = TRecord & {
  dataId: string;
}

type TSportsbook_BetRequestsSummary_AdditionalData = { key: string; }

const Sportsbook_BetRequestsSummary_Normalizer = normalizerCreator<
  TSportsbook_BetRequestsSummary_Fragment,
  TSportsbook_BetRequestsSummary_Record,
  TSportsbook_BetRequestsSummary_AdditionalData
>(
  ESportsbook_Typename.sportsbookBetRequestsSummary,
  ERecordName.sportsbookBetRequestsSummary,
  (recordsManager, fragment, additionalData) => {
    const id = `sportsbookBetRequestsSummary_${additionalData.key}`;
    const dataId = `sportsbookBetRequestsSummaryMeasures_${additionalData.key}`;

    return {
      id,
      dataId: Sportsbook_BetsSummaryMeasures_Normalizer(recordsManager, fragment.data, { id: dataId }).id,
    };
  },
);

export type { TSportsbook_BetRequestsSummary_Record };
export { Sportsbook_BetRequestsSummary_Normalizer };

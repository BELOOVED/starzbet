import { hasOwnProperty, type IMoney } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_BetsSummaryMeasures_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetsSummaryMeasures_Fragment";

type TSportsbook_BetsSummaryMeasures_AdditionalData = { id: string; }

type TSportsbook_BetsSummaryMeasures_Record = TRecord & Partial<{
  betsCount: number | null;
  stakesAmount: IMoney | null;
  winLoss: IMoney | null;
}>

const Sportsbook_BetsSummaryMeasures_Normalizer = normalizerCreator<
  TSportsbook_BetsSummaryMeasures_Fragment,
  TSportsbook_BetsSummaryMeasures_Record,
  TSportsbook_BetsSummaryMeasures_AdditionalData
>(
  ESportsbook_Typename.sportsbookBetsSummaryMeasures,
  ERecordName.sportsbookBetsSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const betsSummaryMeasures: TSportsbook_BetsSummaryMeasures_Record = { id: additionalData.id };

    if (hasOwnProperty(fragment, "betsCount")) {
      betsSummaryMeasures.betsCount = fragment.betsCount;
    }

    if (hasOwnProperty(fragment, "winLoss")) {
      betsSummaryMeasures.winLoss = fragment.winLoss;
    }

    if (hasOwnProperty(fragment, "stakesAmount")) {
      betsSummaryMeasures.stakesAmount = fragment.stakesAmount;
    }

    return betsSummaryMeasures;
  },
);

export type { TSportsbook_BetsSummaryMeasures_Record };
export { Sportsbook_BetsSummaryMeasures_Normalizer };

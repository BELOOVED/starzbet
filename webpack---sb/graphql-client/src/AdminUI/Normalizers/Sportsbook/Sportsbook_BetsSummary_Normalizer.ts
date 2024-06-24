import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_BetsSummary_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetsSummary_Fragment";
import { Sportsbook_BetsSummaryMeasures_Normalizer } from "./Sportsbook_BetsSummaryMeasures_Normalizer";

type TSportsbook_BetsSummary_Record = TRecord & {
  dataId: string;
}

type TSportsbook_BetsSummary_AdditionalData = { key: string; }

const Sportsbook_BetsSummary_Normalizer = normalizerCreator<
  TSportsbook_BetsSummary_Fragment,
  TSportsbook_BetsSummary_Record,
  TSportsbook_BetsSummary_AdditionalData
  >(
    ESportsbook_Typename.sportsbookBetsSummary,
    ERecordName.sportsbookBetsSummary,
    (recordsManager, fragment, additionalData) => {
      const id = `sportsbookBetsSummary_${additionalData.key}`;
      const dataId = `sportsbookBetsSummaryMeasures_${additionalData.key}`;

      return {
        id,
        dataId: Sportsbook_BetsSummaryMeasures_Normalizer(recordsManager, fragment.data, { id: dataId }).id,
      };
    },
  );

export type { TSportsbook_BetsSummary_Record };
export { Sportsbook_BetsSummary_Normalizer };

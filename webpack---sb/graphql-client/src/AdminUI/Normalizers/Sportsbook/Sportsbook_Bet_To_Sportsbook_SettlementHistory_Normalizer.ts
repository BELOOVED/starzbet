import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TSportsbook_Bet_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Bet_Fragment";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";

type TSportsbook_Bet_To_Sportsbook_SettlementHistory_Record = TRecord & {
    ids: string[];
};

type TSportsbook_Bet_To_Sportsbook_SettlementHistory_AdditionalData = { id: string; };

const Sportsbook_Bet_To_Sportsbook_SettlementHistory_Normalizer = normalizerCreator<
    TSportsbook_Bet_Fragment,
    TSportsbook_Bet_To_Sportsbook_SettlementHistory_Record,
    TSportsbook_Bet_To_Sportsbook_SettlementHistory_AdditionalData
>(
  ESportsbook_Typename.sportsbookBet,
  ERecordName.sportsbookBetToSportsbookSettlementHistory,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    ids: (fragment.settlementHistory ?? []).map((history) => {
      recordNormalizer(recordsManager, history, null);

      return history.id;
    }),
  }),
);

export type { TSportsbook_Bet_To_Sportsbook_SettlementHistory_Record };
export { Sportsbook_Bet_To_Sportsbook_SettlementHistory_Normalizer };

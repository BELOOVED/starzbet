import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TSportsbook_Bet_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Bet_Fragment";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { Sportsbook_BetState_Normalizer } from "./Sportsbook_BetState_Normalizer";

type TSportsbook_Bet_To_Sportsbook_BetState_Record = TRecord & {
    ids: string[];
};

type TSportsbook_Bet_To_Sportsbook_BetState_AdditionalData = { id: string; };

const Sportsbook_Bet_To_Sportsbook_BetState_Normalizer = normalizerCreator<
    TSportsbook_Bet_Fragment,
    TSportsbook_Bet_To_Sportsbook_BetState_Record,
    TSportsbook_Bet_To_Sportsbook_BetState_AdditionalData
>(
  ESportsbook_Typename.sportsbookBet,
  ERecordName.sportsbookBetToSportsbookBetState,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    ids: (fragment.betStates ?? []).map((betState) => {
      Sportsbook_BetState_Normalizer(recordsManager, betState, null);

      return betState.id;
    }),
  }),
);

export type { TSportsbook_Bet_To_Sportsbook_BetState_Record };
export { Sportsbook_Bet_To_Sportsbook_BetState_Normalizer };

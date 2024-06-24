import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer, type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_EventPick_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_EventPick_Fragment";
import {
  type TSportsbook_OutrightPick_Fragment,
} from "../../Generated/Services/Sportsbook/Types/TSportsbook_OutrightPick_Fragment";
import { type TSportsbook_BetState_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetState_Fragment";
import { Sportsbook_EventPick_Normalizer } from "./Sportsbook_EventPick_Normalizer";

type TSportsbook_BetState_To_Sportsbook_Pick_Record = TRecord & {
    ids: string[];
};

type TSportsbook_BetState_To_Sportsbook_Pick_AdditionalData = { id: string; };

const isEventPick = (pick: TSportsbook_EventPick_Fragment | TSportsbook_OutrightPick_Fragment): pick is TSportsbook_EventPick_Fragment =>
  pick.__typename === "Sportsbook_EventPick";

const Sportsbook_BetState_To_Sportsbook_Pick_Normalizer = normalizerCreator<
    TSportsbook_BetState_Fragment,
    TSportsbook_BetState_To_Sportsbook_Pick_Record,
    TSportsbook_BetState_To_Sportsbook_Pick_AdditionalData
>(
  ESportsbook_Typename.sportsbookBetState,
  ERecordName.sportsbookBetStateToSportsbookPick,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    ids: (fragment.picks ?? []).map((pick) => {
      const additionalData: TRecordNormalizerAdditionalData = {
        parentTypename: fragment.__typename,
        parentId: fragment.id,
      };

      if(isEventPick(pick)) {
        Sportsbook_EventPick_Normalizer(recordsManager, pick, additionalData);

        return pick.id;
      }

      recordNormalizer(recordsManager, pick, null);

      return pick.id;
    }),
  }),
);

export type { TSportsbook_BetState_To_Sportsbook_Pick_Record };
export { Sportsbook_BetState_To_Sportsbook_Pick_Normalizer };

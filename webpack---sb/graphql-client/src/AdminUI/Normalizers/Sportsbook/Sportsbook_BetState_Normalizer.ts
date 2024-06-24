import { type IMoneyTransaction } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_BetState_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetState_Fragment";
import { Sportsbook_BetState_To_Sportsbook_Pick_Normalizer } from "./Sportsbook_BetState_To_Sportsbook_Pick_Normalizer";

type TSportsbook_BetState_Record = TRecord & {
  contractOrder: number;
  live: boolean;
  betHash: string;
  createdAt: string;
  totalPotentialCoefficient: number;
  totalStake: IMoneyTransaction;
  totalPotentialPayout: IMoneyTransaction;
  playerId: string;
  picksId?: string;
  betContractId?: string;
}

const Sportsbook_BetState_Normalizer = normalizerCreator<TSportsbook_BetState_Fragment, TSportsbook_BetState_Record>(
  ESportsbook_Typename.sportsbookBetState,
  ERecordName.sportsbookBetState,
  (recordsManager, fragment) => {
    const record: TSportsbook_BetState_Record = {
      id: fragment.id,
      contractOrder: fragment.contractOrder,
      live: fragment.live,
      betHash: fragment.betHash,
      createdAt: fragment.createdAt,
      totalPotentialCoefficient: fragment.totalPotentialCoefficient,
      totalStake: fragment.totalStake,
      totalPotentialPayout: fragment.totalPotentialPayout,
      playerId: fragment.playerId,
    };

    if (fragment.player) {
      recordNormalizer(recordsManager, fragment.player, null);
    }

    if (fragment.betContract) {
      recordNormalizer(recordsManager, fragment.betContract, null);
    }

    if (fragment.picks) {
      record.picksId = Sportsbook_BetState_To_Sportsbook_Pick_Normalizer(recordsManager, fragment, { id: fragment.id }).id;
    }

    return record;
  },
);

export type { TSportsbook_BetState_Record };
export { Sportsbook_BetState_Normalizer };

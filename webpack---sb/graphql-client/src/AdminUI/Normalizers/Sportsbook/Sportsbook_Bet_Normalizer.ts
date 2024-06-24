import { type IMoneyTransaction } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type ESportsbook_BetTypeEnum } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_BetTypeEnum";
import { type ESportsbook_BetStatusEnum } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_BetStatusEnum";
import { type TMoneyTransaction_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoneyTransaction_Fragment";
import { type ESportsbook_DeviceEnum } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_DeviceEnum";
import { recordNormalizer, type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_Bet_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Bet_Fragment";
import { type TSportsbook_BetBonus_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetBonus_Fragment";
import {
  type TExternalPlatform_RequestLog_Fragment,
} from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_RequestLog_Fragment";
import { ExternalPlatform_RequestLog_Normalizer } from "../ExternalPlatform/ExternalPlatform_RequestLog_Normalizer";
import { Sportsbook_Bet_To_Sportsbook_Pick_Normalizer } from "./Sportsbook_Bet_To_Sportsbook_Pick_Normalizer";
import { Sportsbook_Bet_To_Sportsbook_BetState_Normalizer } from "./Sportsbook_Bet_To_Sportsbook_BetState_Normalizer";
import {
  Sportsbook_Bet_To_Sportsbook_SettlementHistory_Normalizer,
} from "./Sportsbook_Bet_To_Sportsbook_SettlementHistory_Normalizer";
import { Sportsbook_Bet_To_Sportsbook_CashOutSnap_Normalizer } from "./Sportsbook_Bet_To_Sportsbook_CashOutSnap_Normalizer";

type TSportsbook_Bet_Record = TRecord & {
  createdAt: string;
  hash: string;
  live: boolean;
  betRequestTime: string;
  totalPotentialCoefficient: number;
  type: ESportsbook_BetTypeEnum;
  betStatus: ESportsbook_BetStatusEnum;
  playerHostAddress: string;
  betStateCount: number;
  totalStake: IMoneyTransaction;
  totalPotentialPayout: IMoneyTransaction;
  device: null | ESportsbook_DeviceEnum;
  settledAt: null | string;
  canceledAt: null | string;
  cashOutAt: null | string;
  betBonus: null | TSportsbook_BetBonus_Fragment;
  totalPayout: null | TMoneyTransaction_Fragment;
  platformRequests?: TExternalPlatform_RequestLog_Fragment[];
  playerId: string;
  contractId: string;
  picksId?: string;
  betStatesId?: string;
  betOddsBoostId?: null | string;
  cashOutSnapsId?: string;
  settlementHistoryId?: string;
}

const Sportsbook_Bet_Normalizer = normalizerCreator<TSportsbook_Bet_Fragment, TSportsbook_Bet_Record>(
  ESportsbook_Typename.sportsbookBet,
  ERecordName.sportsbookBet,
  (recordsManager, fragment) => {
    const additionalData: TRecordNormalizerAdditionalData = {
      parentTypename: fragment.__typename,
      parentId: fragment.id,
    };

    const record: TSportsbook_Bet_Record = {
      id: fragment.id,
      createdAt: fragment.createdAt,
      hash: fragment.hash,
      live: fragment.live,
      betRequestTime: fragment.betRequestTime,
      totalPotentialCoefficient: fragment.totalPotentialCoefficient,
      type: fragment.type,
      betStatus: fragment.betStatus,
      playerHostAddress: fragment.playerHostAddress,
      betStateCount: fragment.betStateCount,
      totalStake: fragment.totalStake,
      totalPotentialPayout: fragment.totalPotentialPayout,
      device: fragment.device,
      settledAt: fragment.settledAt,
      canceledAt: fragment.canceledAt,
      cashOutAt: fragment.cashOutAt,
      betBonus: fragment.betBonus,
      totalPayout: fragment.totalPayout,
      playerId: fragment.playerId,
      betOddsBoostId: fragment.betOddsBoostId,
      contractId: fragment.contractId,
    };

    if (fragment.player) {
      recordNormalizer(recordsManager, fragment.player, null);
    }

    if (fragment.contract) {
      recordNormalizer(recordsManager, fragment.contract, null);
    }

    if (fragment.betOddsBoost) {
      recordNormalizer(recordsManager, fragment.betOddsBoost, null);
    }

    if (fragment.picks) {
      record.picksId = Sportsbook_Bet_To_Sportsbook_Pick_Normalizer(recordsManager, fragment, { id: fragment.id }).id;
    }

    if (fragment.betStates) {
      record.betStatesId = Sportsbook_Bet_To_Sportsbook_BetState_Normalizer(recordsManager, fragment, { id: fragment.id }).id;
    }

    if (fragment.settlementHistory) {
      record.settlementHistoryId = Sportsbook_Bet_To_Sportsbook_SettlementHistory_Normalizer(
        recordsManager,
        fragment,
        { id: fragment.id },
      ).id;
    }

    if (fragment.cashOutSnaps) {
      record.cashOutSnapsId = Sportsbook_Bet_To_Sportsbook_CashOutSnap_Normalizer(
        recordsManager,
        fragment,
        { id: fragment.id },
      ).id;
    }

    if (fragment.platformRequests) {
      fragment.platformRequests.forEach(
        (request) => ExternalPlatform_RequestLog_Normalizer(recordsManager, request, additionalData),
      );
    }

    return record;
  },
);

export type { TSportsbook_Bet_Record };
export { Sportsbook_Bet_Normalizer };

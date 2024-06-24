import { EEventStatus } from "@sb/betting-core/EEventStatus";
import { type IMoney } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer, type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { type TMoneyTransaction_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoneyTransaction_Fragment";
import { type ESportsbook_BetStatusEnum } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_BetStatusEnum";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_OutcomeStats_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_OutcomeStats_Fragment";
import { type TSportsbook_EventPickStats_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_EventPickStats_Fragment";
import { type TSportsbook_OutrightPickStats_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_OutrightPickStats_Fragment";

interface ISportsbookBetStats {
  betStatus: ESportsbook_BetStatusEnum;
  settledAt: number | null;
  totalPayout: TMoneyTransaction_Fragment | null;
  totalPotentialPayout: TMoneyTransaction_Fragment;
  totalStake: TMoneyTransaction_Fragment;
  live: boolean;
}

type TSportsbook_OutcomeStats_Record = TRecord & {
  liveProfitLoss: IMoney;
  preLiveProfitLoss: IMoney;
  betStatsList: ISportsbookBetStats[];
}

type TSportsbookPickStats = TSportsbook_EventPickStats_Fragment | TSportsbook_OutrightPickStats_Fragment;

const isEventStatsPick = (pickStats: TSportsbookPickStats): pickStats is TSportsbook_EventPickStats_Fragment =>
  pickStats.__typename === "Sportsbook_EventPickStats";

const createOutcomeStatsId = (outcomeId: string) => `outcomeStats_${outcomeId}`;

const Sportsbook_OutcomeStats_Normalizer = normalizerCreator<TSportsbook_OutcomeStats_Fragment,
  TSportsbook_OutcomeStats_Record,
  TRecordNormalizerAdditionalData>(
    ESportsbook_Typename.sportsbookOutcomeStats,
    ERecordName.sportsbookOutcomeStats,
    (recordsManager, fragment, additionalData) => {
      fragment.betStatsList.forEach((betStatsFragment) => {
        betStatsFragment.picks.forEach(
          (pick) =>
            recordNormalizer(recordsManager, pick, null),
        );
      });

      const betStatsList = fragment.betStatsList.map((betStatsFragment) => {
        const live = betStatsFragment.picks.some(
          (pickStatsFragment) =>
            isEventStatsPick(pickStatsFragment) && pickStatsFragment.eventStatus !== EEventStatus.not_started,
        );

        const settledAt = betStatsFragment.settledAt
          ? Number.parseInt(betStatsFragment.settledAt)
          : null;

        return {
          betStatus: betStatsFragment.betStatus,
          settledAt,
          totalPayout: betStatsFragment.totalPayout,
          totalPotentialPayout: betStatsFragment.totalPotentialPayout,
          totalStake: betStatsFragment.totalStake,
          live,
        };
      });

      return {
        id: createOutcomeStatsId(additionalData.parentId),
        liveProfitLoss: fragment.liveProfitLoss,
        preLiveProfitLoss: fragment.preLiveProfitLoss,
        betStatsList,
      };
    },
  );

export type { TSportsbook_OutcomeStats_Record };
export { Sportsbook_OutcomeStats_Normalizer };

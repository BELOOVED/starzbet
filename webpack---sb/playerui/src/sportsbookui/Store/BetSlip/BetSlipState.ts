// @ts-nocheck
import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";
import { betSlipTabEnum, type TBetSlipTab } from "./Model/BetSlipTab";
import { EBetGroup } from "./Model/BetGroup";
import { type BasePick, type VirtualGamePick } from "./Model/BetPick";
import { type TBetSlipBet } from "./Model/TBetSlip";

const minimize = getLocalStorage(localStorageKeys.betSlipMinimize);

/**
 * todo types
 */
interface IBetSlipState {
  tab: TBetSlipTab;
  group: EBetGroup;
  changed: any;
  picks: (BasePick | VirtualGamePick)[];
  // {"1/1": {"ead294a8-cf0e-11e9-bb65-2a2ae2dbcce4->normal_time--0->score_1x2--nil->outcome::p1" : {money, input, applyBoost}}}
  bets: Record<string, Record<string, TBetSlipBet>>;
  betsPerGroup: Record<string, Record<string, TBetSlipBet> | TBetSlipBet>;
  multipleSingle: any;
  useFreeBetCheckedMap: Record<string, boolean>; // Record<outcomeId, boolean>
  useFreeBetForParlayChecked: boolean;
  useBonusBalanceCheckedMap: Record<string, boolean>; // Record<outcomeId, boolean>
  useBonusBalanceForParlayChecked: boolean;
  error: any;
  limit: any;
  systemHash: any;
  placing: boolean;
  complete: boolean;
  visible: any;
  changeAmount: number;
  minimize: any;
  position: any;
  raceCastPick: any;
  virtualGame: any;
  repeatPick: any;
  promotionBonusId: string | null;
}

interface IWithBetSlipState {
  betSlip: IBetSlipState;
}

const betSlipState: IWithBetSlipState = {
  betSlip: {
    tab: betSlipTabEnum.betConstructor,
    group: EBetGroup.single,
    changed: false,
    picks: [],
    bets: {},
    betsPerGroup: {},
    multipleSingle: {
      stake: {
        money: null,
        input: null,
      },
    },
    useFreeBetCheckedMap: {},
    useFreeBetForParlayChecked: false,
    useBonusBalanceCheckedMap: {},
    useBonusBalanceForParlayChecked: false,
    error: null,
    limit: null,
    systemHash: void 0,
    placing: false,
    complete: false,
    visible: false,
    changeAmount: getLocalStorage(localStorageKeys.betChangeAmount) || 5,
    minimize: minimize === null
      ? true
      : minimize,
    position: getLocalStorage(localStorageKeys.betSlipPos) || {
      x: null,
      y: null,
    },
    raceCastPick: {},
    virtualGame: {},
    repeatPick: 1,
    promotionBonusId: null,
  },
};

export type { IBetSlipState, IWithBetSlipState };

export { betSlipState };

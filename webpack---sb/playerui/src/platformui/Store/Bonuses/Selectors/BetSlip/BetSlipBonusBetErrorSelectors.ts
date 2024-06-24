import { createMemoSelector, type IMoney } from "@sb/utils";
import { type TTFuncParameters } from "@sb/translator";
import { EBonusProductEnum, ESportsbook_BetTypeEnum } from "@sb/graphql-client";
import {
  sportsbookui_betSlip_error_doesNotMeetTheConditionsOfTheBonus,
  sportsbookui_betSlip_error_forbiddenUseBonusBalanceForOutright,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { type TMixAppState } from "../../../../../sportsbookui/Store/CreateMixInitialState";
import {
  betGroupSelector,
  betSlipIsUseBonusBalanceCheckedSelector,
  betSlipUseBonusBalanceForParlayCheckedSelector,
  hasVirtualGamePickSelector,
  moneyBetByGroupSelector,
  notDisabledSingleBetsSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";
import {
  notOutrightOutcomeSelector,
  pickByOutcomeIdSelector,
} from "../../../../../sportsbookui/Store/Feed/Selectors/FeedSelectors";
import { EBetGroup } from "../../../../../sportsbookui/Store/BetSlip/Model/BetGroup";
import {
  validPicksViewSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/ViewSelectors/ValidPicksViewSelector";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { wagerMatchRuleForParlayForEvery, wagerMatchRuleForSingle } from "../../Utils/BonusMatchers";
import { getAvailableBonusBetAmount, getErrorForRange } from "../../Utils/BetSlipBonusUtils";
import { isSportsbookCriteria } from "../../Utils/BonusTypeGuards";
import { platformBonusesSelector } from "../BonusesSelectors";
import { betSlipTotalParlayErrorSelector } from "./BetSlipTotalParlayErrorSelector";
import { activeBonusWithWageringNullableSelector, activeBonusWithWageringSelector } from "./SelectorsNeededToSplit";

const doesNotMeetTheConditionsOfTheBonusError: TTFuncParameters = [
  sportsbookui_betSlip_error_doesNotMeetTheConditionsOfTheBonus,
];

const outrightError: TTFuncParameters = [sportsbookui_betSlip_error_forbiddenUseBonusBalanceForOutright];

const bonusBetAmountPossibleRangeSelector = createMemoSelector(
  [
    activeBonusWithWageringSelector,
    playerCurrencySelector,
  ],
  getAvailableBonusBetAmount,
);

const betSlipBonusErrorForSinglePickSelector = (state: TMixAppState, outcomeId: string, stake: IMoney): TTFuncParameters | undefined => {
  const checked = betSlipIsUseBonusBalanceCheckedSelector(state, outcomeId);

  if (!checked) {
    return void 0;
  }

  const notOutrightOutcome = notOutrightOutcomeSelector(state, outcomeId);

  if (!notOutrightOutcome) {
    return outrightError;
  }

  const activeBonusWithWagering = activeBonusWithWageringNullableSelector(state);

  if (!activeBonusWithWagering) {
    return void 0;
    // todo^EI once per week someone reproduce it, investigate (matador, bahis, onwin)
    // throw new Error("[betSlipBonusErrorForSinglePickSelector] activeBonusWithWagering should exist if 'betSlipIsUseBonusBalanceChecked' is true");
  }

  const pick = pickByOutcomeIdSelector(state, outcomeId, ESportsbook_BetTypeEnum.single);

  const pickMatched = wagerMatchRuleForSingle(activeBonusWithWagering, pick);

  if (!pickMatched) {
    return doesNotMeetTheConditionsOfTheBonusError;
  }

  const range = bonusBetAmountPossibleRangeSelector(state);

  if (range) {
    return getErrorForRange(stake, range[0], range[1]);
  }

  return void 0;
};

const betSlipBonusErrorForParlayPickSelector = (state: TMixAppState, outcomeId: string): TTFuncParameters | undefined => {
  const checked = betSlipUseBonusBalanceForParlayCheckedSelector(state);

  if (!checked) {
    return void 0;
  }

  const notOutrightOutcome = notOutrightOutcomeSelector(state, outcomeId);

  if (!notOutrightOutcome) {
    return outrightError;
  }

  const activeBonusWithWagering = activeBonusWithWageringNullableSelector(state);

  if (!activeBonusWithWagering) {
    throw new Error("[betSlipBonusErrorForParlayPickSelector] activeBonusWithWagering should exist if 'betSlipUseBonusBalanceForParlayChecked' is true");
  }

  const pick = pickByOutcomeIdSelector(state, outcomeId, ESportsbook_BetTypeEnum.parlay);

  const forEveryMatch = wagerMatchRuleForParlayForEvery(activeBonusWithWagering, pick);

  if (!forEveryMatch) {
    return doesNotMeetTheConditionsOfTheBonusError;
  }

  return void 0;
};

const betSlipBonusErrorForParlayTotalSelector = (state: TMixAppState): TTFuncParameters | undefined => {
  const checked = betSlipUseBonusBalanceForParlayCheckedSelector(state);

  if (!checked) {
    return void 0;
  }

  const activeBonusWithWagering = activeBonusWithWageringNullableSelector(state);

  if (!activeBonusWithWagering) {
    throw new Error("[betSlipBonusErrorForParlaySelector] activeBonusWithWagering should exist if 'betSlipUseBonusBalanceForParlayChecked' is true");
  }

  const sportCriteria = activeBonusWithWagering.bonusWagering?.productRules.find(
    ({ product }) => product === EBonusProductEnum.sports,
  )?.criteria;

  if (!sportCriteria || !isSportsbookCriteria(sportCriteria)) {
    throw new Error("[betSlipBonusErrorForParlaySelector] sportCriteria should exists");
  }

  const totalParlayError = betSlipTotalParlayErrorSelector(state, sportCriteria, doesNotMeetTheConditionsOfTheBonusError);

  if (totalParlayError) {
    return totalParlayError;
  }

  const range = bonusBetAmountPossibleRangeSelector(state);

  if (range) {
    const stake = moneyBetByGroupSelector(EBetGroup.multi)(state);

    const rangeError = getErrorForRange(stake, range[0], range[1]);

    if (rangeError) {
      return rangeError;
    }
  }

  return void 0;
};

/**
 * used for disable 'place bet' button
 * should handle all bonus errors on opened ('single' or 'multi') betConstructor tab
 * when bonus with wagering active
 */
const haveIncorrectPickRelatedToBonusSelector = (state: TMixAppState): boolean => {
  if (!platformBonusesSelector(state)) {
    return false;
  }

  const activeBonusWithWagering = activeBonusWithWageringNullableSelector(state);

  if (!activeBonusWithWagering) {
    return false;
  }

  const hasVirtualGamePick = hasVirtualGamePickSelector(state);

  if (hasVirtualGamePick) {
    return false;
  }

  const group = betGroupSelector(state);

  if (group === EBetGroup.single) {
    const notDisabledSingleBets = notDisabledSingleBetsSelector(state);

    return !!notDisabledSingleBets.find(
      ([outcomeId, stake]) => betSlipBonusErrorForSinglePickSelector(state, outcomeId, stake.money),
    );
  }

  if (group === EBetGroup.multi) {
    const checked = betSlipUseBonusBalanceForParlayCheckedSelector(state);

    if (!checked) {
      return false;
    }

    const picks = validPicksViewSelector(state) as { outcomeId: string; }[];

    const singleParlayPickWithError = picks.find(({ outcomeId }) => betSlipBonusErrorForParlayPickSelector(state, outcomeId));

    if (singleParlayPickWithError) {
      return true;
    }

    const totalParlayError = betSlipBonusErrorForParlayTotalSelector(state);

    if (totalParlayError) {
      return true;
    }

    return false;
  }

  return false;
};

export {
  bonusBetAmountPossibleRangeSelector,

  betSlipBonusErrorForSinglePickSelector,
  betSlipBonusErrorForParlayPickSelector,
  betSlipBonusErrorForParlayTotalSelector,

  haveIncorrectPickRelatedToBonusSelector,
};

import { createMemoSelector, type IMoney, isNotNil } from "@sb/utils";
import {
  sportsbookui_betSlip_error_doesNotMeetTheConditionsOfTheFreeBet,
  sportsbookui_betSlip_error_forbiddenUseBonusBalanceForOutright,
  sportsbookui_betSlip_error_maximumFreeBetsYouCanPlace,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { EBonusProductEnum, ESportsbook_BetTypeEnum } from "@sb/graphql-client";
import { type TTFuncParameters } from "@sb/translator";
import { type TMixAppState } from "../../../../../sportsbookui/Store/CreateMixInitialState";
import {
  betGroupSelector,
  betSlipIsFreeBetParlayCheckedSelector,
  betSlipIsUseFreeBetCheckedSelector,
  betSlipUseFreeBetsNotDisabledCheckedCountSelector,
  moneyBetByGroupSelector,
  notDisabledSingleBetsSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";
import { EBetGroup } from "../../../../../sportsbookui/Store/BetSlip/Model/BetGroup";
import {
  validPicksViewSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/ViewSelectors/ValidPicksViewSelector";
import {
  notOutrightOutcomeSelector,
  pickByOutcomeIdSelector,
} from "../../../../../sportsbookui/Store/Feed/Selectors/FeedSelectors";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { freeBetPickRuleForParlayForEvery, freeBetPickRuleForSingle } from "../../Utils/BonusMatchers";
import {
  getAvailableFreeBetAmount,
  getAvailableFreeBetCountWhenExceedLimit,
  getErrorForRange,
} from "../../Utils/BetSlipBonusUtils";
import { isFreeBetBonusSize, isSportsbookCriteria } from "../../Utils/BonusTypeGuards";
import { platformBonusesSelector, platformIsFreeBetPossibleSelector } from "../BonusesSelectors";
import { activeFreeBetBonusNullableSelector, activeFreeBetBonusSelector } from "./SelectorsNeededToSplit";
import { betSlipTotalParlayErrorSelector } from "./BetSlipTotalParlayErrorSelector";

const doesNotMeetTheConditionsOfTheFreeBetError: TTFuncParameters = [
  sportsbookui_betSlip_error_doesNotMeetTheConditionsOfTheFreeBet,
];

const outrightError: TTFuncParameters = [sportsbookui_betSlip_error_forbiddenUseBonusBalanceForOutright];

const availableFreeBetAmountSelector = createMemoSelector(
  [
    activeFreeBetBonusSelector,
    playerCurrencySelector,
  ],
  getAvailableFreeBetAmount,
);

const betSlipFreeBetErrorForSinglePickSelector = (state: TMixAppState, outcomeId: string, stake: IMoney): TTFuncParameters | undefined => {
  const checked = betSlipIsUseFreeBetCheckedSelector(state, outcomeId);

  if (!checked) {
    return void 0;
  }

  const notOutrightOutcome = notOutrightOutcomeSelector(state, outcomeId);

  if (!notOutrightOutcome) {
    return outrightError;
  }

  const activeFreeBetBonus = activeFreeBetBonusNullableSelector(state);

  if (!activeFreeBetBonus) {
    return void 0;
    // todo^EI once per week someone reproduce it, investigate (matador, bahis, onwin)
    // throw new Error("[betSlipFreeBetErrorForSinglePickSelector] activeFreeBetBonus should exist if 'betSlipIsUseFreeBetChecked' is true");
  }

  const pick = pickByOutcomeIdSelector(state, outcomeId, ESportsbook_BetTypeEnum.single);

  const pickMatched = freeBetPickRuleForSingle(activeFreeBetBonus, pick);

  if (!pickMatched) {
    return doesNotMeetTheConditionsOfTheFreeBetError;
  }

  const range = availableFreeBetAmountSelector(state);

  if (range) {
    return getErrorForRange(stake, range[0], range[1]);
  }

  return void 0;
};

const betSlipFreeBetErrorForSingleTotalSelector = (state: TMixAppState): TTFuncParameters | undefined => {
  const notDisabledCheckedCount = betSlipUseFreeBetsNotDisabledCheckedCountSelector(state);

  if (!notDisabledCheckedCount) {
    return void 0;
  }

  const activeFreeBetBonus = activeFreeBetBonusNullableSelector(state);

  if (!activeFreeBetBonus) {
    return void 0;
    // todo^EI once per week someone reproduce it, investigate (matador, bahis, onwin)
    // throw new Error("[betSlipFreeBetErrorForSingleTotalSelector] activeFreeBetBonus should exist if 'betSlipIsUseFreeBetAnyPickChecked' is true");
  }

  const availableFreeBetCount = getAvailableFreeBetCountWhenExceedLimit(activeFreeBetBonus, notDisabledCheckedCount);

  if (isNotNil(availableFreeBetCount)) {
    return [sportsbookui_betSlip_error_maximumFreeBetsYouCanPlace, { count: availableFreeBetCount }];
  }

  return void 0;
};

const betSlipFreeBetErrorForParlayPickSelector = (state: TMixAppState, outcomeId: string): TTFuncParameters | undefined => {
  const freeBetForParlayChecked = betSlipIsFreeBetParlayCheckedSelector(state);

  if (!freeBetForParlayChecked) {
    return void 0;
  }

  const notOutrightOutcome = notOutrightOutcomeSelector(state, outcomeId);

  if (!notOutrightOutcome) {
    return outrightError;
  }

  const activeFreeBetBonus = activeFreeBetBonusNullableSelector(state);

  if (!activeFreeBetBonus) {
    return void 0;
    // todo^EI once per week someone reproduce it, investigate (matador, bahis, onwin)
    // throw new Error("[betSlipFreeBetErrorForParlayPickSelector] activeFreeBetBonus should exist if 'betSlipIsFreeBetParlayChecked' is true");
  }

  const pick = pickByOutcomeIdSelector(state, outcomeId, ESportsbook_BetTypeEnum.parlay);

  const forEveryMatch = freeBetPickRuleForParlayForEvery(activeFreeBetBonus, pick);

  if (!forEveryMatch) {
    return doesNotMeetTheConditionsOfTheFreeBetError;
  }

  return void 0;
};

const betSlipFreeBetErrorForParlayTotalSelector = (state: TMixAppState): TTFuncParameters | undefined => {
  const freeBetForParlayChecked = betSlipIsFreeBetParlayCheckedSelector(state);

  if (!freeBetForParlayChecked) {
    return void 0;
  }

  const activeFreeBetBonus = activeFreeBetBonusNullableSelector(state);

  if (!activeFreeBetBonus) {
    return void 0;
    // todo^EI once per week someone reproduce it, investigate (matador, bahis, onwin)
    // throw new Error("[betSlipFreeBetErrorForParlayTotalSelector] activeFreeBetBonus should exist if 'betSlipIsFreeBetParlayChecked' is true");
  }

  const bonusSize = activeFreeBetBonus.bonusBonusSize;

  if (!isFreeBetBonusSize(bonusSize)) {
    throw new Error("[betSlipFreeBetErrorForParlayTotalSelector] bonusSize should be Platform_BonusFreeBetSize type");
  }

  const sportCriteria = bonusSize.rule.productRules.find(
    ({ product }) => product === EBonusProductEnum.sports,
  )?.criteria;

  if (!sportCriteria || !isSportsbookCriteria(sportCriteria)) {
    throw new Error("[betSlipFreeBetErrorForParlayTotalSelector] sportCriteria should exists");
  }

  const totalParlayError = betSlipTotalParlayErrorSelector(state, sportCriteria, doesNotMeetTheConditionsOfTheFreeBetError);

  if (totalParlayError) {
    return totalParlayError;
  }

  const range = availableFreeBetAmountSelector(state);

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
 * when freeBet bonus active
 */
const haveIncorrectPickRelatedToFreeBetSelector = (state: TMixAppState) => {
  if (!platformBonusesSelector(state)) {
    return false;
  }

  const isFreeBetPossible = platformIsFreeBetPossibleSelector(state);

  if (!isFreeBetPossible) {
    return false;
  }

  const group = betGroupSelector(state);

  if (group === EBetGroup.single) {
    const totalError = betSlipFreeBetErrorForSingleTotalSelector(state);

    if (totalError) {
      return true;
    }

    const notDisabledSingleBets = notDisabledSingleBetsSelector(state);

    return !!notDisabledSingleBets.find(
      ([outcomeId, stake]) => betSlipFreeBetErrorForSinglePickSelector(state, outcomeId, stake.money),
    );
  }

  if (group === EBetGroup.multi) {
    const checked = betSlipIsFreeBetParlayCheckedSelector(state);

    if (!checked) {
      return false;
    }

    const picks = validPicksViewSelector(state) as {
      outcomeId: string;
    }[];

    const singleParlayPickWithError = picks.find(({ outcomeId }) => betSlipFreeBetErrorForParlayPickSelector(state, outcomeId));

    if (singleParlayPickWithError) {
      return true;
    }

    const totalParlayError = betSlipFreeBetErrorForParlayTotalSelector(state);

    if (totalParlayError) {
      return true;
    }

    return false;
  }

  return false;
};

export {
  availableFreeBetAmountSelector,

  betSlipFreeBetErrorForSinglePickSelector,
  betSlipFreeBetErrorForParlayPickSelector,
  betSlipFreeBetErrorForSingleTotalSelector,
  betSlipFreeBetErrorForParlayTotalSelector,

  haveIncorrectPickRelatedToFreeBetSelector,
};

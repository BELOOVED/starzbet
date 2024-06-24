// @ts-nocheck
import { createSelector } from "reselect";
import { EMarketType } from "@sb/betting-core/MarketType";
import { permutateWithoutRepetitions } from "@sb/betting-core/Combinatorics";
import { createSimpleSelector } from "@sb/utils";
import { sortBy } from "../../../Utils/SortBy";
import { marketTypeByIdSelector, outcomeIdListByMarketIdSelector, outcomesSelector } from "../../Feed/Selectors/FeedSelectors";

const betSlipRaceCastPickSelector = ({ betSlip: { raceCastPick } }) => raceCastPick;

const betSlipRaceCastPickByMarketIdSelector = (state, marketId) => betSlipRaceCastPickSelector(state)[marketId];

const findOutcomeSpecifiedOrder = (outcomeIdList, outcomes, raceCast, marketType) => {
  const outcome = sortBy((spot) => spot, Object.keys(raceCast)).map((spot) => raceCast[spot]);

  if (outcome.length !== racingCastOutcomeLengthByMarketType[marketType]) {
    return null;
  }

  const castList = outcome.join(",");

  return outcomeIdList.find((it) => outcomes[it].parameters.outcome === castList);
};

const findOutcomeAnyOrder = (outcomeIdList, outcomes, raceCast, marketType) => {
  if (raceCast.length !== racingCastOutcomeLengthByMarketType[marketType]) {
    return null;
  }

  const castList = permutateWithoutRepetitions(raceCast).map((it) => it.join(","));

  return outcomeIdList.find((it) => castList.some((outcome) => outcomes[it].parameters.outcome === outcome));
};

const outcomeByMarketIdThroughCastMap = {
  [EMarketType.place_number_race_forecast]: findOutcomeSpecifiedOrder,
  [EMarketType.place_number_race_tricast]: findOutcomeSpecifiedOrder,
  [EMarketType.place_number_race_reverse_forecast]: findOutcomeAnyOrder,
  [EMarketType.place_number_race_reverse_tricast]: findOutcomeAnyOrder,
  [EMarketType.place_number_race_swinger]: findOutcomeAnyOrder,
};

const racingCastOutcomeLengthByMarketType = {
  [EMarketType.place_number_race_forecast]: 2,
  [EMarketType.place_number_race_tricast]: 3,
  [EMarketType.place_number_race_reverse_forecast]: 2,
  [EMarketType.place_number_race_reverse_tricast]: 3,
  [EMarketType.place_number_race_swinger]: 2,
};

const outcomeByMarketIdThroughCastSelector = createSimpleSelector(
  [
    marketTypeByIdSelector,
    outcomeIdListByMarketIdSelector,
    outcomesSelector,
    betSlipRaceCastPickByMarketIdSelector,
  ],
  (marketType, outcomeIdList, outcomes, raceCast) =>
    (outcomeByMarketIdThroughCastMap[marketType] ?? findOutcomeSpecifiedOrder)(outcomeIdList, outcomes, raceCast, marketType),
);

const virtualGameSelector = ({ betSlip: { virtualGame } }) => virtualGame;

const virtualGameBySportSelector = (sportId) => ({ betSlip: { virtualGame } }) => virtualGame?.[sportId];
const virtualGameActiveField = (sportId, key) => ({ betSlip: { virtualGame } }) => virtualGame?.[sportId]?.includes(key);

const virtualGameCountKeySelector = (sportId, key) => createSelector(
  virtualGameBySportSelector(sportId),
  (pick) => pick?.filter((it) => it === key).length,
);

const virtualRepeatPickSelector = ({ betSlip: { repeatPick } }) => repeatPick;

export {
  outcomeByMarketIdThroughCastSelector,
  betSlipRaceCastPickByMarketIdSelector,
  virtualGameSelector,
  virtualGameBySportSelector,
  virtualGameCountKeySelector,
  virtualGameActiveField,
  betSlipRaceCastPickSelector,
  virtualRepeatPickSelector,
};

import isEmpty from "lodash/fp/isEmpty";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { createSimpleSelector, isNotNil, isNotVoid, useParamSelector } from "@sb/utils";
import {
  betSlipRaceCastPickByMarketIdSelector,
  betSlipRaceCastPickSelector,
  outcomeByMarketIdThroughCastSelector,
} from "../../BetSlip/Selectors/VirtualSelectors";
import { virtualCastPlaceCountMap } from "../../Virtual/Common/Model/VirtualRacingSport";
import { type TAppState } from "../../InitialState";
import { betSlipRacingAddBetSlip, betSlipRemovePlaceAction } from "../../BetSlip/BetSlipActions";
import { marketTypeByIdSelector } from "../Selectors/FeedSelectors";
import { raceWinnerMarketIdGroupByEventIdSelector } from "./UseMarketIdGroupByEventIdSelector";

const raceCastActiveSpotSelector = createSimpleSelector(
  [
    betSlipRaceCastPickByMarketIdSelector,
    (_, __, spot) => spot,
    (_, __, ___, shortId) => shortId,
  ],
  (raceCastPick, spot, shortId) => raceCastPick && Object.entries(raceCastPick)
    .some(([placedSpot, placedShortId]) => Number(placedSpot) === spot && placedShortId === shortId),
);

const useRaceCastActiveSpotSelector = (marketId: string, spot: number, shortId: string) => useParamSelector(
  raceCastActiveSpotSelector,
  [marketId, spot, shortId],
);

const raceCastAnyActiveSpotSelector = createSimpleSelector(
  [
    betSlipRaceCastPickByMarketIdSelector,
    (_, __, shortId) => shortId,
  ],
  (raceCastPick, shortId) => raceCastPick && raceCastPick.includes(shortId),
);

const useRaceCastAnyActiveSpotSelector = (marketId: string, shortId: string) => useParamSelector(
  raceCastAnyActiveSpotSelector,
  [marketId, shortId],
);

const raceCastAnyDisableSpotSelector = createSimpleSelector(
  [
    betSlipRaceCastPickByMarketIdSelector,
    marketTypeByIdSelector,
    (_, __, shortId) => shortId,
  ],
  (raceCastPick, marketType, shortId) => {
    const marketGroup = marketTypeToMarketGroupMap[marketType];

    const count = virtualCastPlaceCountMap[marketGroup] || -1;

    return raceCastPick && (raceCastPick.includes(shortId) || raceCastPick.length === count);
  },
);

const useRaceCastAnyDisableSpotSelector = (marketId: string, shortId: string) => useParamSelector(
  raceCastAnyDisableSpotSelector,
  [marketId, shortId],
);

const raceCastDisableSpotSelector = createSimpleSelector(
  [
    betSlipRaceCastPickByMarketIdSelector,
    (_, __, spot) => spot,
    (_, __, ___, shortId) => shortId,
  ],
  (raceCastPick, spot, shortId) =>
    raceCastPick && Object.entries(raceCastPick)
      .some(([placedSpot, placedShortId]) => Number(placedSpot) === spot || placedShortId === shortId),
);

const useRaceCastDisableSpotSelector = (marketId: string, spot: number, shortId: string) => useParamSelector(
  raceCastDisableSpotSelector,
  [marketId, spot, shortId],
);

const raceCastClearDisableButtonSelector = createSimpleSelector(
  [
    raceWinnerMarketIdGroupByEventIdSelector,
    betSlipRaceCastPickSelector,
  ],
  (marketIds, raceCast) => !marketIds.some((marketId) => raceCast[marketId] && !isEmpty(raceCast[marketId])),
);

const raceCastAddDisableButtonSelector = (state: TAppState, eventId: string) => {
  const marketIds = raceWinnerMarketIdGroupByEventIdSelector(state, eventId);
  const raceCast = betSlipRaceCastPickSelector(state);

  return !marketIds
    .some(
      (marketId) =>
        isNotVoid(raceCast[marketId]) &&
        isNotNil(outcomeByMarketIdThroughCastSelector(state, marketId)),
    );
};

const useRaceCastButtonHandler = (eventId: string) => {
  const dispatch = useDispatch();

  const disableClear = useParamSelector(raceCastClearDisableButtonSelector, [eventId]);
  const disableAdd = useParamSelector(raceCastAddDisableButtonSelector, [eventId]);

  const removeHandle = useCallback(
    () => {
      if (disableClear) {
        return;
      }
      dispatch(betSlipRemovePlaceAction(eventId));
    },
    [disableClear],
  );

  const addHandle = useCallback(
    () => {
      if (disableAdd) {
        return;
      }
      dispatch(betSlipRacingAddBetSlip(eventId));
    },
    [disableAdd],
  );

  return {
    disableClear,
    disableAdd,
    removeHandle,
    addHandle,
  };
};

export {
  useRaceCastActiveSpotSelector,
  useRaceCastDisableSpotSelector,
  useRaceCastButtonHandler,
  useRaceCastAnyActiveSpotSelector,
  useRaceCastAnyDisableSpotSelector,
};

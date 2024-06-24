// @ts-nocheck
import set from "lodash/fp/set";
import omit from "lodash/fp/omit";
import { marketIdListByEventIdSelector } from "../../Feed/Selectors/FeedSelectors";

const betSlipCastPickReducer = (
  state,
  {
    payload: {
      marketId,
      shortId,
      spot,
    },
  },
) => {
  const cast = state.betSlip.raceCastPick[marketId] ?? {};

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      raceCastPick: {
        ...state.betSlip.raceCastPick,
        [marketId]: cast[spot] ? omit([spot], cast) : set(spot, shortId, cast),
      },
    },
  };
};

const betSlipCastAnyPickReducer = (
  state,
  {
    payload: {
      marketId,
      shortId,
    },
  },
) => {
  const cast = state.betSlip.raceCastPick[marketId] ?? [];
  const newCast = cast.includes(shortId) ? cast.filter((it) => it !== shortId) : [...cast, shortId];

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      raceCastPick: {
        ...state.betSlip.raceCastPick,
        [marketId]: newCast,
      },
    },
  };
};

const betSlipCastRemoveReducer = (state, { payload: { eventId } }) => {
  const marketIds = marketIdListByEventIdSelector(state, eventId);

  const raceCastPick = { ...state.betSlip.raceCastPick };

  marketIds.forEach((marketId) => {
    if (raceCastPick[marketId]) {
      delete raceCastPick[marketId];
    }
  });

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      raceCastPick,
    },
  };
};

export { betSlipCastPickReducer, betSlipCastRemoveReducer, betSlipCastAnyPickReducer };

// @ts-nocheck
import { betSlipPicksSelector } from "../Selectors/BetSlipPicksSelectors";

const toggleBanker = (outcomeId, picks) => (
  picks.map(((pick) => {
    if (pick.is(outcomeId)) {
      return pick.copyWith({ banker: !pick.banker });
    }

    return pick;
  }))
);

const betSlipToggleBankerReducer = (state, { payload: { outcomeId } }) => {
  const picks = toggleBanker(outcomeId, betSlipPicksSelector(state));

  return ({
    ...state,
    betSlip: {
      ...state.betSlip,
      picks,
    },
  });
};

export { betSlipToggleBankerReducer };

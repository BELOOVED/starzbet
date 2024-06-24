// @ts-nocheck
const betSlipDisablePickReducer = (state, { payload: { outcomeId, disable } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    picks: state.betSlip.picks.map((pick) => {
      if (pick.is(outcomeId)) {
        return pick.copyWith({ disable });
      }

      return pick;
    }),
  },
});

export { betSlipDisablePickReducer };

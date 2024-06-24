// @ts-nocheck
const betSlipCancelPlaceBetReducer = (state) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    placing: false,
    error: null,
  },
});

export { betSlipCancelPlaceBetReducer };

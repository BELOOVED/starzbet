// @ts-nocheck
const betSlipFinishCompleteReducer = (state) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    complete: false,
  },
});

export { betSlipFinishCompleteReducer };

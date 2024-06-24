// @ts-nocheck
const betSlipChangeDefaultAmountReducer = (state, { payload: { changeAmount } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    changeAmount,
  },
});

export { betSlipChangeDefaultAmountReducer };

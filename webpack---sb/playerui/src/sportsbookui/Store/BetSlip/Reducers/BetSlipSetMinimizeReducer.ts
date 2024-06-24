// @ts-nocheck

const betSlipSetMinimizeReducer = (state, { payload: { minimize } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    minimize,
  },
});

export { betSlipSetMinimizeReducer };

// @ts-nocheck
const betSlipSetPositionReducer = (state, { payload: { x, y } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    position: { x, y },
  },
});

export { betSlipSetPositionReducer };

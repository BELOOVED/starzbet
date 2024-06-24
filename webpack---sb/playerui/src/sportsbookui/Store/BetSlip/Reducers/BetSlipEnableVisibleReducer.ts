// @ts-nocheck
const betSlipEnableVisibleReducer = (state) => (
  {
    ...state,
    betSlip: {
      ...state.betSlip,
      visible: true,
    },
  }
);

export { betSlipEnableVisibleReducer };

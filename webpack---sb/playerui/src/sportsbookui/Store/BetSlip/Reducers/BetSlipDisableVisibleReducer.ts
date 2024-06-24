// @ts-nocheck
const betSlipDisableVisibleReducer = (state) => (
  {
    ...state,
    betSlip: {
      ...state.betSlip,
      visible: false,
    },
  }
);

export { betSlipDisableVisibleReducer };

// @ts-nocheck
const betSlipStartPlaceBetReducer = (state) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    placing: true,
    complete: false,
    error: null,
    promotionBonusId: null,
  },
});

export { betSlipStartPlaceBetReducer };

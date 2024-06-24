// @ts-nocheck

const betSlipChangeSystemHashReducer = (state, { payload: { systemHash } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    systemHash,
  },
});

export { betSlipChangeSystemHashReducer };

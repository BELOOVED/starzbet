const betSlipChangeRepetitionPickReducer = (
  state,
  {
    payload: {
      repetition,
    },
  },
) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    repeatPick: repetition,
  },
});

export { betSlipChangeRepetitionPickReducer };

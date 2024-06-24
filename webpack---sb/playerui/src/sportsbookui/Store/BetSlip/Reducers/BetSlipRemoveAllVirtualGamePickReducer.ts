// @ts-nocheck
import { virtualGameSelector } from "../Selectors/VirtualSelectors";

const betSlipRemoveAllVirtualGamePickReducer = (state, { payload: { sportId } }) => {
  const virtualGame = virtualGameSelector(state);

  if (virtualGame[sportId]) {
    delete virtualGame[sportId];
  }

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      virtualGame,
    },
  };
};

export { betSlipRemoveAllVirtualGamePickReducer };

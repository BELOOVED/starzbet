// @ts-nocheck

import { betSlipChangeBetHandler } from "./Handlers/BetSlipChangeBetHandler";

const betSlipChangeBetReducer = (
  state,
  {
    payload: {
      hash,
      stake,
      input,
      outcomeId,
    },
  },
) => betSlipChangeBetHandler(hash, stake, input, outcomeId, state);

export { betSlipChangeBetReducer };

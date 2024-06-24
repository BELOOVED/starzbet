// @ts-nocheck
import { betSlipChangeMultipleSingleHandler } from "./Handlers/BetSlipChangeMultipleSingleHandler";

const betSlipChangeMultipleSingleReducer = (state, { payload: { stake, input } }) => (
  betSlipChangeMultipleSingleHandler(stake, input, state)
);

export { betSlipChangeMultipleSingleReducer };

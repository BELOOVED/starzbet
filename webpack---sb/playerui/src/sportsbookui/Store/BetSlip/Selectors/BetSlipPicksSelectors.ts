import { createPropertySelector } from "@sb/utils";
import { type IBetSlipState } from "../BetSlipState";

/**
 * FIXME
 * Circ-deps - copy-paste javascript/packages/playerui/src/sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors.ts
 */
type TWithBetSlip = { betSlip: IBetSlipState; }

const betSlipSelector = (state: TWithBetSlip) => state.betSlip;

const betSlipPicksSelector = createPropertySelector(betSlipSelector, "picks");

export { betSlipPicksSelector };

export type { TWithBetSlip };

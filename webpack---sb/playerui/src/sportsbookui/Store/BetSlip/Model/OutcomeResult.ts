import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";

const isOutcomeWin = (result: EOutcomeResult | string) => [
  EOutcomeResult.win,
  EOutcomeResult.half_win,
].includes(result);

const isOutcomeLoss = (result: EOutcomeResult | string) => [
  EOutcomeResult.loss,
  EOutcomeResult.half_loss,
].includes(result);

export { isOutcomeWin, isOutcomeLoss };

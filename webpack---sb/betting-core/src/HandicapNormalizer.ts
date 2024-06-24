import { TMarketParameters } from "./TMarketParameters";
import { invertHandicapSign } from "@sb/utils";

const maybeAddPlus = (handicap: string) => Number(handicap) > 0
  ? `+${handicap}`
  : handicap;

const handicapNormalizer = (marketParameters: TMarketParameters, outcomeParameters: Record<string, string>) => {
  const handicap = marketParameters.handicap;

  return marketParameters.team === outcomeParameters["outcome"]
    ? maybeAddPlus(handicap)
    : invertHandicapSign(handicap);
};

export { handicapNormalizer };

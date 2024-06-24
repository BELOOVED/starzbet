import { IFlatEventOutcome, IFlatOutrightOutcome, TFlatOutcome } from "./Types";
import { TExplicitAny } from "@sb/utils";

// todo remove usage of other similar types provided inside (outcomeBetOrCurrentByIdSelector)
const isFlatEventOutcome = (outcome: IFlatEventOutcome | IFlatOutrightOutcome | TExplicitAny): outcome is IFlatEventOutcome => {
  return outcome.hasOwnProperty("marketId");
}

const isFlatOutrightOutcome = (outcome: IFlatEventOutcome | IFlatOutrightOutcome | TExplicitAny): outcome is IFlatOutrightOutcome => {
  return outcome.hasOwnProperty("outrightId");
}

function assertFlatEventOutcome(outcome: IFlatEventOutcome | IFlatOutrightOutcome | TExplicitAny): asserts outcome is IFlatEventOutcome {
  if (!isFlatEventOutcome(outcome)) {
    throw new Error("[assertFlatEventOutcome] outcome is not IFlatEventOutcome")
  }
}

function assertFlatOutrightOutcome(outcome: IFlatEventOutcome | IFlatOutrightOutcome | TExplicitAny): asserts outcome is IFlatOutrightOutcome {
  if (!isFlatOutrightOutcome(outcome)) {
    throw new Error("[assertFlatOutrightOutcome] outcome is not IFlatOutrightOutcome")
  }
}

const castToFlatEventOutcome = (outcome: TFlatOutcome) => {
  if (isFlatEventOutcome(outcome)) {
    return outcome;
  }
  
  throw new Error("Can't cast outcome to IFlatEventOutcome");
};

export {
  castToFlatEventOutcome,
  isFlatEventOutcome,
  isFlatOutrightOutcome,
  assertFlatEventOutcome,
  assertFlatOutrightOutcome,
}

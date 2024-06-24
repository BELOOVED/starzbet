// @ts-nocheck
import { createSimpleSelector } from "@sb/utils";
import { betsMyBetsSelector } from "./MyBetsSelectors";

const betHashByIdSelector = createSimpleSelector(
  [
    betsMyBetsSelector,
    (_, id: string) => id,
  ],
  (bets, id) => bets.find((bet) => bet.id === id).hash,
);

export { betHashByIdSelector };

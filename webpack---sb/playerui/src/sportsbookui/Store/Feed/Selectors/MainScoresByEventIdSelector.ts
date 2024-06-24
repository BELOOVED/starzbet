import { createMemoSelector } from "@sb/utils";
import { EScoreType } from "@sb/betting-core/EScoreType";
import { scoresByEventIdSelectorFactory } from "../Hooks/UseScoresByEventIdSelector";

const mainScoresByEventIdSelector = createMemoSelector(
  [scoresByEventIdSelectorFactory],
  (scores) => scores.filter(({ type }) => type === EScoreType.score),
);

export { mainScoresByEventIdSelector };

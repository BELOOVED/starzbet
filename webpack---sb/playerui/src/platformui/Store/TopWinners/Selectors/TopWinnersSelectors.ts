import { createMemoSelector, createPropertySelector, createSimpleSelector, isNotEmpty } from "@sb/utils";
import { twoRowsList } from "../../../Utils/TwoRowsList";
import { type TPlatformAppState } from "../../PlatformInitialState";

const topWinnersSelector = (state: TPlatformAppState) => state.topWinners;
const topWinnersNodesSelector = createPropertySelector(topWinnersSelector, "nodes");

const topWinners2RowsSelector = createMemoSelector(
  [topWinnersNodesSelector],
  twoRowsList,
);

const isTopWinnersNotEmptyDataSelector = createSimpleSelector(
  [topWinnersNodesSelector],
  isNotEmpty,
);

const isTopWinnersServerLoadedSelector = createPropertySelector(
  topWinnersSelector,
  "isServerLoaded",
);

export {
  topWinnersNodesSelector,
  isTopWinnersNotEmptyDataSelector,
  topWinners2RowsSelector,
  isTopWinnersServerLoadedSelector,
};

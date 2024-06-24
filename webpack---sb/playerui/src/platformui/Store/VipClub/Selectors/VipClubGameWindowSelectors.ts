import { createSimpleSelector, isNotNil } from "@sb/utils";
import { vipClubSelectors } from "./VipClubSelectors";

const vipClubGameWindowWidgetVisibleSelector = createSimpleSelector(
  [vipClubSelectors.playerState],
  isNotNil,
);

export { vipClubGameWindowWidgetVisibleSelector };

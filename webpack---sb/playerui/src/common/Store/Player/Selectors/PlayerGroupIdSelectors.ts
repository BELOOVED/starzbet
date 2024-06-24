import { createSimpleSelector, getNotNil, not } from "@sb/utils";
import { playerDetailsSelectors } from "./PlayerSelectors";

const playerGroupIdNotNilSelector = createSimpleSelector(
  [playerDetailsSelectors.groupId],
  (groupId) => getNotNil(groupId, ["playerGroupIdNotNilSelector"], "groupId"),
);

//PrivateGroup
const isPrivateGroupIdSelector = createSimpleSelector(
  [playerDetailsSelectors.groupId],
  (id) => id === "43cbad1e-8dc1-4109-8322-375cff901635",
);

const notPrivateGroupIdSelector = not(isPrivateGroupIdSelector);

export { playerGroupIdNotNilSelector, isPrivateGroupIdSelector, notPrivateGroupIdSelector };


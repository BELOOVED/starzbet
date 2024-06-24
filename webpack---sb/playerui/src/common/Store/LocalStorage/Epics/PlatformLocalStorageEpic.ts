import { createLocalStorageEpic } from "@sb/utils/EpicUtils/CreateLocalStorageEpic";
import { toggleShowBalanceAction } from "../../Player/PlayerActions";
import { platformLocalStorageKeys } from "../PlatformLocalStorageKeys";

const platformLocalStorageEpic = createLocalStorageEpic([
  [toggleShowBalanceAction, ({ payload: { hidden } }) => hidden, platformLocalStorageKeys.hiddenBalance],
]);

export { platformLocalStorageEpic };

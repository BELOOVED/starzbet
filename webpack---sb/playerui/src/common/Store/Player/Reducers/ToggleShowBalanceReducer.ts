import { type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type toggleShowBalanceAction } from "../PlayerActions";

const toggleShowBalanceReducer: TReducer<
  TPlatformAppState,
  typeof toggleShowBalanceAction
> = (state) => assocPath(
  ["player", "hiddenBalance"],
  !state.player.hiddenBalance,
  state,
);

export { toggleShowBalanceReducer };


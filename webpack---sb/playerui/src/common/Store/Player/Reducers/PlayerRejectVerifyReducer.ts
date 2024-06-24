import { type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type playerRejectVerifyAction } from "../PlayerActions";

const playerRejectVerifyReducer: TReducer<
  TPlatformAppState,
  typeof playerRejectVerifyAction
> = (state, { payload: { error } }) => assocPath(
  ["player", "verify"],
  {
    ...state.player.verify,
    start: false,
    error,
  },
  state,
);

export { playerRejectVerifyReducer };

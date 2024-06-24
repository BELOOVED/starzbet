import { type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type playerStartVerifyAction } from "../PlayerActions";

const playerStartVerifyReducer: TReducer<
  TPlatformAppState,
  typeof playerStartVerifyAction
> = (state) => assocPath<TPlatformAppState>(
  ["player", "verify", "start"],
  true,
  state,
);

export { playerStartVerifyReducer };

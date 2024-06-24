import { type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type playerConfirmVerifyAction } from "../PlayerActions";

const playerConfirmVerifyReducer: TReducer<
  TPlatformAppState,
  typeof playerConfirmVerifyAction> = (state) => assocPath(
    ["player", "verify"],
    {
      ...state.player.verify,
      start: false,
      confirm: true,
    },
    state,
  );

export { playerConfirmVerifyReducer };

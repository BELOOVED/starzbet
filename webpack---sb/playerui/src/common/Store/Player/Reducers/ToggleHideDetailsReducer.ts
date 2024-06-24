import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type toggleHideDetailsAction } from "../PlayerActions";

const toggleHideDetailsReducer: TReducer<
  TPlatformAppState,
  typeof toggleHideDetailsAction
> = (state) => ({
  ...state,
  player: {
    ...state.player,
    hiddenDetails: !state.player.hiddenDetails,
  },
});

export { toggleHideDetailsReducer };

import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type removedTokenAction } from "../../../../platformui/Store/Auth/AuthActions";
import { playerInitialState } from "../InitialState/PlayerInitialState";

const resetPlayerReducer: TReducer<
  TPlatformAppState,
  typeof removedTokenAction
> = (state) => ({
  ...state,
  ...playerInitialState,
});

export { resetPlayerReducer };

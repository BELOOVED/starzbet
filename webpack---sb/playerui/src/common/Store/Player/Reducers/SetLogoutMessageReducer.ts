import { type TReducer } from "@sb/utils";
import { type keepAliveExpiredAction } from "@sb/auth";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type hideLogoutMessageAction } from "../PlayerActions";

const setLogoutMessageReducer = (display: boolean): TReducer<
  TPlatformAppState,
  typeof keepAliveExpiredAction | typeof hideLogoutMessageAction
> => (state) => ({
  ...state,
  player: {
    ...state.player,
    logoutMessage: {
      display,
    },
  },
});

export { setLogoutMessageReducer };

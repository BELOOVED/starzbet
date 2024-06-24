import { type TReducer } from "@sb/utils";
import type { TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type twoFactorAuthChangeAction } from "../PlayerActions";

const twoFactorUpdateReducer: TReducer<TPlatformAppState, typeof twoFactorAuthChangeAction> = (state) => ({
  ...state,
  player: {
    ...state.player,
    details: {
      ...state.player.details,
      twoFactorAuthenticationEnabled: !state.player.details.twoFactorAuthenticationEnabled,
    },
  },
});

export { twoFactorUpdateReducer };


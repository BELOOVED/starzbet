import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import {
  type playerReceivedEmailVerificationTokenAction,
} from "../PlayerActions";

const playerReceivedEmailVerificationTokenReducer: TReducer<
  TPlatformAppState,
  typeof playerReceivedEmailVerificationTokenAction
> = (
  state,
  { payload: { player: { verified, emailVerificationToken, emailVerificationTokenId } } },
) => ({
  ...state,
  player: {
    ...state.player,
    details: {
      ...state.player.details,
      verified: Boolean(verified),
      emailVerificationToken,
      emailVerificationTokenId,
    },
  },
});

export { playerReceivedEmailVerificationTokenReducer };

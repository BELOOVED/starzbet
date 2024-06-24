import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type playerReceivedPhoneVerificationTokenAction } from "../PlayerActions";

const playerReceivedPhoneVerificationTokenReducer: TReducer<
  TPlatformAppState,
  typeof playerReceivedPhoneVerificationTokenAction
> = (
  state,
  { payload: { player: { verified, phoneVerificationToken, phoneVerificationTokenId } } },
) => ({
  ...state,
  player: {
    ...state.player,
    details: {
      ...state.player.details,
      verified: Boolean(verified),
      phoneVerificationToken,
      phoneVerificationTokenId,
    },
  },
});

export { playerReceivedPhoneVerificationTokenReducer };

import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type playerWalletReceivedAction } from "../PlayerActions";

const playerWalletReceivedReducer: TReducer<
  TPlatformAppState,
  typeof playerWalletReceivedAction
> = (
  state,
  { payload: { player } },
) => ({
  ...state,
  player: {
    ...state.player,
    details: {
      ...state.player.details,
      id: player.id,
      bonusWallet: player.bonusWallet ?? null,
      wallet: player.wallet ?? null,
      freeBetWallet: player.freeBetWallet ?? null,
    },
  },
});

export { playerWalletReceivedReducer };

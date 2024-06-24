import { platformPlayerWalletQueryOptionalFields } from "@sb/graphql-client/PlayerUI";
import { createCallManagerSymbol } from "@sb/call-manager";
import { playerWalletReceivedAction } from "../../PlayerActions";
import { loadingPlayerFactory } from "./LoadingPlayerFactory";

const PLAYER_REQUEST_WALLET_LOADING_SYMBOL = createCallManagerSymbol("PLAYER_REQUEST_WALLET_LOADING_SYMBOL");

/*BACKGROUND EPIC, DON'T WAIT UNTIL IT'S DONE !!! */
const playerRequestWalletEpic = loadingPlayerFactory(
  PLAYER_REQUEST_WALLET_LOADING_SYMBOL,
  platformPlayerWalletQueryOptionalFields,
  playerWalletReceivedAction,
);

export { playerRequestWalletEpic };

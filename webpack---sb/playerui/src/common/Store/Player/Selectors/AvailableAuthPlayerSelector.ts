import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { hasProfileAndWalletSelector } from "./ProfileSelectors";

const availableAuthPlayerSelector = (state: IWithPlayerState & IWithAuthState) => (
  loggedSelector(state) && hasProfileAndWalletSelector(state)
);

export { availableAuthPlayerSelector };

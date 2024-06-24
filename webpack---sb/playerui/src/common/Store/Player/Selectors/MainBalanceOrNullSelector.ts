import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { hasProfileAndWalletSelector } from "./ProfileSelectors";
import { playerWalletSelectors } from "./WalletSelectors";

const mainBalanceOrNullSelector = (state: IWithPlayerState) => hasProfileAndWalletSelector(state)
  ? playerWalletSelectors.balance(state)
  : null;

export { mainBalanceOrNullSelector };

import { getNotNil, createPropertySelectors, createSimpleSelector, isNotNil } from "@sb/utils";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { playerDetailsSelectors } from "./PlayerSelectors";

const playerWalletSelector = (state: IWithPlayerState) => getNotNil(
  playerDetailsSelectors.wallet(state),
  ["playerWalletSelector"],
  "wallet",
);

const playerWalletSelectors = createPropertySelectors(playerWalletSelector);

const playerWalletIsNotNilSelector = createSimpleSelector([playerDetailsSelectors.wallet], isNotNil);

const playerBonusWalletSelector = (state: IWithPlayerState) => getNotNil(
  playerDetailsSelectors.bonusWallet(state),
  ["playerBonusWalletSelector"],
  "bonusWallet",
);
const bonusWalletSelectors = createPropertySelectors(playerBonusWalletSelector);

const playerBonusWalletIsNotNilSelector = createSimpleSelector([playerDetailsSelectors.bonusWallet], isNotNil);

const playerFreeBetWalletSelector = (state: IWithPlayerState) => getNotNil(
  playerDetailsSelectors.freeBetWallet(state),
  ["playerFreeBetWalletSelector"],
  "freeBetWallet",
);

const freeBetWalletSelectors = createPropertySelectors(playerFreeBetWalletSelector);

const playerFreeBetWalletIsNotNilSelector = createSimpleSelector([playerDetailsSelectors.freeBetWallet], isNotNil);

export {
  playerWalletSelectors,
  playerWalletIsNotNilSelector,

  bonusWalletSelectors,
  playerBonusWalletIsNotNilSelector,

  freeBetWalletSelectors,
  playerFreeBetWalletIsNotNilSelector,
};


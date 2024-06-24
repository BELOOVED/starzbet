import { createPropertySelectors, createSimpleSelector, getNotNil, isNotNil } from "@sb/utils";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { playerWalletIsNotNilSelector } from "./WalletSelectors";
import { playerDetailsSelectors } from "./PlayerSelectors";

const isNotNilPlayerProfileSelector = createSimpleSelector(
  [playerDetailsSelectors.profile],
  isNotNil,
);

const notNilPlayerProfileSelector = (state: IWithPlayerState) => getNotNil(
  playerDetailsSelectors.profile(state),
  ["notNilPlayerProfileSelector"],
  "playerDetailsSelector.profile(state)",
);

const profileSelectors = createPropertySelectors(notNilPlayerProfileSelector);

const hasProfileAndWalletSelector = (state: IWithPlayerState) =>
  isNotNilPlayerProfileSelector(state) && playerWalletIsNotNilSelector(state);

const nameSurnameSelector = createSimpleSelector(
  [
    profileSelectors.name,
    profileSelectors.surname,
  ],
  (name, surname) => {
    if (!name || !surname) {
      throw new Error("Name and Surname is nil for player!");
    }

    return `${name} ${surname}`;
  },
);

export {
  isNotNilPlayerProfileSelector,
  notNilPlayerProfileSelector,
  profileSelectors,
  hasProfileAndWalletSelector,
  nameSurnameSelector,
};


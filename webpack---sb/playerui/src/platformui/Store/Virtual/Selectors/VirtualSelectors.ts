import { type Selector } from "react-redux";
import { createPropertySelector, createSimpleSelector } from "@sb/utils";
import { type TCasinoState } from "../../Casino/CasinoInitialState";
import { type TWithVirtualState } from "../VirtualInitialState";

const virtualSelector: Selector<TWithVirtualState, TCasinoState> = ({ virtual }) => virtual;

const virtualFavouritesSelector = createPropertySelector(
  virtualSelector,
  "favourites",
);

const virtualFavouriteByGameId = createSimpleSelector(
  [
    virtualFavouritesSelector,
    (_, gameId: string) => gameId,
  ],
  (favourites, gameId) => favourites.find((it) => it === gameId),
);

export {
  virtualFavouritesSelector,
  virtualFavouriteByGameId,
};

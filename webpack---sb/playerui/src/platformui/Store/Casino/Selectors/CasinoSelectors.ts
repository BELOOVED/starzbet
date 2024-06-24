import { type Selector } from "react-redux";
import { createPropertySelector, createSimpleSelector } from "@sb/utils";
import { type TCasinoState, type TWithCasinoState } from "../CasinoInitialState";

const casinoSelector: Selector<TWithCasinoState, TCasinoState> = ({ casino }) => casino;

const casinoFavouritesSelector = createPropertySelector(
  casinoSelector,
  "favourites",
);

const casinoFavouritesSelectorLength = createPropertySelector(
  casinoFavouritesSelector,
  "length",
);

const casinoGameIdsSelector = createPropertySelector(
  casinoSelector,
  "gameIds",
);

const casinoPageInfoSelector = createPropertySelector(
  casinoSelector,
  "pageInfo",
);

const casinoFavouriteByGameId = createSimpleSelector(
  [
    casinoFavouritesSelector,
    (_, gameId: string) => gameId,
  ],
  (casinoFavourites, gameId) => casinoFavourites.find((it) => it === gameId),
);

export {
  casinoFavouritesSelector,
  casinoFavouriteByGameId,
  casinoFavouritesSelectorLength,
  casinoGameIdsSelector,
  casinoPageInfoSelector,
};

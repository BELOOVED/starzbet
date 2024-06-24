import { type Selector } from "react-redux";
import { createPropertySelector, createSimpleSelector } from "@sb/utils";
import { type TCasinoState } from "../../Casino/CasinoInitialState";
import { type TWithLiveCasinoState } from "../LiveCasinoInitialState";

const liveCasinoSelector: Selector<TWithLiveCasinoState, TCasinoState> = ({ liveCasino }) => liveCasino;

const liveCasinoFavouritesSelector = createPropertySelector(
  liveCasinoSelector,
  "favourites",
);

const liveCasinoIsWithDgaSelector = createSimpleSelector(
  [liveCasinoSelector],
  (casino) => Boolean(casino.isWithDga),
);

const liveCasinoFavouritesSelectorLength = createPropertySelector(
  liveCasinoFavouritesSelector,
  "length",
);

const liveCasinoGameIdsSelector = createPropertySelector(
  liveCasinoSelector,
  "gameIds",
);

const liveCasinoPageInfoSelector = createPropertySelector(
  liveCasinoSelector,
  "pageInfo",
);

const liveCasinoFavouriteByGameId = createSimpleSelector(
  [
    liveCasinoFavouritesSelector,
    (_, gameId: string) => gameId,
  ],
  (favourites, gameId) => favourites.find((it) => it === gameId),
);

export {
  liveCasinoFavouritesSelector,
  liveCasinoFavouriteByGameId,
  liveCasinoFavouritesSelectorLength,
  liveCasinoGameIdsSelector,
  liveCasinoPageInfoSelector,
  liveCasinoIsWithDgaSelector,
};

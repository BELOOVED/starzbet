import { type Selector } from "react-redux";
import { getNotNil, createPropertySelector, createSimpleSelector, isNotNil } from "@sb/utils";
import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { gameInfoModalSelector } from "../../../../common/Store/Modal/Selectors/ModalSelectors";
import { assertNotNilGameByIdSelector, gamesByPageSelector } from "../../Games/Selectors/GamesSelectors";
import { gamesByProviderCombiner } from "../../Games/GamesUtils";
import { type TDrawerState, type TWithDrawerState } from "../GameInfoDrawerInitialState";

const SIMILAR_GAMES_COUNT_IN_DRAWER = 6;

const drawerSelector: Selector<TWithDrawerState, TDrawerState> = ({ drawer }) => drawer;

const drawerVisibleIdSelector = createPropertySelector(drawerSelector, "id");

const drawerVisibleSelector = createSimpleSelector([drawerVisibleIdSelector], isNotNil);

const drawerVisibleNotNilIdSelector = createSimpleSelector(
  [drawerVisibleIdSelector],
  (id) => getNotNil(id, ["drawerVisibleSelector"], "id"),
);

const drawerGameSelector = (state: TMixAppState) => {
  const gameId = drawerVisibleNotNilIdSelector(state);

  return assertNotNilGameByIdSelector(state, gameId);
};

const modalGameSelector = (state: TMixAppState) => {
  const gameInfo = gameInfoModalSelector(state);

  return assertNotNilGameByIdSelector(state, gameInfo.id);
};

const similarGamesInDrawer = (state: TMixAppState): TPlatform_Game_Fragment[] => {
  const { provider, gamePage, id } = drawerGameSelector(state);
  const games = gamesByPageSelector(state, gamePage);

  return gamesByProviderCombiner(provider)(games)
    .filter((it) => it.id !== id)
    .slice(0, SIMILAR_GAMES_COUNT_IN_DRAWER);
};

const modalSimilarGamesSelector = (state: TMixAppState) => {
  const { provider, gamePage, id } = modalGameSelector(state);

  const games = gamesByPageSelector(state, gamePage);

  return gamesByProviderCombiner(provider)(games)
    .filter((it) => it.id !== id)
    .slice(0, SIMILAR_GAMES_COUNT_IN_DRAWER);
};

export {
  modalGameSelector,
  drawerVisibleNotNilIdSelector,
  SIMILAR_GAMES_COUNT_IN_DRAWER,
  drawerVisibleIdSelector,
  drawerVisibleSelector,
  drawerGameSelector,
  similarGamesInDrawer,
  modalSimilarGamesSelector,
};

import { switchMap } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { createCallManagerSymbol } from "@sb/call-manager";
import { platformRandomGameQueryOptionalFields, query_Platform_RandomGame } from "@sb/graphql-client/PlayerUI";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { openShuffleGameAction, replaceShuffleGameAction } from "../Actions/GamesActions";
import { gameManagerPageToProductMap, type TGameManagerPage } from "../Model/Games";

const LOADING_SHUFFLE_GAME_SYMBOL = createCallManagerSymbol("LOADING_SHUFFLE_GAME_ID_SYMBOL");

const loadingShuffleGameEpicFactory = (page: TGameManagerPage) => gqlLoadingFactory(
  LOADING_SHUFFLE_GAME_SYMBOL,
  query_Platform_RandomGame,
  {
    optionalFields: platformRandomGameQueryOptionalFields,
    variables: {
      product: gameManagerPageToProductMap[page],
    },
  },
  replaceShuffleGameAction,
  ({ platform: { RandomGame } }) => [page, RandomGame],
);

const loadShuffleGameIdByActionEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(openShuffleGameAction),
  switchMap(
    ({ payload }) => loadingShuffleGameEpicFactory(payload.page)(action$, state$, deps),
  ),
);

export {
  loadingShuffleGameEpicFactory,
  loadShuffleGameIdByActionEpic,
  LOADING_SHUFFLE_GAME_SYMBOL,
};

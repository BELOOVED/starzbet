import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { EMPTY, filter, take } from "rxjs";
import { combineEpics } from "redux-observable";
import {
  platformGamePagesByPlayerQueryOptionalFields,
  query_Platform_GamePagesByPlayer,
} from "@sb/graphql-client/PlayerUI";
import type { TGQLClient } from "@sb/graphql-client";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { isTestPlayerSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { GAME_MANAGER_GAME_PAGES_LOADING_SYMBOL } from "../Variables";
import { gamePagesReceivedAction } from "../Actions/GamesActions";
import { gamePagesLoadingSucceededSelector, isGamePagesServerLoadedSelector } from "../Selectors/GamesSelectors";
import { gamePagesNormalizer } from "../Reducers/GamesRootReducer";

const whenGamePagesLoaded = (...epics: TMixAppEpic[]): TMixAppEpic =>
  (action$, state$, deps) => state$.pipe(
    map(gamePagesLoadingSucceededSelector),
    filter(Boolean),
    take(1),
    switchMap(() => combineEpics(...epics)(action$, state$, deps)),
  );

const loadGamePagesEpic: TMixAppEpic = (
  action$,
  state$,
  dependencies,
) => {
  const isServerLoaded = isGamePagesServerLoadedSelector(state$.value);

  if (isServerLoaded) {
    return EMPTY;
  }

  return state$.pipe(
    map(isTestPlayerSelector),
    distinctUntilChanged(),
    switchMap(
      () => gqlLoadingFactory(
        GAME_MANAGER_GAME_PAGES_LOADING_SYMBOL,
        query_Platform_GamePagesByPlayer,
        {
          optionalFields: platformGamePagesByPlayerQueryOptionalFields,
          variables: {},
        },
        gamePagesReceivedAction,
        ({ platform: { GamePagesByPlayer } }) => [GamePagesByPlayer],
      )(
        action$,
        state$,
        dependencies,
      ),
    ),
  );
};

const gql_GamePagesByPlayerQuery = (graphQLClient: TGQLClient) =>
  query_Platform_GamePagesByPlayer(
    graphQLClient,
    {
      optionalFields: platformGamePagesByPlayerQueryOptionalFields,
      variables: {},
    },
  ).then((response) => gamePagesNormalizer(response.platform.GamePagesByPlayer));

export { gql_GamePagesByPlayerQuery, loadGamePagesEpic, whenGamePagesLoaded };

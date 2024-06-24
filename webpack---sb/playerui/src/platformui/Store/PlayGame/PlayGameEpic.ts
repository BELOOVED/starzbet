import { combineEpics } from "redux-observable";
import { concat, from, merge, of, pipe, take } from "rxjs";
import { catchError, filter, map, switchMap, tap } from "rxjs/operators";
import {
  callManagerFailedAction,
  callManagerRemoveSymbolAction,
  callManagerStartAction,
  callManagerSucceededAction,
} from "@sb/call-manager";
import { type TCallPayload } from "@sb/sdk";
import { type call_GetDemoGameLinkCommand, type call_GetGameLinkCommand } from "@sb/sdk/SDKClient/gamemanager";
import { DEVICE_INFO, type ELocale, extractNodesFromEdges, isCreator, isNil } from "@sb/utils";
import {
  platformGamesQueryOptionalFields,
  query_Platform_Games,
  type TPlatform_Games_QueryResult,
} from "@sb/graphql-client/PlayerUI";
import {
  type Client,
  EPlatform_GameWhereFieldPaths,
  EWhere_Predicate,
  type TPlatform_GameWhereInput,
} from "@sb/graphql-client";
import { routerEpic } from "@sb/router";
import { type TMatch } from "@sb/react-router-compat";
import { type TMixAppEpic, type TMixConnectedAppEpic } from "../../../common/Store/Root/Epics/TMixAppEpic";
import { getMatch } from "../../../common/Utils/RouterUtils/GetMatch";
import { Logger } from "../../../common/Utils/Logger";
import { availableAuthPlayerSelector } from "../../../common/Store/Player/Selectors/AvailableAuthPlayerSelector";
import { platformConfigSystemLocaleSelector } from "../../../common/Store/Config/Selectors/ConfigSelectors";
import { createConnectedEpic } from "../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { whenLoggedAndWsAuthenticatedEpic } from "../../../common/Store/WsAuth/WsAuthEpic";
import { type TMixAppState } from "../../../sportsbookui/Store/CreateMixInitialState";
import { type IAppEpicDependencies } from "../../../common/Store/Root/Epics/TAppEpic";
import { callWithAbort } from "../../../common/Utils/EpicUtils/CallWithAbort";
import { routeMap } from "../../RouteMap/RouteMap";
import { getTranslatedText } from "../../Components/TranslateRecord/TranslateRecord";
import { localeSelector } from "../Locale/Selectors/localeSelector";
import { EExternalGameId } from "../Games/GamesModels";
import {
  inProgressPlayerBonusesOperand,
  loadPlayerBonusesEpicFactory,
} from "../Bonuses/Epics/LoadEpicFactories/LoadPlayerBonusesEpicFactory";
import {
  playerBonusHasBeenActivatedAction,
  playerBonusHasBeenCanceledAction,
  playerBonusHasBeenCompletedAction,
  playerBonusHasBeenLostAction,
  playerBonusHasBeenWonAction,
  playerBonusProceededToWageringStageAction,
} from "../Bonuses/BonusesActions";
import {
  playGameGameReceivedAction,
  playGameLinkReceivedAction,
  playGamePlayerBonusesReceivedAction,
  playGamePlayerBonusRemoveAllEventDataAction,
  tryAgainClickedAction,
} from "./PlayGameActions";
import {
  PLAY_GAME_GAME_LOAD_SYMBOL,
  PLAY_GAME_LINK_LOAD_SYMBOL,
  PLAY_GAME_PLAYER_BONUSES_LOAD_SYMBOL,
} from "./PlayGameVariables";
import { watchBonusOnPlayGameRoute } from "./WatchBonusOnPlayGameRoute";
import { playGameGameSelector } from "./PlayGameSelectors";

type TCommand = (
  payload: TCallPayload<typeof call_GetDemoGameLinkCommand> | TCallPayload<typeof call_GetGameLinkCommand>,
  signal: AbortSignal,
) => ReturnType<typeof call_GetDemoGameLinkCommand> | ReturnType<typeof call_GetGameLinkCommand>;

const getGameLink = (command: TCommand, gameId: string, locale: ELocale) => callWithAbort(
  command,
  { gameId, locale, deviceInfo: DEVICE_INFO },
);

const loadGameLink = (command: TCommand, gameId: string, locale: ELocale) => merge(
  of(callManagerStartAction(PLAY_GAME_LINK_LOAD_SYMBOL)),
  getGameLink(command, gameId, locale).pipe(
    switchMap(({ value, type }) => from([
      playGameLinkReceivedAction(value, type),
      callManagerSucceededAction(PLAY_GAME_LINK_LOAD_SYMBOL),
    ])),
    catchError((error: unknown) => {
      Logger.warn.epic("loadGameLink", error);

      return of(callManagerFailedAction(PLAY_GAME_LINK_LOAD_SYMBOL, error));
    }),
  ),
);

const getExternalGameOperand = (externalGameId: EExternalGameId): TPlatform_GameWhereInput => ({
  predicate: EWhere_Predicate.eq,
  fieldPath: EPlatform_GameWhereFieldPaths.gameExternalId,
  value: externalGameId,
});

const getGameIdOperand = (gameId: string): TPlatform_GameWhereInput => ({
  predicate: EWhere_Predicate.eq,
  fieldPath: EPlatform_GameWhereFieldPaths.gameId,
  value: gameId,
});

const isExternalGameId = (value: string | EExternalGameId): value is EExternalGameId =>
  Object.values(EExternalGameId).includes(value as EExternalGameId);

const changeDocumentTitle = (locale: ELocale, systemLocale: ELocale) => pipe(tap<TPlatform_Games_QueryResult>(({ platform: { Games } }) => {
  const [first] = extractNodesFromEdges(Games);

  if (isNil(first)) {
    return;
  }

  const name = getTranslatedText(first.name, locale, systemLocale);

  if (name && !document.title.includes(name)) {
    document.title += ` - ${name}`;
  }
}));

const loadGameAndLink = (
  gameId: string | EExternalGameId,
  command: TCommand,
  locale: ELocale,
  systemLocale: ELocale,
  graphQLClient: Client,
) => {
  if (isExternalGameId(gameId)) {
    return merge(
      of(callManagerStartAction(PLAY_GAME_GAME_LOAD_SYMBOL)),
      from(query_Platform_Games(
        graphQLClient,
        {
          optionalFields: platformGamesQueryOptionalFields,
          variables: { cursor: { first: 1 }, where: getExternalGameOperand(gameId) },
        },
      )).pipe(
        changeDocumentTitle(locale, systemLocale),
        switchMap(({ platform: { Games } }) => {
          const [first] = extractNodesFromEdges(Games);

          if (isNil(first)) {
            return of(callManagerFailedAction(PLAY_GAME_GAME_LOAD_SYMBOL, new Error(`failed to load game with external ID ${gameId}`)));
          }

          return merge(
            of(playGameGameReceivedAction(first)),
            of(callManagerSucceededAction(PLAY_GAME_GAME_LOAD_SYMBOL)),
            loadGameLink(command, first.id, locale),
          );
        }),
        catchError((error: unknown) => {
          Logger.warn.epic("loadGameAndLink", error);

          return of(callManagerFailedAction(PLAY_GAME_GAME_LOAD_SYMBOL, error));
        }),
      ),
    );
  }

  return merge(
    loadGameLink(command, gameId, locale),
    of(callManagerStartAction(PLAY_GAME_GAME_LOAD_SYMBOL)),
    from(query_Platform_Games(
      graphQLClient,
      {
        optionalFields: platformGamesQueryOptionalFields,
        variables: { cursor: { first: 1 }, where: getGameIdOperand(gameId) },
      },
    )).pipe(
      changeDocumentTitle(locale, systemLocale),
      switchMap(({ platform: { Games } }) => {
        const [first] = extractNodesFromEdges(Games);

        if (isNil(first)) {
          return of(callManagerFailedAction(PLAY_GAME_GAME_LOAD_SYMBOL, new Error(`failed to load game with ID ${gameId}`)));
        }

        return from([
          playGameGameReceivedAction(first),
          callManagerSucceededAction(PLAY_GAME_GAME_LOAD_SYMBOL),
        ]);
      }),
      catchError((error: unknown) => {
        Logger.warn.epic("loadGameAndLink", error);

        return of(callManagerFailedAction(PLAY_GAME_GAME_LOAD_SYMBOL, error));
      }),
    ),
  );
};

const loadGameAndLinkEpicFactory = (gameId: string | EExternalGameId, isDemo: boolean): TMixAppEpic =>
  (action$, state$, deps) => {
    const locale = localeSelector(state$.value);
    const systemLocale = platformConfigSystemLocaleSelector(state$.value);

    const command = isDemo
      ? deps.platformHttpApi.callGetDemoGameLink
      : deps.platformHttpApi.callGetGameLink;

    const loader$ = loadGameAndLink(
      gameId,
      command,
      locale,
      systemLocale,
      deps.graphQLClient,
    );

    return merge(
      loader$,
      action$.pipe(
        isCreator(tryAgainClickedAction),
        switchMap(() => concat(
          of(callManagerRemoveSymbolAction([PLAY_GAME_LINK_LOAD_SYMBOL, PLAY_GAME_GAME_LOAD_SYMBOL])),
          loader$,
        )),
      ),
    );
  };

const loadActivePlayerBonusesEpic = loadPlayerBonusesEpicFactory(
  PLAY_GAME_PLAYER_BONUSES_LOAD_SYMBOL,
  playGamePlayerBonusesReceivedAction,
  [inProgressPlayerBonusesOperand],
);

const handleBonusSocketEventEpic: TMixAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(
    playerBonusHasBeenActivatedAction,
    playerBonusHasBeenCanceledAction,
    playerBonusHasBeenWonAction,
    playerBonusHasBeenCompletedAction,
    playerBonusHasBeenLostAction,
    playerBonusProceededToWageringStageAction,
  ),
  switchMap(() => loadActivePlayerBonusesEpic(action$, state$, deps)),
);

const handleEventModalClosedEpic: TMixAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(playGamePlayerBonusRemoveAllEventDataAction),
  switchMap(() => {
    const game = playGameGameSelector(state$.value);
    const locale = localeSelector(state$.value);

    return loadGameLink(deps.platformHttpApi.callGetGameLink, game.id, locale);
  }),
);

const playGamePageRouterEpic = routerEpic({
  name: "playGamePageRouterEpic",
  match: getMatch({ path: routeMap.play, exact: true }),
  onStart: (match: TMatch<{
    gameId: string | EExternalGameId;
  }>): TMixAppEpic => (action$, state$, deps) => state$.pipe(
    map(availableAuthPlayerSelector),
    filter(Boolean),
    take(1),
    switchMap(() => combineEpics(
      loadGameAndLinkEpicFactory(match.params.gameId, false),
      loadActivePlayerBonusesEpic,
      handleBonusSocketEventEpic,
      handleEventModalClosedEpic,
      whenLoggedAndWsAuthenticatedEpic(
        createConnectedEpic<TMixConnectedAppEpic, TMixAppState, IAppEpicDependencies>(watchBonusOnPlayGameRoute),
      ),
    )(action$, state$, deps)),
  ),
  onStop: () => () => of(callManagerRemoveSymbolAction(PLAY_GAME_PLAYER_BONUSES_LOAD_SYMBOL)),
});

const playDemoGameRouterEpic: TMixAppEpic = routerEpic({
  name: "playDemoGameRouterEpic",
  match: getMatch({ path: routeMap.playDemo, exact: true }),
  onStart: (match: TMatch<{
    gameId: string | EExternalGameId;
  }>) => loadGameAndLinkEpicFactory(match.params.gameId, true),
});

const playGameRootEpic = combineEpics(
  playGamePageRouterEpic,
  playDemoGameRouterEpic,
);

export {
  getGameLink,
  loadGameLink,
  playGameRootEpic,
};

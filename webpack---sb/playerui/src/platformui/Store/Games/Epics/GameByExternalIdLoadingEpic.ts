import { EMPTY, from, merge, of } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { platformGamesQueryOptionalFields, query_Platform_Games, type TPlatform_Games_QueryVariables } from "@sb/graphql-client/PlayerUI";
import { EPlatform_GameWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { deferWithAbort, extractNodesFromEdges, isNotNil } from "@sb/utils";
import { loggedSelector } from "@sb/auth";
import { retryWithLog } from "../../../../common/Utils/EpicUtils/RetryWithLog";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { getGameLink } from "../../PlayGame/PlayGameEpic";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  gameLinkForExternalGameReceivedAction,
  removeGameLinkForExternalGameAction,
  simpleGamesLoadedAction,
} from "../Actions/GamesActions";
import { type EExternalGameId } from "../GamesModels";

const gameByExternalIdLoadingEpic = (externalId: EExternalGameId): TPlatformEpic =>
  (action$, state$, dependencies) => {
    const variables: TPlatform_Games_QueryVariables = {
      cursor: { first: 1 },
      where: {
        predicate: EWhere_Predicate.eq,
        fieldPath: EPlatform_GameWhereFieldPaths.gameExternalId,
        value: externalId,
      },
    };

    return (
      deferWithAbort((signal) => from(query_Platform_Games(
        dependencies.graphQLClient,
        {
          optionalFields: platformGamesQueryOptionalFields,
          variables,
          signal,
        },
      ))).pipe(
        switchMap(({ platform: { Games } }) => {
          const [game] = extractNodesFromEdges(Games);

          if (!game) {
            return EMPTY;
          }

          return merge(
            of(simpleGamesLoadedAction([game])),
            state$.pipe(
              map(loggedSelector),
              distinctUntilChanged(),
              switchMap((logged) => {
                const locale = localeSelector(state$.value);

                if (logged) {
                  return getGameLink(dependencies.platformHttpApi.callGetGameLink, game.id, locale);
                }

                if (game.isDemoAvailable) {
                  return getGameLink(dependencies.platformHttpApi.callGetDemoGameLink, game.id, locale);
                }

                return of(null);
              }),
              map((link) => isNotNil(link)
                ? gameLinkForExternalGameReceivedAction(externalId, link.value)
                : removeGameLinkForExternalGameAction(externalId)),
            ),
          );
        }),
        retryWithLog(),
      )
    );
  };
export { gameByExternalIdLoadingEpic };

import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { debounceTime, EMPTY, from, of } from "rxjs";
import { combineEpics } from "redux-observable";
import { isEmpty, isNotEmpty, isNotNil } from "@sb/utils";
import { call_GetSubscribersUriCountCommand } from "@sb/sdk/SDKClient/websocket";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { createSubscribe } from "../../../../common/Utils/EpicUtils/CreateSubscribe";
import { createConnectedEpic } from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { SB_WS_POSTFIX } from "../../../../common/Model/SocketPostfix";
import { gamesOnlineSelector, gamesSelector } from "../Selectors/GamesSelectors";
import { onlineUpdateReceiveAction } from "../Actions/OnlineActions";
import { type IOnlineUpdate } from "../Model/Games";

const subscribeOnlinePlayersEpic: TMixAppEpic = createConnectedEpic(
  createSubscribe<IOnlineUpdate>(
    "sumstats.casino.game.bets.*.introspection",
    ({ subscribersCount }, uri) => () => of(onlineUpdateReceiveAction({ [uri]: subscribersCount })),
    "[watchOnlineEpic] sumstats.casino.game.bets.introspection failed",
  ),
);

const watchCasinoOnlineEpic: TMixAppEpic = (_, state$, dependencies) => state$.pipe(
  map(gamesSelector),
  distinctUntilChanged(),
  debounceTime(400),
  filter((games) => isNotEmpty(games)),
  map((games) => games.map((game) => game.id)),
  switchMap((gameIds) => {
    const subscribers = gamesOnlineSelector(state$.value);

    // If we have active subscriber we don't ask this game snapshot
    const uris = gameIds.reduce<string[]>(
      (acc, id) => {
        if (isNotNil(subscribers?.[id])) {
          return acc;
        }

        const uri = `sumstats.casino.game.bets.${id}`;

        acc.push(uri);

        return acc;
      },
      [],
    );

    if (isEmpty(uris)) {
      return EMPTY;
    }

    return from(call_GetSubscribersUriCountCommand(dependencies.sportsbookHttpApi._rpcClient, SB_WS_POSTFIX, { uris })).pipe(
      switchMap((onlineRecord) => of(onlineUpdateReceiveAction(onlineRecord))),
    );
  }),
);

const casinoOnlineEpic = combineEpics(
  watchCasinoOnlineEpic,
  subscribeOnlinePlayersEpic,
);

export { casinoOnlineEpic };

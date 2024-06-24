import { getNotNil, isUuid, type TReducer } from "@sb/utils";
import { type onlineUpdateReceiveAction } from "../Actions/OnlineActions";
import { type TWithGamesState } from "../GamesInitialState";

/*
*  We get from server Record<uri, number>: {sumstats.casino.game.bets.cool-game-id-12345: 5}
*  We store values Record<gameId, number>: {cool-game-id-12345: 5}
* */

const payloadHandler = (payload: Record<string, number>) => Object.keys(payload).reduce<Record<string, number>>(
  (acc, val) => {
    const arr = val.split(".");
    const id = getNotNil(arr.find((el) => isUuid(el)), ["gameOnlineReceiveReducer", "payloadHandler"], "game id");

    acc[id] = getNotNil(payload[val], ["gameOnlineReceiveReducer", "payloadHandler"], "online count");

    return acc;
  },
  {},
);

const gameOnlineUpdateReceiveReducer: TReducer<TWithGamesState, typeof onlineUpdateReceiveAction> = (
  state,
  {
    payload: { online },
  },
) => ({
  ...state,
  games: {
    ...state.games,
    online: {
      ...state.games.online,
      ...payloadHandler(online),
    },
  },
});

export { gameOnlineUpdateReceiveReducer };

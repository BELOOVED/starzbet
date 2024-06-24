import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPageInfo_Fragment } from "@sb/graphql-client";

const popularGamesReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPageInfo_Fragment,
) => ({
  type: "@LANDING/POPULAR_GAMES_RECEIVED",
  payload: { games, pageInfo },
});

const starzGamesReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPageInfo_Fragment,
) => ({
  type: "@LANDING/STARZ_GAMES_RECEIVED",
  payload: { games, pageInfo },
});

export {
  popularGamesReceivedAction,
  starzGamesReceivedAction,
};

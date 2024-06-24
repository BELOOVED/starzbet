import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";

const overwriteRecentlyPlayedAction = (
  games: TPlatform_Game_Fragment[],
) => ({
  type: "@GAMES/OVERWRITE_RECENTLY_PLAYED",
  payload: { games },
});

const addToRecentlyPlayedAction = (
  gameId: string,
) => ({
  type: "@GAMES/ADD_TO_RECENTLY_PLAYED",
  payload: { gameId },
});

export {
  overwriteRecentlyPlayedAction,
  addToRecentlyPlayedAction,
};

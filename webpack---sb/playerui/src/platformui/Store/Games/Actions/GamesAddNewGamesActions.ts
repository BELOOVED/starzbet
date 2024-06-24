import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";

const gamesAddNewGamesAction = (
  games: TPlatform_Game_Fragment[],
) => ({
  type: "@GAMES/ADD_NEW_GAMES_ACTION",
  payload: { games },
});

export { gamesAddNewGamesAction };

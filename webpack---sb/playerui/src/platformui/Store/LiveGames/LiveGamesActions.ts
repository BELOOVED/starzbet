const liveGamesToggleFavouriteAction = (gameId: string) => ({
  type: "LIVE_GAMES/TOGGLE_FAVOURITE",
  payload: { gameId },
});

export {
  liveGamesToggleFavouriteAction,
};

const liveCasinoToggleFavouriteAction = (gameId: string) => ({
  type: "LIVE_CASINO/TOGGLE_FAVOURITE",
  payload: { gameId },
});

export {
  liveCasinoToggleFavouriteAction,
};

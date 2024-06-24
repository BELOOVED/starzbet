const casinoToggleFavouriteAction = (gameId: string) => ({
  type: "CASINO/TOGGLE_FAVOURITE",
  payload: { gameId },
});

export {
  casinoToggleFavouriteAction,
};

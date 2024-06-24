const virtualToggleFavouriteAction = (gameId: string) => ({
  type: "VIRTUAL/TOGGLE_FAVOURITE",
  payload: { gameId },
});

export {
  virtualToggleFavouriteAction,
};

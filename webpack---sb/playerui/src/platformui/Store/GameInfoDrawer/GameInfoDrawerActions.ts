const getGameInfoDrawerSymbol = (actionName: string) => `@GAME_INFO_DRAWER/${actionName}`;

const gameInfoDrawerSetVisibleAction = (id: string) => ({
  type: getGameInfoDrawerSymbol("SET_VISIBLE"),
  payload: { id },
});

const gameInfoDrawerSetDisableAction = () => ({
  type: getGameInfoDrawerSymbol("SET_DISABLE"),
});

export { gameInfoDrawerSetVisibleAction, gameInfoDrawerSetDisableAction };

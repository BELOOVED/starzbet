// @ts-nocheck
const appIncrementRestartNumberReducer = (state) => ({
  ...state,
  app: {
    ...state.app,
    restartNumber: state.app.restartNumber + 1,
  },
});

export { appIncrementRestartNumberReducer };

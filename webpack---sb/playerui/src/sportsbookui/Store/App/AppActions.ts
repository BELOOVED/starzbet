// @ts-nocheck
const appErrorAction = () => ({
  type: "@APP/ERROR",
});

const appResetStateAction = () => ({
  type: "@APP/RESET_STATE",
});

const appIncrementRestartNumberAction = () => ({
  type: "@APP/INCREMENT_RESTART_NUMBER",
});

const appChangeParamsAction = (payload) => ({
  type: "@APP/CHANGE_PARAMS",
  payload,
});

const appChangePathNamespaceAction = (pathNamespace) => ({
  type: "@APP/CHANGE_PATH_NAMESPACE",
  payload: { pathNamespace },
});

const appDestroyAction = () => ({
  type: "@APP/DESTROY",
});

const appSetAsAdminUIFrameAction = () => ({
  type: "@APP/SET_AS_ADMINUI_FRAME",
});

export {
  appErrorAction,
  appResetStateAction,
  appIncrementRestartNumberAction,
  appChangeParamsAction,
  appChangePathNamespaceAction,
  appDestroyAction,
  appSetAsAdminUIFrameAction,
};

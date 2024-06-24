// @ts-nocheck

const appChangePathNamespaceReducer = (state, { payload: { pathNamespace } }) => ({
  ...state,
  app: {
    ...state.app,
    pathNamespace,
  },
});

export { appChangePathNamespaceReducer };

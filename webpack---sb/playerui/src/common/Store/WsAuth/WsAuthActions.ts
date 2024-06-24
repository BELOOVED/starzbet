
const setAuthenticatedAction = (authenticated: boolean) => ({
  type: "@WS_AUTH/SET_AUTHENTICATED",
  payload: {
    authenticated,
  },
});

export { setAuthenticatedAction };

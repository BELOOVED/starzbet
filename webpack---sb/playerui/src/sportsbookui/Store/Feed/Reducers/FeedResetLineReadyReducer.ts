
const feedResetLineReadyReducer = (state, { payload: { postfix } }) => ({
  ...state,
  feed: {
    ...state.feed,
    lineReady: {
      ...state.feed.lineReady,
      [postfix]: false,
    },
  },
});

export { feedResetLineReadyReducer };

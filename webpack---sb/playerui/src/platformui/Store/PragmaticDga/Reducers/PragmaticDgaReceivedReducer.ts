// @ts-nocheck
const pragmaticDgaReceivedReducer = (state, action) => {
  if (Array.isArray(action.payload.snapshot)) {
    return ({
      ...state,
      dgaInfo: {
        ...state.dgaInfo,
        ...action.payload.snapshot.reduce(
          (acc, newInfo) => ({
            [newInfo.tableId]: newInfo,
          }),
          {},
        ),
      },
    });
  }

  if (action.payload.snapshot.tableId) {
    return ({
      ...state,
      dgaInfo: {
        ...state.dgaInfo,
        [action.payload.snapshot.tableId]: action.payload.snapshot,
      },
    });
  }

  return ({
    ...state,
    dgaInfo: {
      ...state.dgaInfo,
      ...action.payload.snapshot,
    },
  });
};

export { pragmaticDgaReceivedReducer };

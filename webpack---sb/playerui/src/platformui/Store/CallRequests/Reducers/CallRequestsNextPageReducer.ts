import { type ICallRequestState } from "../CallRequestsInitialState";

const callRequestsNextPageReducer = (state: ICallRequestState) => ({
  ...state,
  callRequests: {
    ...state.callRequests,
    variables: {
      ...state.callRequests.variables,
      cursor: {
        ...state.callRequests.variables.cursor,
        first: state.callRequests.variables.cursor.first || state.callRequests.variables.cursor.last,
        after: state.callRequests.pageInfo.endCursor,
        before: void 0,
        last: void 0,
      },
    },
  },
});

export { callRequestsNextPageReducer };

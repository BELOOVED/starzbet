import { type ICallRequestState } from "../CallRequestsInitialState";

const callRequestsPrevPageReducer = (state: ICallRequestState) => ({
  ...state,
  callRequests: {
    ...state.callRequests,
    variables: {
      ...state.callRequests.variables,
      cursor: {
        ...state.callRequests.variables.cursor,
        before: state.callRequests.pageInfo.startCursor,
        last: state.callRequests.variables.cursor.last || state.callRequests.variables.cursor.first,
        after: void 0,
        first: void 0,
      },
    },
  },
});

export { callRequestsPrevPageReducer };

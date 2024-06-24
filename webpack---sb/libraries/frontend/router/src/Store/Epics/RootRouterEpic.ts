import { combineEpics } from "redux-observable";
import { actionSubjectEpic } from "./ActionSubjectEpic";
import { callHistoryEpic } from "./CallHistoryEpic";
import { observeHistoryEpic } from "./ObserveHistoryEpic";

const rootRouterEpic = combineEpics(
  callHistoryEpic,
  observeHistoryEpic,
  actionSubjectEpic,
);

export { rootRouterEpic };

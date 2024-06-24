import { switchMap } from "rxjs";
import { combineEpics } from "redux-observable";
import { isCreator } from "@sb/utils";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { callRequestsNextPageAction, callRequestsPrevPageAction } from "../CallRequestsActions";
import { callRequestsCallOptionsLoadEpic, callRequestsLoadEpic } from "./CallRequestsLoadEpics";

const callRequestsPaginatorEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(callRequestsNextPageAction, callRequestsPrevPageAction),
  switchMap(() => combineEpics(
    callRequestsCallOptionsLoadEpic,
    callRequestsLoadEpic,
  )(action$, state$, deps)),
);

export { callRequestsPaginatorEpic };

import { type Epic } from "redux-observable";
import { ignoreElements, tap } from "rxjs/operators";
import { type History, type LocationDescriptor } from "@sb/react-router-compat";
import { isCreator } from "@sb/utils";
import { go, goBack, goForward, push, replace } from "../Actions/RouterActions";

const callHistoryEpic: Epic = (action$, state$, { history }: { history: History; }) =>
  action$.pipe(
    isCreator(push, replace, go, goBack, goForward),
    tap(({ payload: { method, args } }) => {
      history[method](...args as [LocationDescriptor & number]);
    }),
    ignoreElements(),
  );

export { callHistoryEpic };

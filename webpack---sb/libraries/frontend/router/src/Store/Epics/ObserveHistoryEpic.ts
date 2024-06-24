import { Observable, Subscription } from "rxjs";
import { type Epic } from "redux-observable";
import { map } from "rxjs/operators";
import { type Action, type History, type Location } from "@sb/react-router-compat";
import { locationChangeAction } from "../Actions/RouterActions";

interface IHistoryPayload {
  location: Location<unknown>;
  action: Action;
}

interface IEpicDependenciesWithHistory {
  history: History;
}

const observe = (history: History): Observable<IHistoryPayload> => new Observable((obs) =>
  new Subscription(history.listen((location, action) => obs.next({ location, action }))),
);

const observeHistoryEpic: Epic = (_, __, { history }: IEpicDependenciesWithHistory) =>
  observe(history).pipe(
    map<IHistoryPayload, ReturnType<typeof locationChangeAction>>(
      ({ location, action }) => locationChangeAction(location, action),
    ),
  );

export { observeHistoryEpic };

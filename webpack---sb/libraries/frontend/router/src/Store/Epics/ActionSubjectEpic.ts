import { concat, Subject } from "rxjs";
import { type AnyAction } from "redux";
import { type Epic } from "redux-observable";
import { ignoreElements } from "rxjs/operators";

const actionSubject = new Subject<AnyAction>();

const actionSubjectEpic: Epic = (action$) => concat(
  actionSubject.asObservable(),
  action$.pipe(ignoreElements()),
);

export {
  actionSubject,
  actionSubjectEpic,
};

import { EMPTY } from "rxjs";
import { type Epic } from "redux-observable";
import { type Action } from "redux";

const noopEpic: Epic<Action, Action> = () => EMPTY;

export { noopEpic };


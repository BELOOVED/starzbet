import { type Action, type History } from "@sb/react-router-compat";
import { injectQuery } from "../../Utils/InjectQuery";
import { type IRouterLocation } from "../../Model/IRouterLocation";

interface IRouterState {
  previous: IRouterLocation;
  current: IRouterLocation;
  action: Action | "INITIAL";
}

interface IWithRouterState {
  router: IRouterState;
}

const getRouterInitialState = (history: History): IRouterState => ({
  previous: injectQuery(history.location),
  current: injectQuery(history.location),
  action: "INITIAL",
});

export {
  type IRouterState,
  type IWithRouterState,
  getRouterInitialState,
};

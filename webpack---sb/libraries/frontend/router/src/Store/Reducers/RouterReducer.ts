import { createRootReducer } from "@sb/utils";
import { injectQuery } from "../../Utils/InjectQuery";
import { locationChangeAction } from "../Actions/RouterActions";
import { type IRouterState } from "../State/RouterInitialState";

const locationChangeReducer = (
  s: IRouterState,
  { payload: { location, action } }: ReturnType<typeof locationChangeAction>,
): IRouterState => ({
  previous: s.current,
  current: injectQuery(location),
  action,
});

const routerReducer = createRootReducer([
  [locationChangeReducer, locationChangeAction],
]);

export { routerReducer };

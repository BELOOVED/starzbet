import { type Action, type History, type Location, type LocationState } from "history";

type THistoryMethod = Extract<keyof History, "push" | "replace" | "go" | "goBack" | "goForward">;

/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";

/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
const CALL_HISTORY_METHOD = "@@router/CALL_HISTORY_METHOD";

const locationChangeAction = <S = LocationState>(location: Location<S>, action: Action) => ({
  type: LOCATION_CHANGE as typeof LOCATION_CHANGE,
  payload: { location, action },
});

interface ILocationActionPayload<A = unknown[]> {
  method: THistoryMethod;
  args: A;
}

interface IUpdateLocationAction<A = unknown[]> {
  type: typeof CALL_HISTORY_METHOD;
  payload: ILocationActionPayload<A>;
}

const updateLocation = <T extends THistoryMethod>(method: T) => (...args: Parameters<History[T]>) => ({
  type: CALL_HISTORY_METHOD as typeof CALL_HISTORY_METHOD,
  payload: {
    method,
    args,
  },
});

/**
 * These actions correspond to the history API.
 * callHistoryEpic will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
const push: (
  ...args: Parameters<History["push"]>
) => IUpdateLocationAction<Parameters<History["push"]>> = updateLocation("push");

const replace: (
  ...args: Parameters<History["replace"]>
) => IUpdateLocationAction<Parameters<History["replace"]>> = updateLocation("replace");

const go: (
  ...args: Parameters<History["go"]>
) => IUpdateLocationAction<Parameters<History["go"]>> = updateLocation("go");

const goBack: () => IUpdateLocationAction<Parameters<History["goBack"]>> = updateLocation("goBack");

const goForward: () => IUpdateLocationAction<Parameters<History["goForward"]>> = updateLocation("goForward");

type TPush = typeof push;
type TReplace = typeof replace;

export {
  LOCATION_CHANGE,
  locationChangeAction,
  push,
  replace,
  go,
  goBack,
  goForward,
  type TPush,
  type TReplace,
};


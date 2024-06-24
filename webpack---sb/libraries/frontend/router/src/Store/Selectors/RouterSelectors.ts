import { type IWithRouterState } from "../State/RouterInitialState";

const routerSelector = (state: IWithRouterState) => state.router;

const routerPrevLocationSelector = (state: IWithRouterState) => routerSelector(state).previous;
const routerPrevLocationPathnameSelector = (state: IWithRouterState) => routerPrevLocationSelector(state).pathname;

const routerLocationSelector = (state: IWithRouterState) => routerSelector(state).current;
const routerLocationSearchSelector = (state: IWithRouterState) => routerLocationSelector(state).search;
const routerLocationQuerySelector = (state: IWithRouterState) => routerLocationSelector(state).query;
const routerLocationPathnameSelector = (state: IWithRouterState) => routerLocationSelector(state).pathname;

export {
  routerSelector,
  routerPrevLocationSelector,
  routerPrevLocationPathnameSelector,
  routerLocationSelector,
  routerLocationSearchSelector,
  routerLocationQuerySelector,
  routerLocationPathnameSelector,
};

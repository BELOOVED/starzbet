import { type ActionCreator, type AnyAction } from "redux";
import { createRootReducer } from "@sb/utils";
import { gameInfoDrawerSetDisableAction, gameInfoDrawerSetVisibleAction } from "../GameInfoDrawerActions";
import { type TWithDrawerState } from "../GameInfoDrawerInitialState";

type TDrawerReducer<A extends ActionCreator<AnyAction> = ActionCreator<AnyAction>> =
  (state: TWithDrawerState, action: ReturnType<A>) => TWithDrawerState;

const drawerSetVisibleReducer: TDrawerReducer<typeof gameInfoDrawerSetVisibleAction> = (state, { payload: { id } }) => ({
  ...state,
  drawer: { id },
});

const drawerSetDisableReducer: TDrawerReducer<typeof gameInfoDrawerSetDisableAction> = (state) => ({
  ...state,
  drawer: { id: null },
});

const gameInfoDrawerRootReducer = createRootReducer([
  [drawerSetVisibleReducer, gameInfoDrawerSetVisibleAction],
  [drawerSetDisableReducer, gameInfoDrawerSetDisableAction],
]);

export { gameInfoDrawerRootReducer };

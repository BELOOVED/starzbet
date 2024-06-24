/**
 * Dynamic Store allows to add and remove reducers and decorators to store dynamically
 *
 * Reducer will work same as Redux reducers
 * Decorator will work similar to Redux reducers, but it will be triggered not by action, but by state change
 *
 * To start using Dynamic Store
 *   - create instance of Dynamic Store
 *   - create reducers/decorators using "createReducer"/"createDecorator" methods
 *   - decorate Redux reducer using "decorateStoreReducer" method and pass returned reducer to Redux "createStore" function
 *   - add and remove reducers/decorators using "addReducer"/"addDecorator" and "removeReducer"/"removeDecorator" when necessary
 *
 * To view debug information use cheat-code "dynamicstore"
 */
import { type Reducer as ReduxReducer } from "redux";
import { Cheater, isDev, isE2E, isTest, type TExplicitAny, type TSelector } from "@sb/utils";
import { OPERATOR_INTERRUPT_SYMBOL, type TOperator } from "./Operators";

type TWithDisplayName<Source> = Source & {
  displayName: string;
};

type TAction<P = TExplicitAny> = {
  type: string;
  payload?: P;
};

type TActionCreator<Args extends TExplicitAny[] = TExplicitAny[], P = TExplicitAny> = (...args: Args) => TAction<P>;

type TReducer<State, ActionCreator extends TActionCreator = TActionCreator> = (state: State, action: ReturnType<ActionCreator>) => State

type TCreatedReducer<State, ActionCreator extends TActionCreator = TActionCreator> = TWithDisplayName<{
  item: TReducer<State, ActionCreator>;
  actionTypes: string[];
}>;

type TDecorator<State> = (state: State) => State;

type TCreatedDecorator<State, Value> = TWithDisplayName<{
  item: TDecorator<State>;
  operators: TOperator<Value>[];
}>;

type TDecoratorCondition<State> = {
  selector: TSelector<State, boolean>;
  last: boolean;
};

const USE_STRICT_MODE = isDev || isTest || isE2E;

const DEFAULT_DISPLAY_NAME = "Unknown";

class DynamicStore<State> {
  private _debugEnabled = false;
  private readonly _createdReducers = new Set<TCreatedReducer<State>>();
  private readonly _createdDecorators = new Map<TCreatedDecorator<State, TExplicitAny>, null | TDecoratorCondition<State>>();

  constructor() {
    Cheater.add(
      ["dynamicstore"],
      () => {
        this._debugEnabled = true;
      },
      "Enables debug mode",
    );
  }

  /**
   * Decorates Redux store reducer so that Dynamic Store instance can work.
   * Returned reducer must be passed to Redux "createStore" function
   *
   * @param storeReducer Redux store reducer
   */
  public decorateStoreReducer<Reducer extends ReduxReducer<State>>(storeReducer: Reducer): Reducer {
    return ((state, action) => {
      let nextState = storeReducer(state, action);

      nextState = this.runReducers(nextState, action);

      return this.runDecorators(nextState);
    }) as Reducer;
  }

  /**
   * Returns reducer that could be added and removed dynamically. Reducer will work same way as reducers in Redux
   *
   * @param actionCreators List of actions that will trigger created reducer
   * @param reducer Reducer that will be triggered by actions
   */
  public createReducer<ActionCreator extends TActionCreator>(
    actionCreators: ActionCreator[],
    reducer: TReducer<State, ActionCreator>,
  ): TCreatedReducer<State, ActionCreator> {
    const createdReducer: TCreatedReducer<State, ActionCreator> = {
      item: (state, action) => {
        const reducedState = reducer(state, action);

        this.debug(createdReducer, `Reducer "${createdReducer.displayName}" ran`);

        if (reducedState !== state) {
          this.debug(createdReducer, `Reducer "${createdReducer.displayName}" changed state`);
        }

        return reducedState;
      },
      actionTypes: actionCreators.map((it) => it().type),
      displayName: DEFAULT_DISPLAY_NAME,
    };

    return createdReducer;
  }

  /**
   * Returns decorator that could be added and removed dynamically.
   * Decorator keeps track of state and changes the state
   *
   * @param valueSelector Selector of value to trigger decorator
   * @param decorator Function that will be triggered by selected value
   * @param operators List of operators that will define should decorator be triggered or not
   */
  public createDecorator<Selector extends TSelector<State, TExplicitAny>>(
    valueSelector: Selector,
    decorator: TDecorator<State>,
    ...operators: TOperator<ReturnType<Selector>>[]
  ): TCreatedDecorator<State, ReturnType<Selector>> {
    const createdDecorator: TCreatedDecorator<State, ReturnType<Selector>> = {
      item: (state) => {
        const value = valueSelector(state);

        for (const operator of operators) {
          if (operator.item(value as ReturnType<Selector>) === OPERATOR_INTERRUPT_SYMBOL) {
            this.debug(decorator, `Decorator "${createdDecorator.displayName}" interrupted by "${operator.displayName}" operator`);

            return state;
          }
        }

        const decoratedState = decorator(state);

        this.debug(decorator, `Decorator "${createdDecorator.displayName}" ran`);

        if (decoratedState !== state) {
          this.debug(decorator, `Decorator "${createdDecorator.displayName}" changed state`);
        }

        return decoratedState;
      },
      operators,
      displayName: DEFAULT_DISPLAY_NAME,
    };

    return createdDecorator;
  }

  /**
   * Adds reducer to store
   *
   * @param reducer Created reducer
   */
  public addReducer(reducer: TCreatedReducer<State>): void {
    if (this._createdReducers.has(reducer)) {
      throw new Error(this.getMessage(`Reducer "${reducer.displayName}" already added`));
    }

    this._createdReducers.add(reducer);

    this.debug(reducer, `Reducer "${reducer.displayName}" added`);
  }

  /**
   * Removes reducer from store
   *
   * @param reducer Created reducer
   */
  public removeReducer(reducer: TCreatedReducer<State>): void {
    this._createdReducers.delete(reducer);

    this.debug(reducer, `Reducer "${reducer.displayName}" removed`);
  }

  /**
   * Adds decorator to store
   *
   * @param decorator Created decorator
   * @param conditionSelector Optional parameter.
   * When not provided decorator will work constantly
   * When provided decorator will work when selector returns "true" and not when selector returns "false"
   */
  public addDecorator(decorator: TCreatedDecorator<State, TExplicitAny>, conditionSelector?: TSelector<State, boolean>): void {
    if (this._createdDecorators.has(decorator)) {
      throw new Error(this.getMessage(`Decorator "${decorator.displayName}" already added`));
    }

    decorator.operators.forEach((it) => {
      it.reset();
    });

    let condition: null | TDecoratorCondition<State> = null;

    if (conditionSelector) {
      condition = {
        selector: conditionSelector,
        last: false,
      };
    }

    this._createdDecorators.set(decorator, condition);

    this.debug(decorator, `Decorator "${decorator.displayName}" added`);
  }

  /**
   * Removes decorator from store
   *
   * @param decorator Created decorator
   */
  public removeDecorator(decorator: TCreatedDecorator<State, TExplicitAny>): void {
    this._createdDecorators.delete(decorator);

    this.debug(decorator, `Decorator "${decorator.displayName}" removed`);
  }

  private runReducers(state: State, action: TAction): State {
    let nextState = state;

    for (const reducer of this._createdReducers) {
      if (reducer.actionTypes.includes(action.type)) {
        nextState = reducer.item(nextState, action);
      }
    }

    return nextState;
  }

  private runDecorators(state: State): State {
    /**
     * The maximum allowable number of cycles (so as not to consider the cycle infinite) is selected empirically
     */
    const maxCyclesCount = 20;

    let nextState = state;
    let flag = true;
    let cyclesCount = 0;

    const names = new Set<string>;

    while (flag) {
      if (cyclesCount > maxCyclesCount) {
        const message = this.getMessage(`Decorators provoke an infinite loop. Probably one of those is the reason - ${Array.from(names.values()).map((it) => `"${it}"`).join(" ")}`);

        if (USE_STRICT_MODE) {
          throw new Error(message);
        }

        console.error(message);

        break;
      }

      const saveName = cyclesCount > maxCyclesCount / 2;

      let stateChanged = false;

      for (const [decorator, condition] of this._createdDecorators) {
        if (condition) {
          const shouldRun = condition.selector(nextState);

          if (!shouldRun) {
            if (condition.last) {
              this.debug(decorator, `Decorator "${decorator.displayName}" stopped`);
            }

            condition.last = false;

            continue;
          }

          if (!condition.last) {
            this.debug(decorator, `Decorator "${decorator.displayName}" started`);

            decorator.operators.forEach((it) => {
              it.reset();
            });

            condition.last = true;
          }
        }

        const decoratedState = decorator.item(nextState);

        if (decoratedState !== nextState) {
          if (saveName) {
            names.add(decorator.displayName);
          }

          stateChanged = true;
        }

        nextState = decoratedState;
      }

      flag = stateChanged;

      cyclesCount++;
    }

    return nextState;
  }

  private getMessage(text: string): string {
    return `[DynamicStore] ${text}`;
  }

  private debug(source: TWithDisplayName<TExplicitAny>, text: string): void {
    if (
      !this._debugEnabled ||
      source.displayName === DEFAULT_DISPLAY_NAME
    ) {
      return;
    }

    console.log(this.getMessage(text));
  }
}

export {
  type TCreatedReducer,
  type TDecorator,
  type TCreatedDecorator,
  DynamicStore,
};

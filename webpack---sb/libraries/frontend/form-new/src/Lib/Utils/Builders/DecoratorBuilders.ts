import { type ActionCreator } from "redux";
import { getType } from "@sb/utils";
import {
  type IDecoratorDefinition,
  type IFormAction,
  type IFormActionWithFieldPath,
  type IWithFormsState,
  type TCondition,
  type TFieldPath,
  type THandler,
} from "../../Types";
import { selectFieldValue } from "../../Store";
import { isEqualPath } from "../Helpers";

/** A = action creator, S = state */
const onAction = <A extends ActionCreator<IFormAction> = ActionCreator<IFormAction>,
  S extends IWithFormsState = IWithFormsState>(
    actionCreator: A,
    handler: THandler<A, S>,
  ): IDecoratorDefinition<A, S> => {
  const type = getType(actionCreator);

  return {
    shouldRun: (action) => action.type === type,
    handler,
  };
};

/** A = action creator, S = state */
const onValueChanged = <A extends ActionCreator<IFormAction> = ActionCreator<IFormAction>,
  S extends IWithFormsState = IWithFormsState>(
    fieldPath: TFieldPath,
    decorated: THandler<A, S>,
  ): IDecoratorDefinition<A, S> => {
  const handler: THandler<A, S> = (state, action, next) => {
    const nextState = next(state, action);
    const formName = action.metadata.formName;

    const prevValue = selectFieldValue(state, formName, fieldPath);
    const nextValue = selectFieldValue(nextState, formName, fieldPath);

    if (nextValue !== prevValue) {
      return decorated(state, action, next);
    }

    return nextState;
  };

  return {
    shouldRun: () => true,
    handler,
  };
};

/** A = action creator, S = state */
const isFormFieldPath = <A extends ActionCreator<IFormActionWithFieldPath> = ActionCreator<IFormActionWithFieldPath>,
  S extends IWithFormsState = IWithFormsState>(
    ...fieldPaths: TFieldPath[]
  ): TCondition<A, S> =>
    (state, action) => fieldPaths.some((path) => isEqualPath(action.payload.fieldPath, path));

/** A = action creator, S = state */
const isFormName = <A extends ActionCreator<IFormAction> = ActionCreator<IFormAction>, S extends IWithFormsState = IWithFormsState>(
  formName: string,
): TCondition<A, S> =>
    (state, action) => action.metadata.formName === formName;

/** A = action creator, S = state */
const some = <A extends ActionCreator<IFormAction> = ActionCreator<IFormAction>, S extends IWithFormsState = IWithFormsState>(
  ...conditions: TCondition<A, S>[]
): TCondition<A, S> =>
    (...args) => conditions.some((cond) => cond(...args));

/** A = action creator, S = state */
const every = <A extends ActionCreator<IFormAction> = ActionCreator<IFormAction>, S extends IWithFormsState = IWithFormsState>(
  ...conditions: TCondition<A, S>[]
): TCondition<A, S> =>
    (...args) => conditions.every((cond) => cond(...args));

/** A = action creator, S = state */
const whenIs = <A extends ActionCreator<IFormAction> = ActionCreator<IFormAction>, S extends IWithFormsState = IWithFormsState>(
  condition: TCondition<A, S>,
  handler: THandler<A, S>,
): THandler<A, S> => (state, action, next) => {
    if (condition(state, action)) {
      return handler(state, action, next);
    }

    return next(state, action);
  };

export {
  onAction,
  onValueChanged,
  whenIs,
  every,
  some,
  isFormName,
  isFormFieldPath,
};

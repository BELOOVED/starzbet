import { assocPath, dissocPath } from "ramda";
import { type ActionCreator, type AnyAction, type Reducer } from "redux";
import { createRootReducer, getNotNil, isNotNil, type TExplicitAny, type TNullable } from "@sb/utils";
import {
  createEmptyValue,
  createPathToFieldMeta,
  createPathToFieldValue,
  createPathToForm,
  createPathToFormInitialState,
  createPathToFormMeta,
  createPathToFormState,
  globalDecoratorProvider,
  hydrateRecursive,
  KindService,
  mountDecorators,
  mountExtensions,
  ReducerError,
} from "../Utils/";
import { type IFormAction, type IWithFormsState, type TFieldPath, type TFieldValue, type THandler, type TReducer } from "../Types/";
import { isFormAction, isMountFormAction } from "../Utils/IsFormAction";
import { CONNECTED_EXTENSION_KEYS } from "../Model";
import { setFormFieldValueRecursive } from "../Utils/Core/SetFieldValueRecursive";
import {
  dropFormFieldAction,
  mountFormAction,
  resetFormAction,
  resetFormToInitialAction,
  setFieldValueAction,
  setFormFieldEmptyValueAction,
  unmountFormAction,
  updateFormInitialStateAction,
} from "./Actions";
import { selectFieldDef, selectFormConnectedExtensionKeys, selectFormInitialValue } from "./Selectors";

const EMPTY_OBJECT = {};

const setFormFieldValue = <State extends IWithFormsState>(
  state: State,
  formName: string,
  fieldPath: TFieldPath,
  value: TFieldValue,
): State => {
  const def = selectFieldDef(state, formName, fieldPath);

  if (!def) {
    throw ReducerError.typeError(fieldPath, `Field not defined in form "${formName}"`);
  }

  return setFormFieldValueRecursive<State>(
    state,
    fieldPath,
    value,
    formName,
  );
};

/** @deprecated use {@link setFormFieldValue} or {@link dropFormField} instead */
const setFieldValue = <State extends IWithFormsState>(
  state: State,
  fieldPath: TFieldPath,
  value: TNullable<TFieldValue>,
  formName: string,
): State => value === undefined
    ? dropFormField<State>(state, formName, fieldPath)
    : setFormFieldValue<State>(state, formName, fieldPath, value);

const resetForm = <S extends IWithFormsState, F extends Record<string, TExplicitAny>>(state: S, formName: string, initialState?: F) => {
  const formValuePath = createPathToFormState(formName);
  const formMetaPath = createPathToFormMeta(formName);

  const connectedExtensionKeys = selectFormConnectedExtensionKeys(state, formName);

  const nextState = assocPath(
    formValuePath,
    EMPTY_OBJECT,
    assocPath(formMetaPath, { [CONNECTED_EXTENSION_KEYS]: connectedExtensionKeys }, state),
  );

  if (isNotNil(initialState)) {
    return hydrateRecursive(nextState, formName, initialState);
  }

  return nextState;
};

const updateFormInitialState = <S extends IWithFormsState, F extends Record<string, TExplicitAny>>(
  state: S,
  formName: string,
  initialState: F,
) => {
  const formInitialStatePath = createPathToFormInitialState(formName);

  return assocPath(
    formInitialStatePath,
    initialState,
    state,
  );
};

const setFormFieldValueReducer: TReducer<typeof setFieldValueAction> = (state, action) => {
  const { payload: { fieldPath, value }, metadata: { formName } } = action;

  // TODO exclude undefined from action
  return value === undefined
    ? dropFormField(state, formName, fieldPath)
    : setFormFieldValue(state, formName, fieldPath, value);
};

const setFormFieldEmptyValueReducer: TReducer<typeof setFormFieldEmptyValueAction> = (state, action) => {
  const { payload: { fieldPath }, metadata: { formName } } = action;

  const emptyValue = createEmptyValue(KindService.getPathWithoutKinds(fieldPath))(formName)(state);

  return setFormFieldValue(state, formName, fieldPath, emptyValue);
};

const dropFormField = <State extends IWithFormsState>(
  state: State,
  formName: string,
  fieldPath: TFieldPath,
): State => {
  const fieldValuePath = createPathToFieldValue(formName, fieldPath);
  const fieldMetaPath = createPathToFieldMeta(formName, fieldPath);

  return dissocPath<State>(
    KindService.getPathWithoutKinds(fieldValuePath),
    dissocPath(KindService.getPathWithoutKinds(fieldMetaPath), state),
  );
};

/** @deprecated use {@link dropFormField} instead */
const dropField = <S extends IWithFormsState>(state: S, fieldPath: TFieldPath, formName: string) =>
  dropFormField(state, formName, fieldPath);

const dropFormFieldReducer: TReducer<typeof dropFormFieldAction> = (state, action) =>
  dropFormField(state, action.metadata.formName, action.payload.fieldPath);

const mountFormReducer: TReducer<typeof mountFormAction> = (
  state,
  {
    payload: {
      form,
      initialState,
    },
    metadata: { formName },
  },
) => {
  const nextState = assocPath(
    createPathToForm(formName),
    {
      def: form.def,
      state: EMPTY_OBJECT,
      initialState: initialState ?? EMPTY_OBJECT,
      meta: {
        [CONNECTED_EXTENSION_KEYS]: form.extensionsKeys,
      },
    },
    state,
  );

  if (isNotNil(initialState)) {
    return hydrateRecursive(nextState, formName, initialState);
  }

  return nextState;
};

const resetFormReducer: TReducer<typeof resetFormAction> = (state, action) => {
  const { payload: { initialState }, metadata: { formName } } = action;

  return resetForm(state, formName, initialState);
};

const resetFormToInitialReducer: TReducer<typeof resetFormToInitialAction> = (state, action) => {
  const { metadata: { formName } } = action;

  const initialState = selectFormInitialValue(state, formName);

  return resetForm(state, formName, initialState);
};

const updateFormInitialStateReducer: TReducer<typeof updateFormInitialStateAction> = (state, action) => {
  const { payload: { initialState }, metadata: { formName } } = action;

  return updateFormInitialState(state, formName, initialState);
};

const unmountFormReducer: TReducer<typeof unmountFormAction> = (state, { metadata: { formName } }) =>
  dissocPath(createPathToForm(formName), state);

const formsRootReducer: Reducer = (state: IWithFormsState, action: AnyAction): IWithFormsState => {
  if (!isFormAction(action)) {
    return state;
  }

  if (isMountFormAction(action)) {
    const { payload: { form }, metadata: { formName } } = action;

    // TODO^HY implement provider middleware instead
    mountDecorators(formName, form.decorators);
    mountExtensions(formName, form.hooks);
  }

  return middlewareChain<IFormAction, IWithFormsState>(
    globalDecoratorProvider<IWithFormsState>(action.metadata.formName).filter((it) => it.shouldRun(action)).map((it) => it.handler),
    createRootReducer<IWithFormsState>([
      [setFormFieldValueReducer, setFieldValueAction],
      [setFormFieldEmptyValueReducer, setFormFieldEmptyValueAction],
      [dropFormFieldReducer, dropFormFieldAction],
      [mountFormReducer, mountFormAction],
      [resetFormReducer, resetFormAction],
      [updateFormInitialStateReducer, updateFormInitialStateAction],
      [resetFormToInitialReducer, resetFormToInitialAction],
      [unmountFormReducer, unmountFormAction],
    ]),
    state,
    action,
  );
};

/** A = action creator, S = state */
const middlewareChain = <A extends IFormAction = IFormAction, S extends IWithFormsState = IWithFormsState>(
  handlers: THandler<ActionCreator<A>, S>[],
  reducer: TReducer<ActionCreator<A>, S>,
  state: S,
  action: A,
): S => doRunChain<A, S>(handlers, reducer)(state, action);

/** A = action creator, S = state */
const doRunChain = <A extends IFormAction = IFormAction, S extends IWithFormsState = IWithFormsState>(
  middlewareList: THandler<ActionCreator<A>, S>[],
  reducer: TReducer<ActionCreator<A>, S>,
  index = 0,
): TReducer<ActionCreator<A>, S> => (
    middlewareList.length < index + 1
      ? reducer
      : (state, action) => getNotNil(
        middlewareList[index],
        ["rootFormsReducer", "middlewareChain", "doRunChain"],
        "middlewareList[index]",
      )(state, action, doRunChain(middlewareList, reducer, index + 1))
  );

export {
  setFormFieldValue,
  setFieldValue,
  dropFormField,
  dropField,
  setFormFieldValueReducer,
  mountFormReducer,
  resetForm,
  resetFormReducer,
  formsRootReducer,
  middlewareChain,
};


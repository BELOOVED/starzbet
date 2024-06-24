import { type ActionCreator, type AnyAction } from "redux";
import { EMPTY, map, mergeMap, type Observable, of } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { type StateObservable } from "redux-observable";
import { type Selector } from "react-redux";
import { isCreator, isFunction, type TExplicitAny } from "@sb/utils";
import { type TWithCallManagerState } from "@sb/call-manager";
import { type IFormAction, type IFormActionWithFieldPath, type IWithFormsState, type TFieldPath, type TFormEpic } from "../Types";
import { mountFormAction, selectIsFormMounted, unmountFormAction } from "../Store";
import { selectIsFormValid } from "../Extensions/MixedSelectors";
import { type IFormConfig } from "./CreateForm";
import { isEqualPath } from "./Helpers";

/**
 * passes stream if any action of the form
 */
const isActionOfForm = <T extends IFormAction = IFormAction>(formName: string) =>
  (source: Observable<AnyAction>) => source.pipe<IFormAction>(
    filter((action): action is T => action.metadata?.formName === formName),
  );

/**
 * passes stream  if the action of the form
 */
const isFormCreator = (formName: string) => <T extends ActionCreator<IFormAction> = ActionCreator<IFormAction>>(creator: T) =>
  (source: Observable<AnyAction>) => source.pipe<AnyAction, ReturnType<T>>(
    isActionOfForm(formName),
    isCreator(creator),
  );

/**
 * passes stream if state of the form is valid
 */
const ifFormValid = (formName: string) => <Source, State extends IWithFormsState & TWithCallManagerState>(state$: StateObservable<State>) =>
  (source: Observable<Source>) => source.pipe<Source>(
    filter(() => selectIsFormValid(state$.value, formName)),
  );

/**
 * passes stream if form is mounted
 */
const ifFormMounted = (formName: string) => <T>(state$: StateObservable<IWithFormsState>) =>
  (source: Observable<T>) => source.pipe<T>(
    filter(() => selectIsFormMounted(state$.value, formName)),
  );

/**
 *  filter form actions by field paths
 */
const ifFormFieldPath = (...fieldPaths: TFieldPath[]) =>
  <T extends IFormActionWithFieldPath = IFormActionWithFieldPath>(source: Observable<T>) => source.pipe<T>(
    filter(
      ({ payload: { fieldPath } }) => fieldPaths.some((path) => isEqualPath(fieldPath, path)),
    ),
  );

/**
 *  epic factory for a form conditionally mounting/unmounting
 */
const mountUnmountFormEpicFactory = <State extends IWithFormsState>(
  predicateSelector: Selector<State, boolean>,
  formName: string,
  formConfig: IFormConfig | IFormConfig<State> | Selector<State, IFormConfig> | Selector<State, IFormConfig<State>>,
  initialState?: Record<string, TExplicitAny> | Selector<State, Record<string, TExplicitAny> | undefined>,
): TFormEpic<AnyAction, IFormAction, State> => (action$, state$) => state$.pipe(
    map(predicateSelector),
    distinctUntilChanged(),
    mergeMap((predicate) => {
      if (predicate) {
        const formInitialState = isFunction(initialState)
          ? initialState(state$.value)
          : initialState;

        const formConfigValue = isFunction(formConfig)
          ? formConfig(state$.value)
          : formConfig;

        return of(mountFormAction(formName, formConfigValue, formInitialState));
      }

      return selectIsFormMounted(state$.value, formName)
        ? of(unmountFormAction(formName))
        : EMPTY;
    }),
  );

export {
  isActionOfForm,
  isFormCreator,
  ifFormValid,
  ifFormMounted,
  ifFormFieldPath,
  mountUnmountFormEpicFactory,
};

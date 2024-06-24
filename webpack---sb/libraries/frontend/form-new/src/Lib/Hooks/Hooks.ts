import { deepEqual } from "fast-equals";
import { type ChangeEvent, useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { isEmpty, isNil, isNotNil, isVoid, type TExplicitAny, type TSelector, useParamSelector } from "@sb/utils";
import { type TWithCallManagerState } from "@sb/call-manager";
import { dropFormFieldAction, selectFieldDef, selectFieldMeta, selectFieldValue, setFieldValueAction } from "../Store";
import { type IWithFormsState, type TFieldError, type TFieldPath, type TFieldValue, type TWithBindFormName } from "../Types";
import { getHandlersFromExtensions, selectFormFieldErrors, selectIsFieldDisable } from "../Extensions";
import { globalExtensionProvider, isFormDef, isListDef, isOneOfDef, ReducerError } from "../Utils";
import { FormContext } from "../Components";
import { EDefType } from "../Model";

type TValueExtractor<Value extends TFieldValue = TFieldValue, Event = TExplicitAny> = (arg: Event) => Value | undefined;

const useFormName = () => {
  const context = useContext(FormContext);
  if (isNil(context)) {
    throw new Error("@form-new: form context is not provided, it is possible that you are using form's hooks outside \"<Form />\"");
  }

  return context.formName;
};

type TFormSelectorArgs = [formName: string, ...params: TExplicitAny[]];

type TOmitFirstFormName<F> = F extends [formName: string, ...params: infer P]
  ? P
  : never;

/** Result - return value type, State - state type */
type TFormSelector<
  State extends IWithFormsState | TWithCallManagerState = IWithFormsState & TWithCallManagerState,
  Result extends TExplicitAny = unknown,
  Args extends TFormSelectorArgs = TFormSelectorArgs,
> = ((state: State, ...args: Args) => Result) | (((state: State, ...args: TOmitFirstFormName<Args>) => Result) & TWithBindFormName)

/**
 * A hook to access the form store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * @param selector the form selector function
 * @param args selector args
 * @param equalityFn the function that will be used to determine equality
 *
 * @returns the selected state
 */

function useFormSelector<
  State extends IWithFormsState & TWithCallManagerState,
  Result extends TExplicitAny,
  Args extends TFormSelectorArgs,
>(
  selector: TFormSelector<State, Result, Args>,
  args?: TOmitFirstFormName<Args>,
  equalityFn?: (left: Result, right: Result) => boolean,
): Result {
  const formName = useFormName();
  const formSelectorParams: TFormSelectorArgs = [formName, ...args ?? []];

  return useParamSelector(selector as TSelector<State, Result, TFormSelectorArgs>, formSelectorParams, equalityFn);
}

/** value extractor for checkbox element */
const nativeCheckboxValueExtractor: TValueExtractor<boolean, ChangeEvent<HTMLInputElement>> = (event) => {
  if (isNil(event) || isNil(event.target)) {
    return undefined;
  }

  return event.target.checked;
};

/** value extractor for select element */
const nativeSelectValueExtractor: TValueExtractor<string[], ChangeEvent<HTMLSelectElement>> = (event) => {
  if (isNil(event) || isNil(event.target)) {
    return undefined;
  }

  return Array.from(event.target.selectedOptions, (option) => option.value);
};

/** value extractor for input or textarea element */
const nativeValueExtractor: TValueExtractor<string | number | boolean, ChangeEvent<HTMLInputElement | HTMLTextAreaElement>> =
  (event) => event.target.value;

/** value extractor for custom element */
const simpleValueExtractor: TValueExtractor<TFieldValue, TFieldValue> = (value) => value;

const isEvent = (v: TExplicitAny): v is ChangeEvent => Boolean((v as () => Record<string, unknown>).hasOwnProperty("preventDefault"));

interface IFormInputField<Value extends TFieldValue = TFieldValue, Error extends TFieldError = TFieldError> {
  input: {
    value: Value | undefined;
    onChange: (event: TExplicitAny) => void;
    onFocus?: (event: TExplicitAny) => void;
    onBlur?: (event: TExplicitAny) => void;
  };
  /** @deprecated use {@link selectFieldValue} selector instead */
  value: Value | undefined;
  /** @deprecated use {@link selectFieldMeta} selector instead*/
  meta: Record<string, TExplicitAny> | undefined;
  /** @deprecated use {@link selectFormFieldErrors} selector instead */
  errors: [Error, ...Error[]] | null;
  disabled: boolean;
}

const useFormInputField = <Value extends TFieldValue = TFieldValue, Error extends TFieldError = TFieldError>(
  fieldPath: TFieldPath,
  onUnmountClean = false,
  valueExtractor?: TValueExtractor,
): IFormInputField<Value, Error> => {
  const formName = useFormName();
  const value = useFormSelector(selectFieldValue.type<Value>(), [fieldPath], deepEqual);
  const def = useFormSelector(selectFieldDef, [fieldPath], deepEqual);
  const dispatch = useDispatch();

  const {
    onChange: extensionsOnChangeHandlers,
    ...otherHandlers
  } = useMemo(
    () => getHandlersFromExtensions(globalExtensionProvider, formName, fieldPath, dispatch),
    [formName, fieldPath],
  );

  if (isFormDef(def) || isListDef(def) || isOneOfDef(def)) {
    throw ReducerError.typeError(fieldPath, `The hook cannot be used with fields other than @${EDefType.field} and @${EDefType.objectField}. Current definition is @${def.type}`);
  }

  const extractor = useMemo(
    () => valueExtractor || (def.multi ? nativeSelectValueExtractor : nativeValueExtractor),
    [valueExtractor, def],
  );

  const meta = useFormSelector(selectFieldMeta, [fieldPath], deepEqual);
  const errors = useFormSelector(selectFormFieldErrors<Error>, [fieldPath], deepEqual);
  const disabled = useFormSelector(selectIsFieldDisable, [fieldPath]);

  const onChange = useCallback(
    (event: TExplicitAny) => {
      /** delegate event to extensions first */
      if (extensionsOnChangeHandlers) {
        extensionsOnChangeHandlers(event);
      }

      /** prevent native html behavior */
      if (isNotNil(event) && isEvent(event)) {
        event.preventDefault();
      }

      /** extract value if it is not null or undefined */
      let value = isVoid(event) ? event : extractor(event);

      /** replace not nil and empty value to undefined */
      value = isNotNil(value) && isEmpty(value) ? undefined : value;

      dispatch(setFieldValueAction(formName, fieldPath, value));
    },
    [extensionsOnChangeHandlers, extractor, formName, fieldPath],
  );

  useEffect(
    () => () => {
      if (onUnmountClean) {
        dispatch(dropFormFieldAction(formName, fieldPath));
      }
    },
    [],
  );

  return useMemo<IFormInputField<Value, Error>>(
    () => ({
      input: {
        value,
        onChange,
        ...otherHandlers,
      },
      value,
      meta,
      errors,
      disabled,
    }),
    [value, onChange, otherHandlers, meta, errors, disabled],
  );
};

export {
  useFormName,
  useFormSelector,
  nativeCheckboxValueExtractor,
  nativeSelectValueExtractor,
  nativeValueExtractor,
  simpleValueExtractor,
  useFormInputField,
};

export type {
  TValueExtractor,
  IFormInputField,
};

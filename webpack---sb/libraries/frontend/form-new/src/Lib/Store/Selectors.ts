import { path } from "ramda";
import { createSimpleSelector, deprecatedGetNotNil, isNotNil, type TAnyObject, type TExplicitAny } from "@sb/utils";
import {
  type IForm,
  type IFormDef,
  type IFormMeta,
  type IWithFormsState,
  type TFieldDef,
  type TFieldPath,
  type TFieldValue,
  type TFormState,
} from "../Types/";
import {
  createPathToFieldMeta,
  createPathToFieldMetaExtension,
  createPathToFieldValue,
  createPathToForm,
  createPathToFormDefinition,
  createPathToFormInitialState,
  createPathToFormMeta,
  createPathToFormMetaExtension,
  createPathToFormState,
  getDefinitionForField,
  isOneOfDef,
  KindService,
} from "../Utils/";
import { CONNECTED_EXTENSION_KEYS, FORMS_STATE } from "../Model";

const formsStateSelector = (state: IWithFormsState) => state[FORMS_STATE];

// TODO @selector
const selectMountedFormNames = createSimpleSelector(
  [formsStateSelector],
  (formsState) => Object.keys(formsState),
);

const selectForm = (s: IWithFormsState, formName: string) => {
  const value = path<IForm>(createPathToForm(formName), s);

  if (!value) {
    throw new Error(`Form with name ${formName} not found.`);
  }

  return value;
};

const selectFormDef = (s: IWithFormsState, formName: string): IFormDef => {
  const value = path<IFormDef>(createPathToFormDefinition(formName), s);

  if (!value) {
    throw new Error(`Form definition for form with name ${formName} not found.`);
  }

  return value;
};

const selectFormInitialValue = <T = TFormState>(s: IWithFormsState, formName: string): T => {
  const value = path<T>(createPathToFormInitialState(formName), s);

  if (!value) {
    throw new Error(`Form initial state for form with name ${formName} not found`);
  }

  return value;
};

selectFormInitialValue.type = <T>() => selectFormInitialValue as typeof selectFormInitialValue<T>;

const selectFormValue = <T = TFormState>(s: IWithFormsState, formName: string): T => {
  const value = path<T>(createPathToFormState(formName), s);

  if (!value) {
    throw new Error(`Form state for form with name ${formName} not found`);
  }

  return value;
};

selectFormValue.type = <T>() => selectFormValue as typeof selectFormValue<T>;

const selectFieldDef = <
  State extends IWithFormsState = IWithFormsState,
  Def extends TFieldDef<State> = TFieldDef<State>
>(state: State, formName: string, fieldPath: TFieldPath) => getDefinitionForField<State, Def>(fieldPath, formName, state);

selectFieldDef.type = <
  State extends IWithFormsState = IWithFormsState,
  Def extends TFieldDef<State> = TFieldDef<State>
>() => selectFieldDef as typeof selectFieldDef<State, Def>;

const selectFieldDefExtensions = (s: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  selectFieldDef(s, formName, fieldPath).extensions;

/** select extension in field definition  */
const selectFieldDefExtension = <T extends TAnyObject>(
  s: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
  extensionKey: string,
): T | undefined => {
  const fieldExtensions = selectFieldDefExtensions(s, formName, fieldPath);

  return fieldExtensions[extensionKey] as T | undefined;
};

selectFieldDefExtension.type = <T extends TAnyObject>() => selectFieldDefExtension as typeof selectFieldDefExtension<T>;

/** select is Field connected to extension */
const selectIsFieldConnectedToExtension = (state: IWithFormsState, formName: string, fieldPath: TFieldPath, extensionKey: string) => {
  const fieldDefExtension = selectFieldDefExtension(state, formName, fieldPath, extensionKey);

  return isNotNil(fieldDefExtension);
};

/** selector for resolver of definition kind of oneOf field */
const selectFieldDefResolver = (s: IWithFormsState, formName: string, path: TFieldPath) => {
  const fieldDef = selectFieldDef(s, formName, path);

  return isOneOfDef(fieldDef) ? fieldDef.resolver : undefined;
};

/** boolean selector of form mounted status */
const selectIsFormMounted = (state: IWithFormsState, formName: string) =>
  !!path(createPathToForm(formName), state);

const selectFieldValue = <Value extends TFieldValue>(
  s: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
): Value | undefined => {
  const pathWithoutKind = KindService.getPathWithoutKinds(fieldPath);

  const pathToState = createPathToFieldValue(formName, pathWithoutKind);

  return path<Value>(pathToState, s);
};

selectFieldValue.type = <T extends TFieldValue>() => selectFieldValue as typeof selectFieldValue<T>;

const selectFieldValueExists = (
  s: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
): boolean => !!selectFieldValue(s, formName, fieldPath);

const selectFieldNotNilValue = <T extends TFieldValue>(
  s: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
): T => deprecatedGetNotNil(selectFieldValue<T>(s, formName, fieldPath), `form field value for path ${fieldPath.join(".")}`);

selectFieldNotNilValue.type = <T extends TFieldValue>() =>
  selectFieldNotNilValue as typeof selectFieldNotNilValue<T>;

const selectFormMeta = (s: IWithFormsState, formName: string): IFormMeta => {
  const value = path<IFormMeta>(createPathToFormMeta(formName), s);

  if (!value) {
    throw new Error(`Form meta for form with name ${formName} not found`);
  }

  return value;
};

const selectFormMetaExtension = <E>(s: IWithFormsState, formName: string, extensionKey: string) =>
  path<E>(createPathToFormMetaExtension(formName, extensionKey), s);

selectFormMetaExtension.type = <E>() => selectFormMetaExtension as typeof selectFormMetaExtension<E>;

const selectFormConnectedExtensionKeys = (state: IWithFormsState, formName: string) =>
  deprecatedGetNotNil(selectFormMetaExtension<string[]>(state, formName, CONNECTED_EXTENSION_KEYS));

const selectIsFormConnectedToExtension = (state: IWithFormsState, formName: string, extensionKey: string) => {
  const connectedKeys = selectFormConnectedExtensionKeys(state, formName);

  return connectedKeys.includes(extensionKey);
};

const selectFieldMeta = <Meta extends Record<string, TExplicitAny>>(
  s: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
) => path<Meta>(createPathToFieldMeta(formName, fieldPath), s);

selectFieldMeta.type = <Meta extends Record<string, TExplicitAny>>() => selectFieldMeta as typeof selectFieldMeta<Meta>;

const selectFieldMetaExtension = <T>(
  s: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
  extensionKey: string,
): T | undefined =>
    path<T>(createPathToFieldMetaExtension(formName, fieldPath, extensionKey), s);

selectFieldMetaExtension.type = <T>() => selectFieldMetaExtension as typeof selectFieldMetaExtension<T>;

const selectIsFieldAndFormConnectedToExtension = (
  state: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
  extensionKey: string,
) => {
  const isFieldConnected = selectIsFieldConnectedToExtension(state, formName, fieldPath, extensionKey);

  if (!isFieldConnected) {
    return false;
  }

  return selectIsFormConnectedToExtension(state, formName, extensionKey);
};

export {
  formsStateSelector,
  selectMountedFormNames,
  selectFieldDef,
  selectFieldDefExtensions,
  selectFieldDefExtension,
  selectIsFieldConnectedToExtension,
  selectFieldMetaExtension,
  selectIsFieldAndFormConnectedToExtension,
  selectFieldDefResolver,
  selectFieldMeta,
  selectFieldNotNilValue,
  selectFieldValue,
  selectFieldValueExists,
  selectForm,
  selectFormDef,
  selectFormMetaExtension,
  selectFormConnectedExtensionKeys,
  selectIsFormConnectedToExtension,
  selectIsFormMounted,
  selectFormMeta,
  selectFormValue,
  selectFormInitialValue,
};

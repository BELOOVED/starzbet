import { assocPath, path } from "ramda";
import { type SyntheticEvent } from "react";
import { type Dispatch } from "redux";
import { groupBy2, isEmpty, type TExplicitAny } from "@sb/utils";
import { type IWithFormsState, type TEventHandler, type TExtensionHook, type TFieldPath } from "../Types";
import {
  createPathToFieldMetaExtension,
  createPathToFormMetaExtension,
  isFormDef,
  isListDef,
  KindService,
  pathNumberToStringCorrector,
  type TExtensionsProvider,
} from "../Utils";
import { selectFieldDef, selectFieldValue } from "../Store";

const mergeFieldExtensionValue = <T extends Record<string, TExplicitAny> = TExplicitAny>(
  state: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
  extensionKey: string,
  valuePart: T,
) => putFieldExtensionValue<T>(
  state,
  formName,
  pathNumberToStringCorrector(fieldPath),
  extensionKey,
  {
    ...path(createPathToFieldMetaExtension(formName, pathNumberToStringCorrector(fieldPath), extensionKey), state),
    ...valuePart,
  },
);

const putFieldExtensionValue = <T extends Record<string, TExplicitAny> = TExplicitAny, S extends IWithFormsState = IWithFormsState>(
  state: S,
  formName: string,
  fieldPath: TFieldPath,
  extensionKey: string,
  value: T,
) => assocPath(
    createPathToFieldMetaExtension(formName, pathNumberToStringCorrector(fieldPath), extensionKey),
    value,
    state,
  );

const putFormExtensionValue = <T extends Record<string, TExplicitAny> = TExplicitAny>(
  state: IWithFormsState,
  formName: string,
  extensionKey: string,
  value: T,
) => assocPath(
    createPathToFormMetaExtension(formName, extensionKey),
    value,
    state,
  );

//get all paths from form def
const getFormFieldPaths = (
  state: IWithFormsState,
  formName: string,
  parentPath: TFieldPath = [],
  getPathsFromEmptyList = false,
): TFieldPath[] => {
  const paths: TFieldPath[] = [];
  const fieldDef = selectFieldDef(state, formName, parentPath);

  paths.push(parentPath);

  if (isListDef(fieldDef)) {
    let fieldValues = selectFieldValue<unknown[]>(state, formName, parentPath) ?? [];

    if (isEmpty(fieldValues) && getPathsFromEmptyList) {
      fieldValues = ["createIndexInEmptyList"];
    }

    fieldValues.forEach((_, index) => {
      paths.push(...getFormFieldPaths(state, formName, [...parentPath, index]));
    });
  }

  if (isFormDef(fieldDef)) {
    Object.entries(fieldDef.fields)
      .forEach(([key, _]) => {
        paths.push(...getFormFieldPaths(state, formName, [...parentPath, key]));
      });
  }

  return paths;
};

//get hooks from provider and pass path to field
const getHooksWithPathFromProvider = (provider: TExtensionsProvider, formName: string, path: TFieldPath, dispatch: Dispatch) => {
  if (!provider(formName)) {
    return [];
  }

  return provider(formName)
    .flatMap((hook: TExtensionHook) => Object.entries(hook(path, formName, dispatch)));
};

const createHandlersFromHooks = (handlersArray: [string, TEventHandler][]) => {
  const supported = ["onFocus", "onBlur", "onChange"];
  const byType = groupBy2((it) => it[0], handlersArray);

  Object.keys(byType)
    .forEach((type) => {
      if (!supported.includes(type)) {
        throw new Error(`Handler: '${type}' not supported now.`);
      }
    });

  return Object.fromEntries(
    Object.entries(byType)
      .map(([type, handlers]) => [
        type,
        (event: SyntheticEvent) => {
          handlers.forEach((it) => it[1](event));
        },
      ]),
  );
};

const getHandlersFromExtensions = (provider: TExtensionsProvider, formName: string, path: TFieldPath, dispatch: Dispatch) =>
  createHandlersFromHooks(getHooksWithPathFromProvider(provider, formName, KindService.getPathWithoutKinds(path), dispatch));

export {
  mergeFieldExtensionValue,
  putFieldExtensionValue,
  putFormExtensionValue,
  getFormFieldPaths,
  getHooksWithPathFromProvider,
  createHandlersFromHooks,
  getHandlersFromExtensions,
};

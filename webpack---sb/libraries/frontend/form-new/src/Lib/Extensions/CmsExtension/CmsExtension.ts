import { omit, path } from "ramda";
import { type ActionCreator } from "redux";
import { isNil, isNotEmpty, isNotNil, isVoid, type TExplicitAny, type TNullable } from "@sb/utils";
import { createPathToFormMetaExtension, objectField, onAction, type TFormExtension } from "../../Utils/";
import { dropFormField, formActionType, selectFieldValue, setFormFieldValue } from "../../Store/";
import {
  type IDecoratorDefinition,
  type IFormAction,
  type IWithFormsState,
  type TFieldDef,
  type TFieldPath,
  type THandler,
} from "../../Types";
import { CONNECTED_EXTENSION_KEYS } from "../../Model/ConnectedExtensionKeys";
import { validateFormFieldsHandler } from "../ValidationExtension/";
import { VALIDATION_EXTENSION_KEY } from "../ValidationExtension/Model/ValidationExtensionKey";
import { CMS_EXTENSION_KEY } from "./Model/CMSExtensionKey";

const FILES_FIELD = "@files";

type TFile = {
  id: string;
  mimeType: string;
  size: number;
  hash: string;
  originName: string;
  pathToFile: string;
  signature: string;
}

interface IFileValue {
  fileToken: TFile;
  progress?: number;
  success?: boolean;
  error?: TExplicitAny;
}

interface IFileField {
  fileId: string;
}

interface IFilesState {
  [key: string]: TFile;
}

const getFileInputValue = (
  state: IWithFormsState,
  formName: string,
  fieldValue: TNullable<IFileField>,
  optionalPath: TFieldPath = [],
): IFileValue[] | undefined => {
  const correctPath = [...optionalPath, FILES_FIELD];
  if (isVoid(fieldValue)) {
    return undefined;
  }

  const { fileId } = fieldValue;

  if (isVoid(fileId)) {
    return undefined;
  }

  const files = selectFieldValue<IFilesState>(state, formName, correctPath);

  if (isNil(files) || isNil(files[fileId])) {
    return undefined;
  }

  const fileToken = files[fileId];

  return [{ fileToken }] as IFileValue[];
};
const changeBlockWrapperAction = (formName: string, def: TFieldDef, path: TFieldPath) => ({
  type: formActionType("CMS_EXTENSION/CHANGE_BLOCK_WRAPPER"),
  payload: { def, path },
  metadata: { formName },
});

const setFileAction = (formName: string, fieldPath: TFieldPath, value: IFileValue[] | undefined, optionalPath: TFieldPath = []) => ({
  type: formActionType("CMS_EXTENSION/SET_FILE"),
  payload: { fieldPath, value, optionalPath },
  metadata: { formName },
});
const setFileHandler: THandler<typeof setFileAction> = (state, action, next) => {
  let nextState = next(state, action);
  const { payload: { fieldPath, value, optionalPath }, metadata: { formName } } = action;
  const correctPath = [...optionalPath, FILES_FIELD];
  const fileField = selectFieldValue<IFileField>(state, formName, fieldPath);
  const files = selectFieldValue<IFilesState>(state, formName, correctPath);
  if (isNotNil(value) && isNotEmpty(value)) {
    const fileToken = value[0]?.fileToken as TFile;
    const newId = `${Date.now()}:${fileToken.originName}`;

    const newFileField = { fileId: newId };
    nextState = setFormFieldValue(nextState, formName, fieldPath, newFileField);

    if (isNotNil(fileField) && isNotEmpty(fileField)) {
      const newFiles = omit([fileField.fileId], { ...files, [newId]: fileToken });
      nextState = setFormFieldValue(nextState, formName, correctPath, newFiles);
    }

    const connectedExtensions = path<string[]>(createPathToFormMetaExtension(formName, CONNECTED_EXTENSION_KEYS), nextState);

    if (isNotNil(connectedExtensions) && isNotEmpty(connectedExtensions) && connectedExtensions.includes(VALIDATION_EXTENSION_KEY)) {
      nextState = validateFormFieldsHandler(
        nextState,
        action,
        next,
      );
    }

    return nextState;
  }

  if (isNotNil(fileField) && isNotEmpty(fileField)) {
    const newFiles = omit([fileField.fileId], files);
    nextState = setFormFieldValue(nextState, formName, correctPath, newFiles);
  }

  nextState = setFormFieldValue(nextState, formName, fieldPath, {});

  const connectedExtensions = path<string[]>(createPathToFormMetaExtension(formName, CONNECTED_EXTENSION_KEYS), nextState);

  if (isNotNil(connectedExtensions) && isNotEmpty(connectedExtensions) && connectedExtensions.includes(VALIDATION_EXTENSION_KEY)) {
    nextState = validateFormFieldsHandler(
      nextState,
      action,
      next,
    )
    ;
  }

  return nextState;
};

const changeBlockWrapperHandler: THandler<typeof changeBlockWrapperAction> = (state, action, next) => {
  let nextState = next(state, action);
  const { payload: { path }, metadata: { formName } } = action;
  nextState = dropFormField(nextState, formName, path);

  return nextState;
};
const CMSDecorators: IDecoratorDefinition[] = [
  onAction(setFileAction, setFileHandler),
  onAction(changeBlockWrapperAction, changeBlockWrapperHandler),
];

const CMSExtension = <State extends IWithFormsState = IWithFormsState>(
  base: Parameters<TFormExtension<State>>[0],
): ReturnType<TFormExtension<State>> => ({
    ...base,
    def: {
      ...base.def,
      fields: {
        ...base.def.fields,
        [FILES_FIELD]: objectField(),
      },
    },
    decorators: [
      ...base.decorators,
      ...CMSDecorators,
    ] as IDecoratorDefinition<ActionCreator<IFormAction>, State>[], // TODO^HY improve types
    extensionsKeys: [
      ...base.extensionsKeys,
      CMS_EXTENSION_KEY,
    ],
  });

export {
  FILES_FIELD,
  setFileAction,
  changeBlockWrapperAction,
  getFileInputValue,
  CMSExtension,
};

export type {
  TFile,
  IFilesState,
  IFileField,
  IFileValue,
};

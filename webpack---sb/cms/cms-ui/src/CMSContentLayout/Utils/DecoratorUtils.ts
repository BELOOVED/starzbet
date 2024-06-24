import { type ActionCreator } from "redux";
import { FILES_FIELD, type IFormActionWithFieldPath, type ISetFieldValueAction, type TCondition } from "@sb/form-new";
import { isNil } from "@sb/utils";
import { type TFileToUpload } from "@sb/file-service-extension";

// match path if pre last element in arr equal with fieldPathPreLastElem
const isNumberOfPathAreEqual = (pathElement: string | number, number: number): TCondition<ActionCreator<IFormActionWithFieldPath>> =>
  (_, action) => action.payload.fieldPath.at(number) === pathElement;

const isNotTextEditorFile = (): TCondition<ActionCreator<ISetFieldValueAction<TFileToUpload[]>>> =>
  (_, action) => action.payload.fieldPath.at(-1) !== FILES_FIELD;

const isDeletedImage =(): TCondition<ActionCreator<ISetFieldValueAction>> => (state, action) =>
  (action.payload.fieldPath.at(-1) === "image" || action.payload.fieldPath.at(-2) === "image") &&
  isNil(action.payload.value);

export {
  isNumberOfPathAreEqual,
  isNotTextEditorFile,
  isDeletedImage,
};

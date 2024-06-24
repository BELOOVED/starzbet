import { type TFieldPath } from "../../Types";
import { FORMS_STATE } from "../../Model";
import { pathNumberToStringCorrector, pathStringToNumberCorrector } from "../Helpers";

/** (FORM_NAME) => [FORMS_STATE, FORM_NAME] */
const createPathToForm = (formName: string) => [FORMS_STATE, formName];

/** (FORM_NAME) => [FORMS_STATE, FORM_NAME, def] */
const createPathToFormDefinition = (formName: string) =>
  [...createPathToForm(formName), "def"];

/** (FORM_NAME, ['list', '0', 'b']) => [FORMS_STATE, FORM_NAME, def, list, 0, b] */
const createPathToFieldDefinition = (formName: string, path: TFieldPath) =>
  [...createPathToForm(formName), "def", ...path];

/** (FORM_NAME, ['list', '0', 'b'], EXTENSION_KEY) => [FORMS_STATE, FORM_NAME, def, list, 0, b, extensions, EXTENSION_KEY] */
const createPathToFieldDefinitionExtension = (formName: string, fieldPath: TFieldPath, extensionKey: string) =>
  [...createPathToFieldDefinition(formName, fieldPath), "extensions", extensionKey];

/** (FORM_NAME) => [FORMS_STATE, FORM_NAME, state] */
const createPathToFormState = (formName: string) =>
  [...createPathToForm(formName), "state"];

/** (FORM_NAME) => [FORMS_STATE, FORM_NAME, initialState] */
const createPathToFormInitialState = (formName: string) =>
  [...createPathToForm(formName), "initialState"];

/** (FORM_NAME, ['list', '0', 'b']) => [FORMS_STATE, FORM_NAME, state, list, 0, b] */
const createPathToFieldValue = (formName: string, fieldPath: TFieldPath) =>
  [...createPathToFormState(formName), ...pathStringToNumberCorrector(fieldPath)];

/** (FORM_NAME) => [FORMS_STATE, FORM_NAME, meta] */
const createPathToFormMeta = (formName: string) =>
  [...createPathToForm(formName), "meta"];

/** (FORM_NAME, EXTENSION_KEY) => [FORMS_STATE, FORM_NAME, meta, EXTENSION_KEY] */
const createPathToFormMetaExtension = (formName: string, extensionKey: string) =>
  [...createPathToFormMeta(formName), extensionKey];

/** (FORM_NAME, ['list', 0, 'b']) => [FORMS_STATE, FORM_NAME, meta, list, '0', b] */
const createPathToFieldMeta = (formName: string, fieldPath: TFieldPath) =>
  [...createPathToFormMeta(formName), ...pathNumberToStringCorrector(fieldPath)];

/** (FORM_NAME, ['list', '0', 'b'], EXTENSION_KEY) => [FORMS_STATE, FORM_NAME, meta, list, '0', b, EXTENSION_KEY] */
const createPathToFieldMetaExtension = (formName: string, fieldPath: TFieldPath, extensionKey: string) =>
  [...createPathToFieldMeta(formName, fieldPath), extensionKey];

export {
  createPathToForm,
  createPathToFormDefinition,
  createPathToFieldDefinition,
  createPathToFieldDefinitionExtension,
  createPathToFormState,
  createPathToFormInitialState,
  createPathToFieldValue,
  createPathToFormMeta,
  createPathToFormMetaExtension,
  createPathToFieldMeta,
  createPathToFieldMetaExtension,
};

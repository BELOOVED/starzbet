import { getNotNil } from "@sb/utils";
import { type IWithFormsState, type THandler } from "../../Types";
import { selectFieldValue } from "../../Store";
import { putFieldExtensionValue } from "../ExtensionsUtils";
import { getFormFieldsPathsByExtensionKey } from "../ExtensionsSelectors";
import { DISABLE_EXTENSION_KEY } from "./Model/DisableExtensionKey";
import { type setFieldDisableAction } from "./DisableActions";
import { type TFieldDisableMeta } from "./DisableExtension";
import { selectFieldDefDisableExtension } from "./DisableSelectors";

/** put a new disable status in a meta of field */
const setFieldDisableHandler: THandler<typeof setFieldDisableAction> = (state, action, next) => {
  const nextState = next(state, action);
  const { payload: { fieldPath, isDisable }, metadata: { formName } } = action;

  return putFieldExtensionValue<TFieldDisableMeta>(
    nextState,
    formName,
    fieldPath,
    DISABLE_EXTENSION_KEY,
    { isDisable },
  );
};

const runFormFieldsDisableCheck = <State extends IWithFormsState>(state: State, formName: string) => {
  let nextState = state;

  const fieldPaths = getFormFieldsPathsByExtensionKey(nextState, formName, DISABLE_EXTENSION_KEY);

  fieldPaths.forEach((fieldPath) => {
    const disableExtension = getNotNil(
      selectFieldDefDisableExtension(nextState, formName, fieldPath),
      ["DisableReducers.ts", "runFormDisableCheckHandler", "selectFieldDefDisableExtension"],
      "disableExtension",
    );

    const value = selectFieldValue(nextState, formName, fieldPath);
    const isDisable = disableExtension.disablePredicate(nextState, formName, fieldPath, value);

    nextState = putFieldExtensionValue<TFieldDisableMeta, State>(
      nextState,
      formName,
      fieldPath,
      DISABLE_EXTENSION_KEY,
      { isDisable },
    );
  });

  return nextState;
};

/** run disable checkers and put a new disable status in meta for each field */
const runFormFieldsDisableCheckHandler: THandler = (state, action, next) => {
  const nextState = next(state, action);
  const { metadata: { formName } } = action;

  return runFormFieldsDisableCheck(nextState, formName);
};

export {
  setFieldDisableHandler,
  runFormFieldsDisableCheckHandler,
  runFormFieldsDisableCheck,
};

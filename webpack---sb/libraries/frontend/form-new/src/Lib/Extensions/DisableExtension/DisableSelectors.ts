import { type IWithFormsState, type TFieldPath } from "../../Types";
import { selectFieldDefExtension, selectFieldMetaExtension } from "../../Store";
import { DISABLE_EXTENSION_KEY } from "./Model/DisableExtensionKey";
import { type TFieldDisableMeta, type TWithDisablePredicate } from "./DisableExtension";

/** select disable extension in field definition  */
const selectFieldDefDisableExtension = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  selectFieldDefExtension<TWithDisablePredicate>(state, formName, fieldPath, DISABLE_EXTENSION_KEY);

/** select disable meta of field from meta state */
const selectFieldMetaDisableExtension = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  selectFieldMetaExtension<TFieldDisableMeta>(state, formName, fieldPath, DISABLE_EXTENSION_KEY);

/**
 * select field boolean result of disable status from meta
 * return false if disable status does not exist
 * */
const selectIsFieldDisable = (state: IWithFormsState, formName: string, fieldPath: TFieldPath): boolean => {
  const disableExtension = selectFieldMetaDisableExtension(state, formName, fieldPath);

  if (disableExtension) {
    return disableExtension.isDisable;
  }

  return false;
};

export {
  selectFieldDefDisableExtension,
  selectFieldMetaDisableExtension,
  selectIsFieldDisable,
};

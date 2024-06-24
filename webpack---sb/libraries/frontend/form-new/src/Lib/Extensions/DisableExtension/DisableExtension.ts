import { type ActionCreator } from "redux";
import { type TNullable } from "@sb/utils";
import { onAction, type TFormExtension } from "../../Utils/";
import {
  dropFormFieldAction,
  formMountedAction,
  resetFormAction,
  setFormFieldEmptyValueAction,
  setFieldValueAction,
} from "../../Store/";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState, type TFieldPath, type TFieldValue } from "../../Types/";
import { DISABLE_EXTENSION_KEY } from "./Model/DisableExtensionKey";
import { runFormFieldsDisableCheckAction, setFieldDisableAction } from "./DisableActions";
import { runFormFieldsDisableCheckHandler, setFieldDisableHandler } from "./DisableReducers";

type TDisablePredicate<
  State extends IWithFormsState = IWithFormsState,
  Value extends TFieldValue = TFieldValue
> = (state: State, formName: string, fieldPath: TFieldPath, value: TNullable<Value>) => boolean;

type TFieldDisableMeta = {
  isDisable: boolean;
}

type TWithDisablePredicate<
  State extends IWithFormsState = IWithFormsState,
  Value extends TFieldValue = TFieldValue
> = {
  disablePredicate: TDisablePredicate<State, Value>;
}

const withDisableCheck = <
  State extends IWithFormsState = IWithFormsState,
  Value extends TFieldValue = TFieldValue
>(disablePredicate: TDisablePredicate<State, Value>): Record<string, TWithDisablePredicate<State, Value>> => ({
    [DISABLE_EXTENSION_KEY]: { disablePredicate },
  });

const disableDecorators: IDecoratorDefinition[] = [
  onAction(formMountedAction, runFormFieldsDisableCheckHandler),
  onAction(resetFormAction, runFormFieldsDisableCheckHandler),
  onAction(runFormFieldsDisableCheckAction, runFormFieldsDisableCheckHandler),
  onAction(setFieldDisableAction, setFieldDisableHandler),
  onAction(setFieldValueAction, runFormFieldsDisableCheckHandler),
  onAction(setFormFieldEmptyValueAction, runFormFieldsDisableCheckHandler),
  onAction(dropFormFieldAction, runFormFieldsDisableCheckHandler),
];

const disableExtension = <State extends IWithFormsState = IWithFormsState>(
  base: Parameters<TFormExtension<State>>[0],
): ReturnType<TFormExtension<State>> => ({
    ...base,
    decorators: [
      ...base.decorators,
      ...disableDecorators,
    ] as IDecoratorDefinition<ActionCreator<IFormAction>, State>[], // TODO^HY improve types
    extensionsKeys: [
      ...base.extensionsKeys,
      DISABLE_EXTENSION_KEY,
    ],
  });

export {
  withDisableCheck,
  disableExtension,
};

export type { TFieldDisableMeta, TDisablePredicate, TWithDisablePredicate };

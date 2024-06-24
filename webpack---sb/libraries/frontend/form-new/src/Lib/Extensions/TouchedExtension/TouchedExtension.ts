import { type ActionCreator, type Dispatch } from "redux";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState, type TFieldPath, type THandler } from "../../Types/";
import { onAction, type TFormExtension } from "../../Utils/";
import { mergeFieldExtensionValue } from "../ExtensionsUtils";
import { TOUCHED_EXTENSION_KEY } from "./Model/TouchedExtensionKey";
import { onBlurAction, onFocusAction } from "./TouchedActions";

interface ITouchedMeta {
  focus: boolean;
  blur?: boolean;
}

const useToggleOnFocus = (fieldPath: TFieldPath, formName: string, dispatch: Dispatch) => {
  const onFocus = () => dispatch(onFocusAction(fieldPath, formName));

  const onBlur = () => dispatch(onBlurAction(fieldPath, formName));

  return { onFocus, onBlur };
};

const baseHandler = (value: ITouchedMeta): THandler<typeof onFocusAction | typeof onBlurAction> =>
  (state, action, next) => {
    const nextState = next(state, action);

    return mergeFieldExtensionValue<ITouchedMeta>(
      nextState,
      action.metadata.formName,
      action.payload.fieldPath,
      TOUCHED_EXTENSION_KEY,
      value,
    );
  };

const onFocusHandler = baseHandler({ focus: true });
const onBlurHandler = baseHandler({ focus: false, blur: true });

const touchedDecorators: IDecoratorDefinition[] = [
  onAction(onFocusAction, onFocusHandler),
  onAction(onBlurAction, onBlurHandler),
];

const touchedExtension = <State extends IWithFormsState = IWithFormsState>(
  base: Parameters<TFormExtension<State>>[0],
): ReturnType<TFormExtension<State>> => ({
    ...base,
    decorators: [
      ...base.decorators,
      ...touchedDecorators,
    ] as IDecoratorDefinition<ActionCreator<IFormAction>, State>[], // TODO^HY improve types
    hooks: [
      ...base.hooks,
      useToggleOnFocus,
    ],
    extensionsKeys: [
      ...base.extensionsKeys,
      TOUCHED_EXTENSION_KEY,
    ],
  });

export { touchedExtension };

export type { ITouchedMeta };

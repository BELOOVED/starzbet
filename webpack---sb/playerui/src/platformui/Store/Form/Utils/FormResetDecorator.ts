import { type ActionCreator } from "redux";
import { type IDecoratorDefinition, type IFormAction, isFormName, onAction, resetForm, resetFormAction, whenIs } from "@sb/form-new";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type TFormInitialStateSelector } from "../Model/TFormInitialStateSelector";

type TDecorator = IDecoratorDefinition<ActionCreator<IFormAction>, TPlatformAppState>

const formResetDecorator = (formName: string, initialStateSelector: TFormInitialStateSelector): TDecorator =>
  onAction(
    resetFormAction,
    whenIs(
      isFormName(formName),
      (state, action, next) => resetForm(
        next(state, action),
        action.metadata.formName,
        initialStateSelector(state),
      ),
    ),
  );

const EMPTY_DECORATOR_LIST: TDecorator[] = [];

export type { TDecorator };
export { formResetDecorator, EMPTY_DECORATOR_LIST };

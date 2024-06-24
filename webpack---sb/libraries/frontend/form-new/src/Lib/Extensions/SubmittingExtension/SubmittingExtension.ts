import { type ActionCreator } from "redux";
import { type TWithCallManagerState } from "@sb/call-manager";
import { resetFormAction, submitFormAction, unmountFormAction } from "../../Store/";
import { onAction, type TFormExtension } from "../../Utils/";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState } from "../../Types";
import { SUBMITTING_EXTENSION_KEY } from "./Model/SubmittingExtensionKey";
import { submitFormFailedAction, submitFormResetAction, submitFormSucceedAction } from "./SubmittingActions";
import { submitFormFailedHandler, submitFormHandler, submitFormResetHandler, submitFormSucceedHandler } from "./SubmittingReducers";

const submittingDecorators: IDecoratorDefinition<ActionCreator<IFormAction>, IWithFormsState & TWithCallManagerState>[] = [
  onAction(submitFormAction, submitFormHandler),
  onAction(resetFormAction, submitFormResetHandler),
  onAction(unmountFormAction, submitFormResetHandler),
  onAction(submitFormResetAction, submitFormResetHandler),
  onAction(submitFormFailedAction, submitFormFailedHandler),
  onAction(submitFormSucceedAction, submitFormSucceedHandler),
];

const submittingExtension = <State extends IWithFormsState = IWithFormsState>(
  base: Parameters<TFormExtension<State>>[0],
): ReturnType<TFormExtension<State>> => ({
    ...base,
    decorators: [
      ...base.decorators,
      ...submittingDecorators,
    ] as IDecoratorDefinition<ActionCreator<IFormAction>, State>[], // TODO^HY improve types
    extensionsKeys: [
      ...base.extensionsKeys,
      SUBMITTING_EXTENSION_KEY,
    ],
  });

export { submittingExtension };


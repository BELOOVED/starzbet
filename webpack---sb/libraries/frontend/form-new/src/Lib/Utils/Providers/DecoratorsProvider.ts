import { type ActionCreator } from "redux";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState } from "../../Types";

const __newFormsDecorators: Record<string, IDecoratorDefinition[]> = {};

const globalDecoratorProvider = <
  S extends IWithFormsState = IWithFormsState
// @ts-ignore TODO^HY implement storage
>(formName: string): IDecoratorDefinition<ActionCreator<IFormAction>, S>[] => __newFormsDecorators[formName] || [];

const mountDecorators = (formName: string, decorators: IDecoratorDefinition[]) => {
  __newFormsDecorators[formName] = decorators;
};

const unmountDecorators = (formName: string) => {
  delete __newFormsDecorators[formName];
};

export {
  globalDecoratorProvider,
  mountDecorators,
  unmountDecorators,
};


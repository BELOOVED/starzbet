import { EMPTY } from "rxjs";
import { type ActionCreator, type AnyAction } from "redux";
import type { IDecoratorDefinition, IFormAction, IFormDef, IWithFormsState, TExtensionHook, TFormEpic } from "../Types";

type TFormExtension<State extends IWithFormsState = IWithFormsState> = (
  form: IFormConfig<State>,
  extensions: TFormExtension<State>[],
) => IFormConfig<State>;

interface ICreateFormParams<State extends IWithFormsState = IWithFormsState> {
  form: IFormDef<State>;
  epics?: TFormEpic<IFormAction, AnyAction, State>[];
  decorators?: IDecoratorDefinition<ActionCreator<IFormAction>, State>[];
  extensions?: TFormExtension<State>[];
  hooks?: TExtensionHook[];
}

interface IFormConfig<State extends IWithFormsState = IWithFormsState> {
  def: IFormDef<State>;
  epics: TFormEpic<IFormAction, AnyAction, State>[];
  decorators: IDecoratorDefinition<ActionCreator<IFormAction>, State>[];
  hooks: TExtensionHook[];
  extensionsKeys: string[];
}

type TCreateForm<State extends IWithFormsState = IWithFormsState> = (
  params: ICreateFormParams<State>,
) => IFormConfig<State>

const createForm = <State extends IWithFormsState>({
  form,
  decorators = [],
  epics = [() => EMPTY],
  extensions = [],
  hooks = [],
}: Parameters<TCreateForm<State>>[0]): ReturnType<TCreateForm<State>> => {
  const base: IFormConfig<State> = {
    def: form,
    decorators,
    epics,
    hooks,
    extensionsKeys: [],
  };

  return extensions.reduce((result, extension) => extension(result, extensions), base);
};

export { createForm };

export type {
  TFormExtension,
  IFormConfig,
  ICreateFormParams,
};

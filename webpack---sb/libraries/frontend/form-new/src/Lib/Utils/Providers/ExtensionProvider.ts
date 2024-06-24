import { type TExplicitAny } from "@sb/utils";
import { type TExtensionHook } from "../../Types";

type TExtensionsProvider = (formName: string) => TExtensionHook[];

const __extensions: Record<string, TExtensionHook[]> = {};

const globalExtensionProvider: TExtensionsProvider = (formName) => __extensions[formName] || [];

const mountExtensions = (formName: string, extensions: TExplicitAny[]) => {
  __extensions[formName] = extensions;
};

const unmountExtensions = (formName: string) => {
  delete __extensions[formName];
};

export {
  globalExtensionProvider,
  mountExtensions,
  unmountExtensions,
};

export type { TExtensionsProvider };


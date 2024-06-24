import { type ELocale, type TExplicitAny, type TNullable } from "@sb/utils";

const extractErrorMessage = (error: TExplicitAny): string => (error?.message || error?.error || error || "Unknown error") as string;

const initializingAction = (id: TNullable<string>) => ({
  type: "@INITIALIZING",
  payload: { id },
});

const mountedAction = (id: TNullable<string>) => ({
  type: "@MOUNTED",
  payload: { id },
});

const initializedAction = (id: TNullable<string>, dimensions: { width: number; height: number; }) => ({
  type: "@INITIALIZED",
  payload: { id, dimensions },
});

const aboutToUnmountAction = (id: TNullable<string>) => ({
  type: "@ABOUT_TO_UNMOUNT",
  payload: { id },
});

const setLocaleAction = (id: string, locale: ELocale) => ({
  type: "@SET_LOCALE",
  payload: { id, locale },
});

const errorAction = (id: TNullable<string>, error: TExplicitAny) => ({
  type: "@ERROR",
  payload: { id, message: extractErrorMessage(error) },
});

const crashedAction = (id: TNullable<string>, error: TExplicitAny) => ({
  type: "@CRASHED",
  payload: { message: extractErrorMessage(error) },
});

const internalErrorAction = (message: string) => ({
  type: "@INTERNAL_ERROR",
  payload: { message },
});

export {
  initializingAction,
  mountedAction,
  initializedAction,
  aboutToUnmountAction,
  setLocaleAction,
  errorAction,
  crashedAction,
  internalErrorAction,
};

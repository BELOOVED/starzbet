import { ESportCode, isSupportedSportCode, type TSportCode } from "@sb/widget-core/ESportCode";
import { ELocale, isNil, type TExplicitAny } from "@sb/utils";
import { type IRpcClient } from "@sb/network-bus/RpcClient";
import {
  aboutToUnmountAction,
  crashedAction,
  errorAction,
  initializedAction,
  initializingAction,
  mountedAction,
  setLocaleAction,
} from "./Actions";
import type { IWidgetController, TDispatch } from "./Types";
import { EWidgetThemes } from "./EWidgetThemes";
import { EWidgetCodes } from "./EWidgetCodes";
import { EWidgetControllerModes } from "./EWidgetControllerModes";
import { composeUsingSeparator } from "./ComposeUsingSeparator";

const loadScript = (url: string) => new Promise((resolve, reject) => {
  const scriptElement = document.createElement("script");

  scriptElement.src = `${url}.js`;
  scriptElement.onload = resolve;
  scriptElement.onerror = reject;

  document.body.appendChild(scriptElement);
});

const fetchWidgetController = async (origin: string): Promise<void> => {
  const base = `${origin}/widget-controller`;

  const response = await fetch(`${base}/version.txt?${Date.now()}`);

  const version = await response.text();

  const url = `${base}/${version}`;

  await loadScript(url);
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const getWidgetController = (): TExplicitAny => window[composeUsingSeparator("widget", "widget-controller")]?.WidgetController;

const createWidgetController = async (
  origin: string,
  mode: EWidgetControllerModes,
  onDispatch: TDispatch,
  rpcClient: IRpcClient,
): Promise<IWidgetController> => {
  if (isNil(getWidgetController())) {
    await fetchWidgetController(origin);
  }

  const WidgetController = getWidgetController();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return new WidgetController(origin, mode, onDispatch, rpcClient) as IWidgetController;
};

export type { TSportCode };
export {
  type IWidgetController,
  EWidgetControllerModes,
  EWidgetThemes,
  EWidgetCodes,
  ESportCode,
  ELocale,
  isSupportedSportCode,
  initializingAction,
  mountedAction,
  initializedAction,
  aboutToUnmountAction,
  setLocaleAction,
  errorAction,
  crashedAction,
  createWidgetController,
};

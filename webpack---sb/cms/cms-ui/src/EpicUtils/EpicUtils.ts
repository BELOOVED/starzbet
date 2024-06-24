import { filter } from "rxjs/operators";
import { switchMap, take } from "rxjs";
import { combineEpics } from "redux-observable";
import { createCallCommandEpicFactory, type getRpcClientFactory } from "@sb/adminui-utils";
import { getNotNil, isArray, type TNullable, type TSelector, withParams } from "@sb/utils";
import { callManagerSucceededSelector, type TCallManagerSymbolPair } from "@sb/call-manager";
import { type TKey } from "@sb/translates/cmsui/Keys";
import { type IWithFormsState } from "@sb/form-new";
import { type TCmsAppEpic, type TCmsAppEpicDependencies, type TDefCreatorFn } from "../Model/TCmsAppEpic";
import { type ICMSContext } from "../Context/CMSContext";
import { type TCmsAppState } from "../Model/TCmsAppState";

const callCommandEpicFactory = createCallCommandEpicFactory<TCmsAppState, TKey, TCmsAppEpicDependencies<TCmsAppState>>();

const getFormName = <State extends IWithFormsState>(deps: TCmsAppEpicDependencies<State>): string =>
  getNotNil(deps.formName, ["CMS", "getFormName"], "doesn't have form name in epic deps");

const getDefCreatorFn =<State extends IWithFormsState> (deps: TCmsAppEpicDependencies<State>): TDefCreatorFn<State> =>
  getNotNil(deps.defCreatorFn, ["CMS", "getDefCreatorFn"], "doesn't have defCreatorFn in epic deps");

const getCMSContext = <State extends IWithFormsState>(deps: TCmsAppEpicDependencies<State>) =>
  getNotNil<TNullable<ICMSContext>>(deps.context, ["CMS", "context"], "doesn't have CMSContext in epic deps");

const getEnvCode = <State extends IWithFormsState>(deps: TCmsAppEpicDependencies<State>): string =>
  getNotNil(deps.envCode, ["CMS", "getEnvCode"], "doesn't have EnvCode in epic deps");

const getRpcClient = <State extends IWithFormsState>(deps: TCmsAppEpicDependencies<State>): ReturnType<typeof getRpcClientFactory> =>
  getNotNil(deps.getRpcClient, ["CMS", "getRpcClient"], "doesn't have Rpc Client  in epic deps");

const getShowDeletedVariablesSelector =
  <State extends IWithFormsState>(deps: TCmsAppEpicDependencies<State>): TSelector<TCmsAppState, boolean> =>
    getNotNil(
      deps.showDeletedVariablesSelector,
      ["CMS", "showDeletedVariablesSelector"],
      "doesn't have showDeletedVariablesSelector  in epic deps",
    );

const whenDataLoadedEpic = (...loaderSymbols: TCallManagerSymbolPair[]) =>
  (...epics: TCmsAppEpic[]): TCmsAppEpic => (action$, state$, deps) => {
    const selectors = loaderSymbols.map(
      (it) =>
        isArray(it)
          ? withParams(callManagerSucceededSelector, ...it)
          : withParams(callManagerSucceededSelector, it),
    );

    return state$.pipe(
      filter((state) => selectors.every((selector) => selector(state))),
      take(1),
      switchMap(() => combineEpics(...epics)(action$, state$, deps)),
    );
  };

export {
  getShowDeletedVariablesSelector,
  getEnvCode,
  whenDataLoadedEpic,
  getRpcClient,
  callCommandEpicFactory,
  getCMSContext,
  getDefCreatorFn,
  getFormName,
};

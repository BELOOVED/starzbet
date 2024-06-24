import { type Action, applyMiddleware, createStore, type Reducer, type Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createEpicMiddleware } from "redux-observable";
import { ELocale } from "@sb/utils/ELocale";
import { type IRpcClient } from "@sb/network-bus/RpcClient";
import { type IMetadata } from "@sb/network-bus/Model";
import { withAdminPanelInitialState } from "@sb/adminui-panel";
import { getNotNil, IS_SERVER } from "@sb/utils";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { type IPredefinedContext } from "../../@types/IPredefinedContext";
import { mergeTranslates } from "../Utils/TranslateMapUtils";
import { replaceKeyExpressions } from "../Utils/ReplaceKeyExpression";
import { getTranslator, translatorSelector } from "../Hooks/UseTranslator";
import { type TFunc } from "../Components/T/TFunc";
import { getPlainTranslate } from "../Components/T/GetPlainTranslate";
import { type IProviders } from "../Providers/IProviders";
import type { IAllTranslateProviderRequest } from "../Providers/AllTranslatesProvider";
import { selectTranslateMode } from "./Selectors";
import { requestChangeLocaleAction, updateRequestsAction, updateTranslatesAction } from "./Actions";
import { rootReducer } from "./RootReducer";
import { type IState, type TCreateInitialState } from "./CreateInitialState";
import { collectTranslatesByContext } from "./CollectTranslatesByContext";
import { createTranslateKeyMap } from "./CreateTranslateKeyMap";
import { rootEpic } from "./Epics/RootEpic";
import { type ITranslateDeps } from "./Epics/TTranslateEpic";
import { type ITranslateListener, type TTranslateListenerCallback } from "./ITranslateListener";
import { panelLocalStorage } from "./Epics/PanelLocalStorage";

type TTranslateModeListener = (enabled: boolean) => void;

type TTranslateMode = {
  enabled: boolean;
  addListener: (listener: TTranslateModeListener) => void;
};

interface IControlFactoryOptions {
  currentLocale: ELocale;
  fallbackLocale: ELocale;
  locales: ELocale[];
  providers: IProviders;
  commitClient: IRpcClient;
  predefinedTranslates?: TLocaleResource[];
  translateListeners?: ITranslateListener[];
  keyExpressions?: Record<string, string>;
}

interface IControlState {
  currentLocale: ELocale;
  fallbackLocale: ELocale;
  locales: ELocale[];
  predefinedContext: IPredefinedContext;
  predefinedTranslates: TLocaleResource[];
  translateListeners: ITranslateListener[];
  keyExpressions: Record<string, string>;
}

type TControlChangeLanguage = (locale: ELocale, callback?: () => void) => void;

interface IControl {
  translateMode: TTranslateMode;
  changeLanguage: TControlChangeLanguage;
  addTranslateListener: (keys: string[], callback: TTranslateListenerCallback) => void;
  state: IControlState;
  store: Store<IState>;
  plain: TFunc<string>;
  providers: IProviders;
  //todo refactor type
  configure: (config:{ metadata: IMetadata; } | null) => void;
  //updated All Translate methods
  addAllTsRequests: (requests: IAllTranslateProviderRequest[]) => void;
  addPredefinedTranslates: (localeResources: TLocaleResource[]) => void;
}

const createTranslateMode = (store: Store<IState>) => {
  let enabled = selectTranslateMode(store.getState());

  const listeners = new Set<TTranslateModeListener>();

  store.subscribe(() => {
    const curEnabled = selectTranslateMode(store.getState());

    if (curEnabled !== enabled) {
      listeners.forEach((listener) => {
        listener(curEnabled);
      });
    }

    enabled = curEnabled;
  });

  return {
    enabled,
    addListener: (listener: TTranslateModeListener) => {
      listeners.add(listener);
    },
  };
};

const getNormalizedPredefinedTranslates = (
  translates: TLocaleResource[],
  keyExpressions: Record<string, string>,
) => translates.map(
  (localeResource) => Object.entries(localeResource)
    .reduce<TLocaleResource>(
      (acc, [locale, translates]) => {
        acc[locale as ELocale] = replaceKeyExpressions(translates, keyExpressions);

        return acc;
      },
      {},
    ),
);

const createControlFactory = (createState: TCreateInitialState, predefinedContext: IPredefinedContext = {}) => (
  {
    currentLocale = ELocale.en_US,
    fallbackLocale = ELocale.en_US,
    locales = [ELocale.en_US, ELocale.tr_TR, ELocale.el_EL],
    commitClient,
    providers,
    predefinedTranslates = [],
    keyExpressions = {},
  }: IControlFactoryOptions,
): IControl => {
  const normalizedPredefinedTranslates = getNormalizedPredefinedTranslates(
    predefinedTranslates,
    keyExpressions,
  );

  const state: IControlState = {
    currentLocale,
    fallbackLocale,
    locales,
    predefinedTranslates: normalizedPredefinedTranslates,
    predefinedContext,
    keyExpressions,
    translateListeners: [],
  };

  const epicDeps = {
    allTranslates: providers.allTranslates,
    lineTranslates: providers.lineTranslates,
    translateListeners: state.translateListeners,
    commitClient,
    metadata: {},
  };

  const epicMiddleware = createEpicMiddleware<Action, Action, IState, ITranslateDeps>({ dependencies: epicDeps });

  const translates = collectTranslatesByContext(
    predefinedContext,
    normalizedPredefinedTranslates.reduce(mergeTranslates, {}),
  );

  const initState: IState = createState({
    translates,
    translateKeyMap: createTranslateKeyMap(translates),
    currentLocale,
    fallbackLocale,
    locales,
    predefinedContext,
    keyExpressions,
    ...withAdminPanelInitialState(panelLocalStorage),
  });

  const store = createStore(
    rootReducer as Reducer<IState>,
    initState,
    !IS_SERVER
      ? composeWithDevTools(
        applyMiddleware(epicMiddleware),
      )
      : undefined,
  );

  if (!IS_SERVER) {
    epicMiddleware.run(rootEpic);
  }

  const translateMode = createTranslateMode(store);

  return {
    translateMode,
    changeLanguage: (locale, callback = () => undefined) => {
      state.currentLocale = locale;

      store.dispatch(requestChangeLocaleAction(locale));

      callback();
    },
    addTranslateListener: (keys: string[], callback: TTranslateListenerCallback) => {
      state.translateListeners.push({ keys, callback });
    },
    plain: (translateKey, options) => {
      const state = store.getState();

      const {
        translates,
        currentLocale,
        fallbackLocale,
        uncommitted,
        keyExpressions,
        locales,
      } = translatorSelector(state);

      return getPlainTranslate(
        getTranslator(translates, currentLocale, fallbackLocale, uncommitted, keyExpressions, locales),
      )(translateKey, options);
    },
    store,
    state,
    providers,
    configure: (config: { metadata: IMetadata;} | null) => {
      epicDeps.metadata = config?.metadata || {};
    },
    addAllTsRequests: (requests) => {
      getNotNil(providers.allTranslates, ["createControlFactory"], "providers.allTranslates")
        .updateRequests(requests);

      store.dispatch(updateRequestsAction());
    },
    addPredefinedTranslates: (translates) => {
      state.predefinedTranslates = getNormalizedPredefinedTranslates(
        [...translates, ...predefinedTranslates],
        keyExpressions,
      );

      store.dispatch(
        updateTranslatesAction({
          snapshot: getNormalizedPredefinedTranslates(
            translates,
            keyExpressions,
          ).reduce(mergeTranslates, {}),
        }),
      );
    },
  };
};

export type {
  IControlFactoryOptions,
  IControlState,
  TControlChangeLanguage,
  IControl,
};

export { createControlFactory };

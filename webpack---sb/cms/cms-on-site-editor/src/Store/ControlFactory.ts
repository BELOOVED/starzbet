import { type Action, applyMiddleware, createStore, type Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createEpicMiddleware } from "redux-observable";
import { BehaviorSubject } from "rxjs";
import { type IMetadata } from "@sb/network-bus/Model";
import { translates as cmsTranslates } from "@sb/translates/cmsui/Translates";
import { translates as sharedTranslates } from "@sb/translates/shared/Translates";
import { Container } from "@sb/di";
import { FRAMEWORK_GRAPHQL_SERVICE_ID } from "@sb/adminui-framework";
import { type TAnyObject } from "@sb/utils";
import { cmsEditorSelectors } from "./Selectors";
import { rootReducer } from "./Reducers";
import {
  type ICMSControl,
  type ICMSEditorState,
  type IControlFactoryOptions,
  type IEditorDeps,
  type TEditMode,
  type TEditModeListener,
} from "./Model";
import { createRootEpic } from "./Epics/CreateRootEpic";
import { createCMSEditorState } from "./CreateInitialState";
import { setConfiguredAction } from "./Actions";

const createEditMode = (store: Store<ICMSEditorState>): TEditMode => {
  let enabled = cmsEditorSelectors.cmsEditorMode(store.getState());

  const listeners = new Set<TEditModeListener>();

  store.subscribe(() => {
    const curEnabled = cmsEditorSelectors.cmsEditorMode(store.getState());
    if (curEnabled !== enabled) {
      listeners.forEach((listener) => {
        listener(curEnabled);
      });
    }

    enabled = curEnabled;
  });

  return {
    enabled,
    addListener: (listener: TEditModeListener) => {
      listeners.add(listener);
    },
  };
};

const metadataSubject = new BehaviorSubject<TAnyObject>({});

const cmsControlFactory = ({
  commitClient,
  context,
  fileConfig,
  graphQLClient,
  translatorControl,
  theme,
  env,
  createGQL,
}: IControlFactoryOptions): ICMSControl => {
  const dependencies:IEditorDeps = {
    getRpcClient: () => commitClient,
    metadata: {},
    container: new Container(),
  };

  const cmsGql = createGQL(
    () => store.dispatch,
    () => new Promise((resolve) => resolve([dependencies.metadata, null] as const)),
  );

  dependencies.container.set(
    FRAMEWORK_GRAPHQL_SERVICE_ID,
    cmsGql,
  );

  const epicMiddleware = createEpicMiddleware<
    Action, Action, ICMSEditorState, IEditorDeps
  >(
    { dependencies },
  );

  const storeArgs = [
    rootReducer,
    createCMSEditorState(fileConfig, theme),
    composeWithDevTools(
      applyMiddleware(
        epicMiddleware,
      ),
    ),
  ] as const;

  const store: Store<ICMSEditorState> = createStore(...storeArgs);
  const translateMode = createEditMode(store);
  const getDispatch = () => store.dispatch;

  epicMiddleware.run(createRootEpic(context, metadataSubject, getDispatch, env));

  return {
    editMode: translateMode,
    store,
    configure: (config: {metadata:IMetadata;}| null) => {
      dependencies.metadata = config?.metadata ?? {};

      store.dispatch(setConfiguredAction(config !== null));
      if(config){
        graphQLClient.bypassCache = true;
        cmsGql.bypassCache = true;
        translatorControl.addPredefinedTranslates([{
          en_US: {
            ...cmsTranslates.en_US,
            ...sharedTranslates.en_US,
          },
        }]);

        const clientNs = `cmsui.${theme}}`;

        translatorControl.addAllTsRequests([{
          clientNs,
          keys: [clientNs],
        }]);

        metadataSubject.next(config.metadata);
      }

      metadataSubject.next({});
    },
  };
};

export {
  cmsControlFactory,
};

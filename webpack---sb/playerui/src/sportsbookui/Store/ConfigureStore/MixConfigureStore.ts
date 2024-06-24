import { type Action, applyMiddleware, createStore, type Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createEpicMiddleware, type EpicMiddleware } from "redux-observable";
import { type History } from "@sb/react-router-compat";
import { type IControl } from "@sb/translator";
import { type ICMSControl } from "@sb/cms-on-site-editor";
import { type Client } from "@sb/graphql-client";
import { PlatformHttpApi } from "../../../platformui/Api/PlatformHttpApi";
import { createGraphQLClient } from "../../../platformui/Api/GraphQLClient";
import { FileServerApi } from "../../../platformui/Api/FileServerApi";
import { createRpcGlobalErrorHandler } from "../../../common/GlobalErrorHandler/CreateRpcGlobalErrorHandler";
import { type TContent } from "../../../platformui/Store/CMS/Model/CmsModel";
import { mixRootReducer } from "../../../common/Store/Root/Reducer/MixRootReducer";
import { type IMixAppEpicDependencies } from "../../../common/Store/Root/Epics/TMixAppEpic";
import { mixRootEpic } from "../../../common/Store/Root/Epics/MixRootEpic";
import { HttpApi } from "../../Api/HttpApi";
import { catchErrorMiddleware } from "../Middleware/CatchErrorMiddleware";
import { createMixInitialState, type TMixAppState, type TPreloadedState } from "../CreateMixInitialState";
import { mixDynamicStore } from "../MixDynamicStore";
import { appErrorAction } from "../App/AppActions";

type TMixConfigureStore<CmsContent extends TContent = TContent> = (
  history: History,
  translateControl: IControl,
  createCmsControl: (gql: Client) => ICMSControl,
  preloadedState?: TPreloadedState<CmsContent>,
) => readonly [Store<TMixAppState, Action>, FileServerApi, ICMSControl]

const mixConfigureStore = (): TMixConfigureStore => (
  history,
  translateControl,
  createCmsControl,
  preloadedState,
) => {
  const getDispatch = () => store.dispatch;

  const fileServerApi = new FileServerApi(createRpcGlobalErrorHandler(getDispatch));

  const graphQLClient = createGraphQLClient(getDispatch);

  const cmsControl = createCmsControl(graphQLClient);

  const epicMiddleware: EpicMiddleware<Action, Action, TMixAppState, IMixAppEpicDependencies> = createEpicMiddleware({
    dependencies: {
      platformHttpApi: new PlatformHttpApi(createRpcGlobalErrorHandler(getDispatch)),
      fileServerApi,
      graphQLClient,
      sportsbookHttpApi: new HttpApi(createRpcGlobalErrorHandler(getDispatch)),
      translateControl,
      history,
      getDispatch,
    },
  });

  // @ts-expect-error
  const store = createStore(
    mixDynamicStore.decorateStoreReducer(
      // @ts-expect-error
      mixRootReducer(),
    ),
    // @ts-expect-error
    createMixInitialState(history, preloadedState),
    composeWithDevTools(
      applyMiddleware(
        epicMiddleware,
        catchErrorMiddleware,
      ),
    ),
  );

  window.error = () => store.dispatch(appErrorAction());

  epicMiddleware.run(mixRootEpic);

  return [store, fileServerApi, cmsControl] as const;
};

export { mixConfigureStore, type TMixConfigureStore };

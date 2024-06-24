import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { EPostfix } from "@sb/sdk";
import { type IWithRouterState } from "@sb/router";
import { type TEpicWithHttpApi } from "../../../../common/Store/Root/Epics/TEpicWithHttpApi";
import { type IWithDebugModeState } from "../../DebugMode/DebugModeState";
import { type IWithFeed } from "../FeedState";
import { FeedDiffProvider } from "./FeedDiffProtocol/FeedDiffProvider";
import { ErisFeedDiffProtocol } from "./FeedDiffProtocol/ErisFeedDiffProtocol";
import { FeedSnapshotProvider } from "./FeedDiffProtocol/FeedSnapshotProvider";
import { KironFeedDiffProtocol } from "./FeedDiffProtocol/KironFeedDiffProtocol";

type TState = IWithFeed & IWithRouterState & IWithDebugModeState;

type TEpicFactory = (connection: IWebsocketConnection, index: number) => TEpicWithHttpApi<TState>

const erisFeedEpic: TEpicFactory = (connection, index) =>
  (action$, state$, dependencies) => {
    const snapshotProvider = new FeedSnapshotProvider(dependencies.sportsbookHttpApi, EPostfix.erisgaming, index);

    const diffProvider = new FeedDiffProvider(dependencies.sportsbookHttpApi, connection, EPostfix.erisgaming);

    const feedProtocol = new ErisFeedDiffProtocol(snapshotProvider, diffProvider, index > 0);

    return feedProtocol.runEpic(action$, state$, dependencies);
  };

const kironFeedEpic: TEpicFactory = (connection, index) =>
  (action$, state$, dependencies) => {
    const snapshotProvider = new FeedSnapshotProvider(dependencies.sportsbookHttpApi, EPostfix.kiron, index);

    const diffProvider = new FeedDiffProvider(dependencies.sportsbookHttpApi, connection, EPostfix.kiron);

    const feedProtocol = new KironFeedDiffProtocol(snapshotProvider, diffProvider, index > 0);

    return feedProtocol.runEpic(action$, state$, dependencies);
  };

export type { TEpicFactory };

export { kironFeedEpic, erisFeedEpic };

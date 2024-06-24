import { EMPTY, merge, mergeMap, switchMap, takeUntil } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { ESportKind } from "@sb/betting-core/ESportKind";
import { sportsMap } from "@sb/betting-core/SportsMap";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { EPostfix } from "@sb/sdk";
import { hasOwnProperty } from "@sb/utils";
import { type TEpicWithHttpApi } from "../../../../common/Store/Root/Epics/TEpicWithHttpApi";
import { type IWithFeed } from "../FeedState";
import {
  anyLineIsReadySelector,
  eventSubSubscribersSelector,
  eventSubSubscriptionsSelector,
  selectEventById,
} from "../Selectors/FeedSelectors";
import { EventSnapshotProvider } from "./EventDiffProtocol/EventSnapshotProvider";
import { EventDiffProvider } from "./EventDiffProtocol/EventDiffProvider";
import { EventDiffProtocol } from "./EventDiffProtocol/EventDiffProtocol";

const doSubscribePerEvent = (
  connection: IWebsocketConnection,
  eventId: string,
): TEpicWithHttpApi<IWithFeed> => (action$, state$, dependencies) => {
  const event = selectEventById(state$.value, eventId);

  if (!event) {
    return EMPTY;
  }

  const code = sportIdToCodeMap[event.sportId];
  if (!code) {
    return EMPTY;
  }

  const sportKind = sportsMap[code].kind;
  if (!sportKind) {
    return EMPTY;
  }

  const postfix = sportKind === ESportKind.virtual ? EPostfix.kiron : EPostfix.erisgaming;

  const snapshotProvider = new EventSnapshotProvider(dependencies.sportsbookHttpApi, postfix, eventId);

  const diffProvider = new EventDiffProvider(connection, postfix, eventId);

  const eventProtocol = new EventDiffProtocol(snapshotProvider, diffProvider, eventId);

  return eventProtocol.runEpic(action$, state$, dependencies).pipe(
    takeUntil(
      state$.pipe(
        map(eventSubSubscribersSelector),
        distinctUntilChanged(),
        filter((subscribers) => !hasOwnProperty(subscribers, eventId)),
      ),
    ),
  );
};

const mapSubscription = (prevSubscriptions: Record<string, boolean>) => (subscriptions: Record<string, boolean>) => {
  const nextSubscriptions = [] as string[];

  const currentSubscriptions = Object.keys(subscriptions);

  currentSubscriptions.forEach((sub) => {
    if (prevSubscriptions[sub]) {
      return;
    }

    nextSubscriptions.push(sub);

    prevSubscriptions[sub] = true;
  });

  Object.keys(prevSubscriptions).forEach((sub) => {
    if (!currentSubscriptions.includes(sub)) {
      delete prevSubscriptions[sub];
    }
  });

  return nextSubscriptions;
};

const subscribePerEventEpic = (connection: IWebsocketConnection): TEpicWithHttpApi<IWithFeed> =>
  (action$, state$, dependencies) => {
    const prevSubscriptions = {};

    return state$.pipe(
      map(anyLineIsReadySelector),
      distinctUntilChanged(),
      filter(Boolean),
      switchMap(() => state$.pipe(
        map(eventSubSubscriptionsSelector),
        distinctUntilChanged(),
        map(mapSubscription(prevSubscriptions)),
        mergeMap((nextSubscriptions) => merge(
          ...nextSubscriptions.map((eventId) => doSubscribePerEvent(connection, eventId)(action$, state$, dependencies)),
        )),
      )),
    );
  };
export { subscribePerEventEpic };

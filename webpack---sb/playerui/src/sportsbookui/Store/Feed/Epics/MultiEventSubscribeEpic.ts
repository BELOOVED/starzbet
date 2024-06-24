import { EMPTY, from } from "rxjs";
import { isNotNil, isRecordOfString } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { feedAddEventSubscriberAction, feedRemoveEventSubscriberAction } from "../FeedActions";
import { eventSubscriberEnum } from "../Model/EventSubscriberEnum";

const multiViewMatchOptions = {
  path: [
    routeMap.live.multiView,
    routeMap.esport.live.multiView,
  ],
  exact: true,
};

const getNotIncludes = (sourceArr: string[], targetArr: string[]) => sourceArr.reduce<string[]>(
  (acc, eventId) => {
    if (!targetArr.includes(eventId)) {
      acc.push(eventId);
    }

    return acc;
  },
  [],
);
const multiEventSubscribeEpic: TAppEpic = (action$, state$, dependencies) => {
  let activeEventSubscribers: string[] = [];

  return routerEpic({
    name: "multiEventSubscribe",
    match: getMatch<{ events: string; }>(multiViewMatchOptions),
    onStart: ({ params: { events } }) => () => {
      const eventsFromParams = JSON.parse(events);

      if (!isRecordOfString(eventsFromParams)) {
        return EMPTY;
      }

      const eventIdsFromParams = Object.values(eventsFromParams).filter(isNotNil);
      const newSubscribers = getNotIncludes(eventIdsFromParams, activeEventSubscribers);
      const inActiveSubscribers = getNotIncludes(activeEventSubscribers, eventIdsFromParams);

      const actions = [
        ...newSubscribers.map((eventId) => feedAddEventSubscriberAction(eventSubscriberEnum.multiview, eventId)),
        ...inActiveSubscribers.map((eventId) => feedRemoveEventSubscriberAction(eventSubscriberEnum.multiview, eventId)),
      ];

      activeEventSubscribers = activeEventSubscribers.filter((eventId) => !inActiveSubscribers.includes(eventId));
      activeEventSubscribers.push(...newSubscribers);

      return from(actions);
    },
    onStop: () => () => {
      const actions = activeEventSubscribers.map((eventId) => feedRemoveEventSubscriberAction(eventSubscriberEnum.multiview, eventId));
      activeEventSubscribers = [];

      return from(actions);
    },
    shouldRestart: restartOnParamsChanged,
  })(action$, state$, dependencies);
};

export { multiEventSubscribeEpic };

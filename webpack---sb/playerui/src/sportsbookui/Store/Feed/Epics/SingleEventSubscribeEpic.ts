import { of } from "rxjs";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { feedAddEventSubscriberAction, feedRemoveEventSubscriberAction } from "../FeedActions";
import { eventSubscriberEnum } from "../Model/EventSubscriberEnum";

const eventMatchOptions = {
  path: [
    routeMap.preLive.event,
    routeMap.esport.preLive.event,
    routeMap.live.event,
    routeMap.esport.live.event,
  ],
  exact: true,
};
const singleEventSubscribeEpic: TAppEpic = (action$, state$, dependencies) => {
  let prevEventId: string;

  return routerEpic({
    name: "singleEventSubscribe",
    match: getMatch<{ eventId: string; }>(eventMatchOptions),
    onStart: ({ params: { eventId } }) => () => {
      prevEventId = eventId;

      return of(feedAddEventSubscriberAction(eventSubscriberEnum.singleEvent, eventId));
    },
    onStop: () => () => of(feedRemoveEventSubscriberAction(eventSubscriberEnum.singleEvent, prevEventId)),
    shouldRestart: restartOnParamsChanged,
  })(action$, state$, dependencies);
};

export { singleEventSubscribeEpic };

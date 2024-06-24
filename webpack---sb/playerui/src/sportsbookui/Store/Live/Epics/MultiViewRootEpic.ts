import { map, switchMap } from "rxjs/operators";
import { EMPTY, filter, from, merge, of } from "rxjs";
import { combineEpics } from "redux-observable";
import { routerEpic, routerLocationPathnameSelector } from "@sb/router";
import { matchPath, type TMatch } from "@sb/react-router-compat";
import { getNotNil, isCreator, isUnknownObject } from "@sb/utils";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { Logger } from "../../../../common/Utils/Logger";
import { pushLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { getLocalizedPathWithFallback } from "../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedPathWithFallback";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { isEsport } from "../../Feed/Model/Sport";
import { sportIdByEventIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { localeSelector } from "../../Locale/LocaleSelector";
import {
  addEventToMultiViewAction,
  addLiveViewAction,
  addNewEventInMultiViewAction,
  completeInsertEventInMultiViewAction,
  completeSwapEventInMultiViewAction,
  insertEventToMultiViewAction,
  moveDockedEventToMultiViewAction,
  removeDockToSideEventAction,
  removeEventFromMultiViewAction,
  removeLiveViewAction,
  selectEventByMultiviewMenuAction,
  selectEventForSwapModeAction,
  showLiveViewAction,
  startInsertEventInMultiViewAction,
  startMultiViewAction,
  swapEventInMultiViewAction,
} from "../LiveActions";
import { getMultiViewEventIdList } from "../Model/GetMultiViewEvents";
import {
  availableEventForSwapByIdSelector,
  existInMultiViewByEventIdSelector,
  insertableEventIdSelector,
  liveMultiViewSelector,
  moveDockedEventSelector,
  sizeMultiViewEventsSelector,
  swappableEventIdSelector,
} from "../Selectors/LiveSelectors";

const multiViewOptions = {
  path: [routeMap.live.multiView, routeMap.esport.live.multiView],
};

const eventKey = "eventId";

const eventKeyToPlace = (key: string) => Number(key.replace(eventKey, ""));

interface IParams {
  events: string;
}

const getEventsFromParams = (arg: TMatch<IParams>) => {
  try {
    const parsedEvents = JSON.parse(arg.params.events);

    return isUnknownObject(parsedEvents) ? parsedEvents : null;
  } catch (e) {
    Logger.warn.app("getEventsFromParams", e);

    return null;
  }
};

const miss = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== i + 1) {
      return i + 1;
    }
  }

  return undefined;
};

const getPlace = (places: number[]) => {
  if (places.length === 0) {
    return 1;
  }

  if (places.length === 1) {
    return (places[0] as number) > 1 ? 1 : 2;
  }

  return miss(places) || (places.at(-1) as number) + 1;
};

// FIXME @DECORATOR ALL IN FILE

const showLiveViewEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(showLiveViewAction),
  switchMap(() => {
    const multiView = liveMultiViewSelector(state$.value);

    const ids = Object.keys(multiView).filter((id) =>
      getNotNil(multiView[id], ["MultiViewRootEpic"], "showLiveView").showed);

    const events = ids.reduce(
      (acc, id, index) => ({
        ...acc,
        [`${eventKey}${index + 1}`]: id,
      }),
      {},
    );

    const pathname = routerLocationPathnameSelector(state$.value);

    const esport = matchPath(pathname, { path: routeMap.esport.root });

    const path = esport
      ? routeMap.esport.live.multiView
      : routeMap.live.multiView;

    const params = {
      events: JSON.stringify(events),
    };

    const locale = localeSelector(state$.value);

    return of(pushLocalized(locale, path, params));
  }),
);

const addEventToMultiViewEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(addEventToMultiViewAction),
  switchMap(({ payload: { eventId } }) => {
    const pathname = routerLocationPathnameSelector(state$.value);
    const locale = localeSelector(state$.value);

    const match = matchPath<IParams>(pathname, multiViewOptions);

    if (!match) {
      const sportId = sportIdByEventIdSelector(state$.value, eventId);

      const path = isEsport(sportId) ? routeMap.esport.live.multiView : routeMap.live.multiView;

      return of(pushLocalized(locale, path, { events: JSON.stringify({ [`${eventKey}1`]: eventId }) }));
    }

    const events = getEventsFromParams(match);

    if (!events || Object.values(events).includes(eventId)) {
      return EMPTY;
    }

    const place = getPlace(
      Object.keys(events)
        .reduce(
          (arr: number[], key) => {
            if (events[key]) {
              const newItem = eventKeyToPlace(key);
              arr.push(newItem);
            }

            return arr;
          },
          [],
        ),
    );

    if (!place) {
      return EMPTY;
    }

    const nextEvents = { ...events, [`${eventKey}${place}`]: eventId };

    return of(
      pushLocalized(
        locale,
        getLocalizedPathWithFallback(match.path),
        { events: JSON.stringify(nextEvents) },
      ),
    );
  }),
);

const removeEventFromMultiViewEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(removeEventFromMultiViewAction),
  switchMap(({ payload: { eventId } }) => {
    const pathname = routerLocationPathnameSelector(state$.value);

    const match = matchPath<IParams>(pathname, multiViewOptions);

    if (!match) {
      return EMPTY;
    }

    const events = getEventsFromParams(match);

    const nextEvents = events
      ? Object.keys(events).reduce(
        (acc, key) => {
          if (events[key] === eventId) {
            return acc;
          }

          return { ...acc, [key]: events[key] };
        },
        {},
      )
      : {};

    const locale = localeSelector(state$.value);

    return of(
      pushLocalized(
        locale,
        getLocalizedPathWithFallback(match.path),
        { events: JSON.stringify(nextEvents) },
      ),
    );
  }),
);

const doInsertEventToMultiViewEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(insertEventToMultiViewAction),
  switchMap(({ payload: { eventId, place } }) => {
    const pathname = routerLocationPathnameSelector(state$.value);

    const match = matchPath<IParams>(pathname, multiViewOptions);

    if (!match) {
      return EMPTY;
    }

    const events = getEventsFromParams(match);

    const nextEvents = { ...events, [`${eventKey}${place}`]: eventId };

    const locale = localeSelector(state$.value);

    return of(
      pushLocalized(
        locale,
        getLocalizedPathWithFallback(match.path),
        { events: JSON.stringify(nextEvents) },
      ),
    );
  }),
);

const restoreLiveView = (params: IParams) => () => from(getMultiViewEventIdList(params)).pipe(
  filter(Boolean),
  map((id) => addLiveViewAction(id, true)),
);

const leaveRoute: TAppEpic = (action$, state$) => {
  const multiView = liveMultiViewSelector(state$.value);

  return merge(
    of(completeSwapEventInMultiViewAction()),
    of(completeInsertEventInMultiViewAction()),
    ...Object.keys(multiView).map((id) => of(removeLiveViewAction(id))),
  );
};

const onMultiViewPageEpic = routerEpic({
  name: "onMultiViewPage",
  match: getMatch<IParams>(multiViewOptions),
  onStart: ({ params }) => restoreLiveView(params),
  onStop: () => leaveRoute,
  shouldRestart: restartOnParamsChanged,
});

const swapEventInMultiViewEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(swapEventInMultiViewAction),
  switchMap(({ payload: { eventId, place } }) => {
    const swappableEventId = swappableEventIdSelector(state$.value);

    const pathname = routerLocationPathnameSelector(state$.value);

    const match = matchPath<IParams>(pathname, multiViewOptions);

    if (!match) {
      return EMPTY;
    }

    const events = getEventsFromParams(match);

    if (!events) {
      return EMPTY;
    }

    const swappableKey = Object.keys(events).find((key) => events[key] === swappableEventId);

    if (!swappableKey) {
      return EMPTY;
    }

    const nextEvents = {
      ...events,
      [`${eventKey}${place}`]: swappableEventId,
      [swappableKey]: eventId,
    };
    const locale = localeSelector(state$.value);

    return merge(
      of(pushLocalized(locale, getLocalizedPathWithFallback(match.path), { events: JSON.stringify(nextEvents) })),
      of(completeSwapEventInMultiViewAction()),
    );
  }),
);

const selectEventForSwapModeEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(selectEventForSwapModeAction),
  switchMap(({ payload: { eventId, place } }) => {
    const availableEventForSwap = availableEventForSwapByIdSelector(null)(state$.value);

    if (availableEventForSwap) {
      return of(swapEventInMultiViewAction(eventId, place));
    }

    const moving = moveDockedEventSelector(state$.value);

    const insertableEventId = insertableEventIdSelector(state$.value);

    if (moving) {
      return of(removeDockToSideEventAction(insertableEventId));
    }

    return from(
      [
        insertEventToMultiViewAction(insertableEventId, place),
        completeInsertEventInMultiViewAction(),
        removeLiveViewAction(eventId),
      ],
    );
  }),
);

const addNewEventInMultiViewEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(addNewEventInMultiViewAction),
  switchMap(({ payload: { place } }) => {
    const availableEventForSwap = availableEventForSwapByIdSelector(null)(state$.value);

    if (availableEventForSwap) {
      return EMPTY;
    }

    const insertableEventId = insertableEventIdSelector(state$.value);

    return merge(
      of(insertEventToMultiViewAction(insertableEventId, place)),
      of(completeInsertEventInMultiViewAction()),
    );
  }),
);

const moveDockedEventToMultiViewEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(moveDockedEventToMultiViewAction),
  switchMap(({ payload: { eventId } }) => {
    const insertableEventId = insertableEventIdSelector(state$.value);

    if (insertableEventId === eventId) {
      return of(completeInsertEventInMultiViewAction());
    }

    const exist = existInMultiViewByEventIdSelector(eventId)(state$.value);

    if (exist) {
      return merge(
        of(startInsertEventInMultiViewAction(eventId)),
        // delay(1000),
        of(completeInsertEventInMultiViewAction()),
      );
    }

    return EMPTY;
  }),
);

const startMultiViewTutorialEpic: TAppEpic = (action$) => action$.pipe(
  isCreator(startMultiViewAction),
  switchMap(({ payload: { eventId } }) => merge(
    of(modalOpenAction(EModal.multiViewTutorial)),
    of(addEventToMultiViewAction(eventId)),
  )),
);

const selectEventByMultiviewMenuEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(selectEventByMultiviewMenuAction),
  switchMap(({ payload: { eventId } }) => {
    const insertableEventId = insertableEventIdSelector(state$.value);

    if (insertableEventId === eventId) {
      return of(completeInsertEventInMultiViewAction());
    }

    const swappableEventId = swappableEventIdSelector(state$.value);

    const exist = existInMultiViewByEventIdSelector(eventId)(state$.value);

    if (swappableEventId) {
      if (exist) {
        return EMPTY;
      }

      const pathname = routerLocationPathnameSelector(state$.value);

      const match = matchPath<IParams>(pathname, multiViewOptions);

      if (!match) {
        return EMPTY;
      }

      const events = getEventsFromParams(match);

      if (!events) {
        return EMPTY;
      }

      const swappableKey = Object.keys(events).find((key) => events[key] === swappableEventId);

      if (!swappableKey) {
        return EMPTY;
      }

      const nextEvents = {
        ...events,
        [swappableKey]: eventId,
      };

      const locale = localeSelector(state$.value);

      return merge(
        of(pushLocalized(locale, getLocalizedPathWithFallback(match.path), { events: JSON.stringify(nextEvents) })),
        of(completeSwapEventInMultiViewAction()),
        of(removeLiveViewAction(swappableEventId)),
      );
    }

    const size = sizeMultiViewEventsSelector(state$.value);

    if (exist) {
      return of(removeEventFromMultiViewAction(eventId));
    }

    const action = size === 4 ? startInsertEventInMultiViewAction : addEventToMultiViewAction;

    return of(action((eventId)));
  }),
);

const multiViewRootEpic = combineEpics(
  onMultiViewPageEpic,
  showLiveViewEpic,
  addEventToMultiViewEpic,
  removeEventFromMultiViewEpic,
  doInsertEventToMultiViewEpic,
  swapEventInMultiViewEpic,
  selectEventForSwapModeEpic,
  addNewEventInMultiViewEpic,
  moveDockedEventToMultiViewEpic,
  startMultiViewTutorialEpic,
  selectEventByMultiviewMenuEpic,
);

export { multiViewRootEpic };

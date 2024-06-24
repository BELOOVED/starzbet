import { isPreLive } from "@sb/betting-core/EEventStatusUtils";
import { createMemoSelector, createSimpleSelector } from "@sb/utils";
import { type IFlatEvent } from "@sb/betting-core/Feed/Types";
import { localClientTimeZoneOffsetSelector } from "../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { type ESportPeriod, periodFilterFn } from "../../SportMenu/Model/SportPeriod";
import { outrightCountBySportIdSelector } from "../../SportMenu/Selectors/OutrightCountBySportIdSelector";
import { isBaseSport, isEsport, isVirtual } from "../Model/Sport";
import { eventsSelector, outrightsSelector } from "./FeedSelectors";

const alwaysTrue = () => true;

const preLiveEventsSelector = createMemoSelector(
  [eventsSelector],
  (events) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (event && isPreLive(event.status)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const preLiveEventsFilteredSelector = createMemoSelector(
  [
    eventsSelector,
    (_, __, eventFilterFn) => eventFilterFn,
  ],
  (events, eventFilterFn = alwaysTrue) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (event && isPreLive(event.status) && eventFilterFn(event)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const sizePreLiveEventBySportIdSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    (_, sportId: string) => sportId,
    (_, __, filterFn?) => filterFn,
  ],
  (events, sportId, filterFn = alwaysTrue) => Object.keys(events).filter(
    (eventId) => events[eventId]?.sportId === sportId && filterFn(events[eventId]),
  ).length,
  {
    expensive: true,
  },
);

const sizePreLiveEventWithOutrightsBySportIdSelector = createSimpleSelector(
  [
    sizePreLiveEventBySportIdSelector,
    outrightCountBySportIdSelector,
  ],
  (eventCount, outrightCount) => eventCount + outrightCount,
);

const preLiveNotEsportEventsSelector = createMemoSelector(
  [preLiveEventsSelector],
  (events) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (event && isBaseSport(event.sportId)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const sizePreLiveNotEsportEventsSelector = createSimpleSelector(
  [preLiveNotEsportEventsSelector, outrightsSelector],
  (events, outrights) => Object.keys(events).length + Object.keys(outrights).length,
);

const preLiveEsportEventsSelector = createMemoSelector(
  [preLiveEventsSelector],
  (events) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (event && isEsport(event.sportId)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const sizePreLiveEsportEventSelector = createSimpleSelector(
  [preLiveEsportEventsSelector],
  (events) => Object.keys(events).length,
);

const sizeAllEsportEventSelector = createSimpleSelector(
  [eventsSelector],
  (events) => Object.values(events).filter(
    (event) => (
      (isEsport(event.sportId))
    ),
  ).length,
);

const allVirtualEventsSelector = createMemoSelector(
  [eventsSelector],
  (events) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];

      if (event && isVirtual(event.sportId)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const emptyPreLiveEventsAndOutrightsBySportIdSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    outrightsSelector,
    localClientTimeZoneOffsetSelector,
    (_, period): Exclude<ESportPeriod, ESportPeriod.LIVE> => period,
    (_, __, sportId: string) => sportId,
  ],
  (events, outrights, offset, period, sportId) => {
    const eventCount = Object.values(events)
      .filter((it) => it.sportId === sportId)
      .filter(periodFilterFn[period](offset)).length;

    const outrightCount = Object.values(outrights).filter((it) => it.sportId === sportId).length;

    return eventCount + outrightCount === 0;
  },
  { expensive: true },
);

export {
  preLiveEventsSelector,
  preLiveEventsFilteredSelector,
  preLiveNotEsportEventsSelector,
  preLiveEsportEventsSelector,
  sizePreLiveEventBySportIdSelector,
  sizePreLiveEventWithOutrightsBySportIdSelector,
  sizePreLiveNotEsportEventsSelector,
  sizePreLiveEsportEventSelector,
  sizeAllEsportEventSelector,
  allVirtualEventsSelector,
  emptyPreLiveEventsAndOutrightsBySportIdSelector,
};

import { createMemoSelector } from "@sb/utils";
import { type IFlatEvent } from "@sb/betting-core/Feed/Types";
import { preLiveEventsSelector } from "../../Feed/Selectors/PreLiveEventsSelector";
import { outrightsSelector } from "../../Feed/Selectors/FeedSelectors";
import { liveEventsSelector } from "../../Feed/Selectors/LiveEventsSelector";

const combiner = <T extends Record<string, IFlatEvent>, P = string>(events: T, categoryId: P) => {
  const eventIdList = Object.keys(events);

  return eventIdList.filter((eventId) => events[eventId]?.categoryId === categoryId);
};

const preLiveEventIdListSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    (_, categoryId: string) => categoryId,
  ],
  combiner,
);

const preLiveSizeSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    outrightsSelector,
    (_, categoryId: string) => categoryId,
  ],
  (events, outrights, categoryId) => {
    const eventCount = Object.keys(events).filter((eventId) => events[eventId]?.categoryId === categoryId).length;
    const outrightCount = Object.values(outrights).filter((outright) => outright.categoryId === categoryId).length;

    return eventCount + outrightCount;
  },
  {
    expensive: true,
  },
);

const liveEventIdListSelectorFactory = createMemoSelector(
  [
    liveEventsSelector,
    (_, categoryId: string) => categoryId,
  ],
  combiner,
);

export {
  preLiveEventIdListSelector,
  liveEventIdListSelectorFactory,
  preLiveSizeSelector,
};

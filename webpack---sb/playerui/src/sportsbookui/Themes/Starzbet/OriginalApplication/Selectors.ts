// @ts-nocheck
import { createSelector } from "reselect";
import { isLive, isPreLive } from "@sb/betting-core/EEventStatusUtils";
import { createMemoSelector, withParams } from "@sb/utils";
import { isBaseSportEvent, isEsportEvent, isVirtualEvent, sortEventIdsByStartTimeAndName } from "../../../Store/Feed/Model/Event";
import { createTreeEntriesSelector } from "../../../Store/Feed/Selectors/CreateTreeEntriesSelector";
import {
  eventIdListByCategoryIdSelector,
  eventsSelector,
  outrightIdListByCategoryIdSelector,
  sportsSelector,
  tournamentsSelector,
} from "../../../Store/Feed/Selectors/FeedSelectors";
import { liveEventIdListBySearchTextSelectorFactory } from "../../../Store/Feed/Selectors/SearchSelectors";
import { multiViewEventIdListSelector } from "../../../Store/Live/Selectors/LiveSelectors";
import { ascend } from "../../../Utils/Ascend";
import { descend } from "../../../Utils/Descend";
import { sortWith } from "../../../Utils/SortWith";

const liveSports = (eventId, events) => isLive(events[eventId].status) && isBaseSportEvent(events[eventId]);
const liveESports = (eventId, events) => isLive(events[eventId].status) && isEsportEvent(events[eventId]);
const preLiveSports = (eventId, events) => isPreLive(events[eventId].status) && isBaseSportEvent(events[eventId]);
const preLiveESports = (eventId, events) => isPreLive(events[eventId].status) && isEsportEvent(events[eventId]);
const preLiveVirtualSports = (eventId, events) => isPreLive(events[eventId].status) && isVirtualEvent(events[eventId]);
const liveVirtualSports = (eventId, events) => isLive(events[eventId].status) && isVirtualEvent(events[eventId]);

const priorities = [
  liveSports,
  liveESports,
  preLiveSports,
  preLiveESports,
  preLiveVirtualSports,
  liveVirtualSports,
];

const withoutMultiviewEvents = (eventIdList, multiViewEventIdList) => (
  eventIdList.filter((eventId) => !multiViewEventIdList.includes(eventId))
);

const defaultEventIdListInSearchModeSelector = createSelector(
  eventsSelector,
  sportsSelector,
  tournamentsSelector,
  multiViewEventIdListSelector,
  (events, sports, tournaments, multiViewEventIdList) => sortWith(
    [
      ascend((eventId) => priorities.findIndex((match) => match(eventId, events))),
      descend((eventId) => sports[events[eventId].sportId].priority),
      descend((eventId) => tournaments[events[eventId].tournamentId].priority),
      ascend((eventId) => tournaments[events[eventId].tournamentId].name),
      ascend((eventId) => events[eventId].startTime),
      ascend((eventId) => events[eventId].name),
    ],
    withoutMultiviewEvents(Object.keys(events), multiViewEventIdList),
  ).slice(0, 15),
);

const eventIdListByMultiviewSearchModeSelector = createMemoSelector(
  [
    liveEventIdListBySearchTextSelectorFactory,
    multiViewEventIdListSelector,
  ],
  withoutMultiviewEvents,
);

const entriesSelectorByCategoryId = ([categoryId]) => createTreeEntriesSelector()
  .events({
    sourceSelector: withParams(eventIdListByCategoryIdSelector, categoryId),
    sortBy: sortEventIdsByStartTimeAndName,
  })
  .eventToTournament()
  .tournamentToSport()
  .concat(
    createTreeEntriesSelector()
      .outrights({
        sourceSelector: outrightIdListByCategoryIdSelector(categoryId),
        sortBy: sortEventIdsByStartTimeAndName,
      })
      .outrightToTournament()
      .tournamentToSport()
      .values(),
  );

export {
  entriesSelectorByCategoryId,
  defaultEventIdListInSearchModeSelector,
  eventIdListByMultiviewSearchModeSelector,
};

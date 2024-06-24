// @ts-nocheck
import { createSelector } from "reselect";
import { createMemoSelector, getNotNil, isNil, isNumber, isString } from "@sb/utils";
import { sortWith } from "../../../Utils/SortWith";
import { descend } from "../../../Utils/Descend";
import { ascend } from "../../../Utils/Ascend";
import { categoriesSelector, tournamentsSelector, videoUrlByEventIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { isBaseSport, isEsport, isVirtual } from "../../Feed/Model/Sport";
import { tournamentTranslateSelector } from "../../Feed/Hooks/UseTournamentIdListByTranslateSelector";
import {
  liveEventsSelector,
  liveEventsWithVideoIdsBySportIdSelector,
  liveEventsWithVideoIdsSelector,
  sportsWithVideoIdsSelector,
} from "../../Feed/Selectors/LiveEventsSelector";
import { channelIndexByUrlSelector, streamingChannelsSelector } from "../../StreamingChannels/Selectors/StreamingChannelsSelectors";
import { type IWithStreamingChannelsState } from "../../StreamingChannels/StreamingChannelsState";
import { type TAppState } from "../../InitialState";
import { channelTab } from "../Model/ChannelTab";
import { type ISelectedMap, type IWithLiveState } from "../LiveState";

const liveSelector = ({ live }: IWithLiveState) => live;

const liveFavoritesSelector = ({ live: { favorites } }: IWithLiveState) => favorites;

const livePinnedEventsSelector = (state: IWithLiveState) => liveSelector(state).pinnedEvents;

const pinnedLiveEventByIdSelector = (eventId: string) => (state: IWithLiveState) => liveSelector(state).pinnedEvents.includes(eventId);

const liveMultiViewSelector = ({ live: { multiView } }: IWithLiveState) => multiView;

const liveClosableSportIdsSelector = ({ live: { closableSportIds } }: IWithLiveState) => closableSportIds;

const liveClosableTournamentIdsSelector = ({ live: { closableTournamentIds } }: IWithLiveState) => closableTournamentIds;

const dockedEventsSelector = (state: IWithLiveState) => liveSelector(state).dockedEvents;

const sizeDockedEventsSelector = (state: IWithLiveState) => dockedEventsSelector(state).length;

const collapsedDockedEventsSelector = (state: IWithLiveState) => liveSelector(state).collapsedDockedEvents;

const swappableEventIdSelector = (state: IWithLiveState) => liveSelector(state).swappableEventId;

const insertableEventIdSelector = (state: IWithLiveState) => liveSelector(state).insertableEventId;

const moveDockedEventSelector = (state: IWithLiveState) => liveSelector(state).moveDockedEvent;

const isDockedEventByIdSelector = (state: IWithLiveState, eventId: string | null) => {
  if (isNil(eventId)) {
    return false;
  }

  return dockedEventsSelector(state).includes(eventId);
};

const isCollapsedDockedEventByIdSelector = (eventId: string) =>
  (state: IWithLiveState) =>
    collapsedDockedEventsSelector(state).includes(eventId);

const liveFavouritesWithoutEsportsSelector = createSelector(
  liveFavoritesSelector,
  tournamentsSelector,
  (tournamentIds, tournaments) => tournamentIds.filter(
    (id) =>
      isBaseSport(tournaments[id]?.sportId) &&
      !isVirtual(tournaments[id]?.sportId),
  ),
);

const liveFavouritesEsportsSelector = createSelector(
  liveFavoritesSelector,
  tournamentsSelector,
  (tournamentIds, tournaments) => tournamentIds.filter((id) => isEsport(tournaments[id]?.sportId)),
);

const liveSelectedMapSelector = (state: IWithLiveState) => liveSelector(state).selectedMap;

const isEmptyLiveSelectedMapSelector = (sportId: string, selectedMap: ISelectedMap) => (
  Object.keys(selectedMap).length === 0 ||
  !selectedMap[sportId] ||
  Object.keys(selectedMap[sportId] ?? {}).length === 0
);

const hasTournamentIdInLiveSelectedMapSelector = (sportId: string, tournamentId: string, selectedMap: ISelectedMap) => {
  if (!selectedMap[sportId]) {
    return false;
  }

  return selectedMap[sportId]?.includes(tournamentId);
};

const isLiveSelectedTournamentIdSelector = ((sportId: string, tournamentId: string) => (state: IWithLiveState) => (
  hasTournamentIdInLiveSelectedMapSelector(sportId, tournamentId, liveSelectedMapSelector(state))
));

const countLiveSelectedTournamentIdByCategoryIdSelector = (sportId: string, tournamentIds: string[]) =>
  (state: IWithLiveState) =>
    tournamentIds.filter((tournamentId) => isLiveSelectedTournamentIdSelector(sportId, tournamentId)(state)).length;

const notLiveSelectedTournamentIdSelector = (sportId: string, tournamentId: string, selectedMap: ISelectedMap) => {
  const empty = isEmptyLiveSelectedMapSelector(sportId, selectedMap);

  return !empty && !hasTournamentIdInLiveSelectedMapSelector(sportId, tournamentId, selectedMap);
};

interface ITournaments {
  priority: unknown;
  name: string;
}

const sortTournaments = (tournaments: Record<string, ITournaments>) => sortWith(
  [
    descend((tournamentId: string) => getNotNil(tournaments[tournamentId], ["Live Selector"], "sortTournaments").priority),
    ascend((tournamentId: string) => getNotNil(tournaments[tournamentId], ["Live Selector"], "sortTournaments").name),
  ],
);

const categoriesEntriesByLiveSelector = createMemoSelector(
  [
    liveEventsSelector,
    categoriesSelector,
    tournamentsSelector,
    tournamentTranslateSelector,
    (_, sportId: string) => sportId,
    (_, __, searchText: string) => searchText,
    (_, __, ___, eventFilter: ({ sportId }: { sportId: string; }) => boolean) => eventFilter,
  ],
  (
    events,
    categories,
    tournaments,
    tournamentIdsBySearch,
    sportId,
    searchText,
    eventFilter,
  ) => {
    const filtered = Object.values(events).filter(
      (event) => eventFilter(event) && event.sportId === sportId,
    );

    const categoryMap: Record<string, Record<string, unknown>> = {};

    filtered.forEach((event) => {
      if (!!searchText && !tournamentIdsBySearch.includes(event.tournamentId)) {
        return;
      }

      if (!categoryMap[event.categoryId]) {
        categoryMap[event.categoryId] = {};
      }

      getNotNil(categoryMap[event.categoryId], ["Live Selector"], "categoriesEntriesByLiveSelector")[event.tournamentId] = null;
    });

    return sortWith(
      [
        descend(([categoryId]: [string]) => categories[categoryId].priority),
        ascend(([categoryId]: [string]) => categories[categoryId].name),
      ],
      Object.entries(categoryMap).map(([categoryId, tournamentMap]) => [
        categoryId,
        sortTournaments(tournaments)(Object.keys(tournamentMap)),
      ]),
    );
  },
);

const multiViewEventIdListSelector = (state: IWithLiveState) => Object.keys(liveMultiViewSelector(state));

const sizeMultiViewEventsSelector = (state: IWithLiveState) => multiViewEventIdListSelector(state).length;

const existInMultiViewByEventIdSelector = (eventId: string) =>
  (state: IWithLiveState) =>
    multiViewEventIdListSelector(state).includes(eventId);

// TODO - Replace old selector

const isSwappableEventByIdSelector = (eventId: string | null) => (state: IWithLiveState) => swappableEventIdSelector(state) === eventId;
const newIsSwappableEventByIdSelector = (state: IWithLiveState, eventId: string | null) => swappableEventIdSelector(state) === eventId;

const isInsertableEventByIdSelector = (eventId: string | null) => (state: IWithLiveState) => insertableEventIdSelector(state) === eventId;

const availableEventForSwapByIdSelector = (eventId: string | null) => (state: IWithLiveState) => (
  swappableEventIdSelector(state) != null && !isSwappableEventByIdSelector(eventId)(state)
);

const availableEventForInsertByIdSelector = (eventId: string | null) => (state: IWithLiveState) => (
  insertableEventIdSelector(state) != null && !isInsertableEventByIdSelector(eventId)(state)
);

const insertableIsDockedEventSelector = (state: IWithLiveState) => isDockedEventByIdSelector(state, insertableEventIdSelector(state));

const isInsertableDockedEventByIdSelector = (state: IWithLiveState, eventId: string) => (
  insertableEventIdSelector(state) === eventId && insertableIsDockedEventSelector(state)
);

const swapModeByEventIdSelector = (state: IWithLiveState, eventId: string) => {
  if (moveDockedEventSelector(state)) {
    return multiViewEventIdListSelector(state).every((id) => !isInsertableDockedEventByIdSelector(state, id));
  }

  return [
    availableEventForSwapByIdSelector,
    availableEventForInsertByIdSelector,
  ].some((selector) => selector(eventId)(state));
};

const availableAddNewEventInMultiViewSelector = (state: IWithLiveState) => (
  availableEventForInsertByIdSelector(null)(state) && !insertableIsDockedEventSelector(state)
);

const movingDockedEventSelector = (eventId: string) => (state: IWithLiveState) => (
  moveDockedEventSelector(state) && isInsertableEventByIdSelector(eventId)(state)
);

const isStartedInsertableEventByIdSelector = (eventId: string) => (state: IWithLiveState) => (
  !moveDockedEventSelector(state) && isInsertableEventByIdSelector(eventId)(state)
);

const activeEventInMultiviewMenuByIdSelector = (eventId: string) => (state: IWithLiveState) => [
  existInMultiViewByEventIdSelector,
  isStartedInsertableEventByIdSelector,
].some((selector) => selector(eventId)(state));

const someMovingEventInMultiviewSelector = (state: IWithLiveState) => [
  swappableEventIdSelector,
  insertableEventIdSelector,
].some((selector) => selector(state));

const liveOnlyWidgetSelector = (state: IWithLiveState) => liveSelector(state).onlyWidget;

const streamingTabSelector = (state: IWithLiveState) => liveSelector(state).streamingTab;

const videoIdSelector = (state: IWithLiveState) => liveSelector(state).videoId;

const videoUrlByChannelIdSelector = (id: number | null) => (state: IWithStreamingChannelsState) => {
  const streamingChannels = streamingChannelsSelector(state);

  if (streamingChannels.length === 0) {
    return undefined;
  }

  if (isNil(id)) {
    return streamingChannels[0]?.url;
  }

  const channel = streamingChannels[id];

  if (!channel) {
    return streamingChannels.at(-1)?.url;
  }

  return channel.url;
};

const sportVideoUrlByEventIdSelector = (eventId: number | null | string) => (state: IWithLiveState) => {
  const allEventIds = liveEventsWithVideoIdsSelector(state);

  const currentTab = currentStreamingTabSelector(state);

  const eventIdsByTab = liveEventsWithVideoIdsBySportIdSelector(state, currentTab);

  const sportIds = sportsWithVideoIdsSelector(state);

  if (allEventIds.length === 0 || isNil(eventId)) {
    return undefined;
  }

  if (isString(eventId) && allEventIds.includes(eventId)) {
    return videoUrlByEventIdSelector(state, eventId);
  }

  if (eventId === null) {
    const firstSportEventIds = liveEventsWithVideoIdsBySportIdSelector(state, sportIds[0]);

    return videoUrlByEventIdSelector(state, firstSportEventIds[0]);
  }

  return videoUrlByEventIdSelector(state, eventIdsByTab[0]);
};

const currentLiveStreamingUrlSelector = (state: TAppState) => {
  const videoId = videoIdSelector(state);

  const url = sportVideoUrlByEventIdSelector(videoId)(state);

  if (!isNumber(videoId) && url) {
    return url;
  }

  if (!isNumber(videoId)) {
    return undefined;
  }

  return videoUrlByChannelIdSelector(videoId)(state);
};

const currentStreamingTabSelector = (state: IWithLiveState) => {
  const tab = streamingTabSelector(state);

  if (tab !== null) {
    return tab;
  }

  const sportIds = sportsWithVideoIdsSelector(state);

  if (sportIds.includes(tab)) {
    return sportIds;
  }

  return sportIds[0];
};

const isActiveStreamingTabSelector = (tab: string) => (state: IWithLiveState) => currentStreamingTabSelector(state) === tab;

const isActiveRestTabSelector = (sportIds: string[]) =>
  (state: IWithLiveState) =>
    sportIds.some((id) => id === currentStreamingTabSelector(state));

const isActiveVideoUrlSelector = (videoId: number | string) => (state: TAppState) => {
  const currentUrl = currentLiveStreamingUrlSelector(state);

  if (isNumber(videoId)) {
    return channelIndexByUrlSelector(currentUrl)(state) === videoId;
  }

  return videoUrlByEventIdSelector(state, videoId) === currentUrl;
};

const isActiveChannelTabSelector = isActiveStreamingTabSelector(channelTab);

const liveEventsWithVideoIdsByTabSelector = (state: IWithLiveState) =>
  liveEventsWithVideoIdsBySportIdSelector(
    state,
    currentStreamingTabSelector(state),
  )
;

const eventIdByVideoIdSelector = (state: TAppState) => {
  const videoId = videoIdSelector(state);

  if (isActiveChannelTabSelector(state) || isNumber(videoId)) {
    return null;
  }

  if (videoId === null) {
    const currentUrl = currentLiveStreamingUrlSelector(state);

    const currentTab = currentStreamingTabSelector(state);

    const eventIdsByTab = liveEventsWithVideoIdsBySportIdSelector(state, currentTab);

    return eventIdsByTab.find((eventId: string) => videoUrlByEventIdSelector(state, eventId) === currentUrl);
  }

  return videoId;
};

export {
  liveFavoritesSelector,
  liveMultiViewSelector,
  sizeMultiViewEventsSelector,
  existInMultiViewByEventIdSelector,
  liveClosableSportIdsSelector,
  liveClosableTournamentIdsSelector,
  liveFavouritesWithoutEsportsSelector,
  liveFavouritesEsportsSelector,
  liveSelectedMapSelector,
  isLiveSelectedTournamentIdSelector,
  countLiveSelectedTournamentIdByCategoryIdSelector,
  notLiveSelectedTournamentIdSelector,
  categoriesEntriesByLiveSelector,
  livePinnedEventsSelector,
  pinnedLiveEventByIdSelector,
  isDockedEventByIdSelector,
  dockedEventsSelector,
  collapsedDockedEventsSelector,
  isCollapsedDockedEventByIdSelector,
  sizeDockedEventsSelector,
  swappableEventIdSelector,
  availableEventForSwapByIdSelector,
  insertableEventIdSelector,
  isSwappableEventByIdSelector,
  availableAddNewEventInMultiViewSelector,
  movingDockedEventSelector,
  moveDockedEventSelector,
  activeEventInMultiviewMenuByIdSelector,
  someMovingEventInMultiviewSelector,
  multiViewEventIdListSelector,
  liveOnlyWidgetSelector,
  currentLiveStreamingUrlSelector,
  isActiveStreamingTabSelector,
  isActiveRestTabSelector,
  isActiveVideoUrlSelector,
  isActiveChannelTabSelector,
  liveEventsWithVideoIdsByTabSelector,
  eventIdByVideoIdSelector,
  swapModeByEventIdSelector,
  newIsSwappableEventByIdSelector,
  isInsertableDockedEventByIdSelector,
};

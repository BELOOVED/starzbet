// @ts-nocheck
import { memo } from "react";
import { groupEventsByTournamentId, isBaseSportEvent, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import { liveTournamentEntriesPerSportSelectorFactory } from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [isBaseSportEvent, sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const LiveAll = memo(() => (
  <EventsVirtualContainer
    selectorFactory={liveTournamentEntriesPerSportSelectorFactory}
    deps={selectorDeps}
  />
));
LiveAll.displayName = "LiveAll";

export { LiveAll };

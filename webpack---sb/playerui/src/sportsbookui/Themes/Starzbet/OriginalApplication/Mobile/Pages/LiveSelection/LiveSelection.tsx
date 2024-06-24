// @ts-nocheck
import { memo } from "react";
import { groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import {
  liveMatchTournamentEntriesPerSportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [sortEventIdsByStartTimeAndName, groupEventsByTournamentId];
const LiveSelection = memo(({ match }) => {
  const deps = [match.url, ...selectorDeps];

  return (
    <EventsVirtualContainer
      selectorFactory={liveMatchTournamentEntriesPerSportSelectorFactory}
      deps={deps}
    />
  );
});
LiveSelection.displayName = "LiveSelection";

export { LiveSelection };

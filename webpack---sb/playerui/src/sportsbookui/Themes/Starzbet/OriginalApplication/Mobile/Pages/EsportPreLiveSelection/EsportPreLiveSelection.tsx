// @ts-nocheck

import { memo } from "react";
import { groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import {
  preLiveMatchTournamentEntriesPerSportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const EsportPreLiveSelection = memo(({
  match,
}) => {
  const deps = [match.url, ...selectorDeps];

  return (
    <EventsVirtualContainer
      selectorFactory={preLiveMatchTournamentEntriesPerSportSelectorFactory}
      deps={deps}
    />
  );
});
EsportPreLiveSelection.displayName = "EsportPreLiveSelection";

export { EsportPreLiveSelection };

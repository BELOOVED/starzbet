// @ts-nocheck

import { memo } from "react";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { equalBySportId, groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import { liveTournamentEntriesPerSportSelectorFactory } from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const EsportLiveSport = memo(({
  match: { params: { sportSlug } },
}) => {
  const deps = [equalBySportId(sportCodeToIdMap[sportSlug]), ...selectorDeps];

  return (
    <EventsVirtualContainer
      selectorFactory={liveTournamentEntriesPerSportSelectorFactory}
      deps={deps}
    />
  );
});
EsportLiveSport.displayName = "EsportLiveSport";

export { EsportLiveSport };

// @ts-nocheck
import { memo } from "react";
import { isEsport } from "../../../../../../Store/Feed/Model/Sport";
import { groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import { liveTournamentEntriesPerSportSelectorFactory } from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [({ sportId }) => isEsport(sportId), sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const EsportLiveAll = memo(() => (
  <EventsVirtualContainer
    selectorFactory={liveTournamentEntriesPerSportSelectorFactory}
    deps={selectorDeps}
  />
));
EsportLiveAll.displayName = "EsportLiveAll";

export { EsportLiveAll };

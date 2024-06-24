// @ts-nocheck
import { memo } from "react";
import {
  preLivePeriodTournamentEntriesPerSportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { ESportPeriod } from "../../../../../../Store/SportMenu/Model/SportPeriod";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const TournamentPage = memo(({ match: { params: { id } } }) => {
  const deps = [id];

  return (
    <EventsVirtualContainer
      selectorFactory={preLivePeriodTournamentEntriesPerSportSelectorFactory(ESportPeriod.ALL)}
      deps={deps}
    />
  );
});
TournamentPage.displayName = "TournamentPage";

export { TournamentPage };

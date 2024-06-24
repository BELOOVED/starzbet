// @ts-nocheck

import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import {
  localClientTimeZoneOffsetSelector,
} from "../../../../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import {
  batchEventFilters,
  equalBySportId,
  groupEventsByTournamentId,
  sortEventIdsByStartTimeAndName,
} from "../../../../../../Store/Feed/Model/Event";
import { periodFilterFn } from "../../../../../../Store/SportMenu/Model/SportPeriod";
import {
  preLivePeriodTournamentEntriesPerSportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [
  sortEventIdsByStartTimeAndName,
  groupEventsByTournamentId,
];

const EsportPreLiveSport = memo(({
  match: { params: { sportSlug, period } },
}) => {
  const offset = useSelector(localClientTimeZoneOffsetSelector);

  const filterFn = useMemo(() => periodFilterFn[period](offset), [period, offset]);

  const deps = [batchEventFilters([equalBySportId(sportCodeToIdMap[sportSlug]), filterFn]), ...selectorDeps];

  return (
    <EventsVirtualContainer
      selectorFactory={preLivePeriodTournamentEntriesPerSportSelectorFactory(period)}
      deps={deps}
    />
  );
});
EsportPreLiveSport.displayName = "EsportPreLiveSport";

export { EsportPreLiveSport };

// @ts-nocheck

import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  localClientTimeZoneOffsetSelector,
} from "../../../../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { isEsport } from "../../../../../../Store/Feed/Model/Sport";
import { batchEventFilters, groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import { periodFilterFn } from "../../../../../../Store/SportMenu/Model/SportPeriod";
import {
  preLivePeriodTournamentEntriesPerSportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const esportFilter = ({ sportId }) => isEsport(sportId);

const selectorDeps = [
  sortEventIdsByStartTimeAndName,
  groupEventsByTournamentId,
];

const EsportPreLiveAll = memo(({ match: { params: { period } } }) => {
  const offset = useSelector(localClientTimeZoneOffsetSelector);

  const filterFn = useMemo(() => periodFilterFn[period](offset), [period, offset]);

  const deps = [batchEventFilters([esportFilter, filterFn]), ...selectorDeps];

  return (
    <EventsVirtualContainer
      selectorFactory={preLivePeriodTournamentEntriesPerSportSelectorFactory(period)}
      deps={deps}
    />
  );
});
EsportPreLiveAll.displayName = "EsportPreLiveAll";

export { EsportPreLiveAll };

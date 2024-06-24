// @ts-nocheck
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  localClientTimeZoneOffsetSelector,
} from "../../../../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import {
  batchEventFilters,
  groupEventsByTournamentId,
  isBaseSportEvent,
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

const PreLiveAll = memo(({ match: { params: { period } } }) => {
  const offset = useSelector(localClientTimeZoneOffsetSelector);

  const filterFn = useMemo(() => periodFilterFn[period](offset), [period, offset]);

  const deps = [batchEventFilters([isBaseSportEvent, filterFn]), ...selectorDeps];

  return (
    <EventsVirtualContainer
      selectorFactory={preLivePeriodTournamentEntriesPerSportSelectorFactory(period)}
      deps={deps}
    />
  );
});
PreLiveAll.displayName = "PreLiveAll";

export { PreLiveAll };

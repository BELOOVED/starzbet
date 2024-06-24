// @ts-nocheck
import { memo } from "react";
import { groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import {
  preLiveCouponTournamentEntriesPerSportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const EsportPreLiveCoupon = memo(({
  match: { params: { couponId } },
}) => {
  const deps = [couponId, ...selectorDeps];

  return (
    <EventsVirtualContainer
      selectorFactory={preLiveCouponTournamentEntriesPerSportSelectorFactory}
      deps={deps}
    />
  );
});
EsportPreLiveCoupon.displayName = "EsportPreLiveCoupon";

export { EsportPreLiveCoupon };

// @ts-nocheck
import { memo } from "react";
import { groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import {
  preLiveCouponTournamentEntriesPerSportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const PreLiveCoupon = memo(({
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
PreLiveCoupon.displayName = "PreLiveCoupon";

export { PreLiveCoupon };

import { deduplicate } from "@sb/utils/Deduplicate";
import { createMemoSelector, createSimpleSelector, getNotNil, isNotEmpty, withParams } from "@sb/utils";
import { ESportsbook_CouponView } from "@sb/graphql-client";
import { localClientTimeZoneOffsetSelector } from "../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { preLiveEventsSelector } from "../../Feed/Selectors/PreLiveEventsSelector";
import { isBaseSport, isEsport } from "../../Feed/Model/Sport";
import { sortEventIdsByStartTimeAndName } from "../../Feed/Model/Event";
import { couponsByViewSelector } from "./CouponsByViewSelector";
import { eventIdListByCouponSelector } from "./EventIdListByCouponSelector";

const eventIdListForTopEventCouponSelector = createMemoSelector(
  [
    withParams(couponsByViewSelector, ESportsbook_CouponView.topEvents),
    preLiveEventsSelector,
    localClientTimeZoneOffsetSelector,
  ],
  (coupons, events, timezoneOffset) => deduplicate(coupons.flatMap(eventIdListByCouponSelector(events, timezoneOffset))),
);

const eventIdListByTopMatchesListSelector = createMemoSelector(
  [
    withParams(couponsByViewSelector, ESportsbook_CouponView.topMatchesList),
    preLiveEventsSelector,
    localClientTimeZoneOffsetSelector,
  ],
  (coupons, events, timezoneOffset) => (
    sortEventIdsByStartTimeAndName(events)(
      deduplicate(coupons.flatMap(eventIdListByCouponSelector(events, timezoneOffset)))
        .filter((eventId) => isBaseSport(getNotNil(events[eventId], ["UseEventIdListByEventCouponSelector"], "eventIdListByTopMatchesListSelector").sportId)),
    )
  ),
);

const esportEventIdListByEventCouponSelector = createMemoSelector(
  [eventIdListForTopEventCouponSelector,
    preLiveEventsSelector],
  (eventIdList, events) => sortEventIdsByStartTimeAndName(events)(
    eventIdList.filter((eventId) => isEsport(getNotNil(events[eventId], ["UseEventIdListByEventCouponSelector"], "esportEventIdListByEventCouponSelector").sportId)),
  ).slice(0, 15),
);

const withoutEsportEventIdListByEventCouponSelector = createMemoSelector(
  [eventIdListForTopEventCouponSelector,
    preLiveEventsSelector],
  (eventIdList, events): string[] => sortEventIdsByStartTimeAndName(events)(
    eventIdList.filter((eventId) => isBaseSport(getNotNil(events[eventId], ["UseEventIdListByEventCouponSelector"], "withoutEsportEventIdListByEventCouponSelector").sportId)),
  )
    .slice(0, 15) as string[],
);

const isNotEmptyWithoutEsportEventIdListByEventCouponSelector =
  createSimpleSelector(
    [withoutEsportEventIdListByEventCouponSelector],
    isNotEmpty,
  );

export {
  isNotEmptyWithoutEsportEventIdListByEventCouponSelector,
  eventIdListByTopMatchesListSelector,
  esportEventIdListByEventCouponSelector,
  withoutEsportEventIdListByEventCouponSelector,
};

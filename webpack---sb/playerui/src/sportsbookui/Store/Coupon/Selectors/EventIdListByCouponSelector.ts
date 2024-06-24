import { deduplicate } from "@sb/utils/Deduplicate";
import { type IFlatEvent } from "@sb/betting-core/Feed/Types";
import { getNotNil } from "@sb/utils";
import { type TSportsbook_CouponEventFilter_Fragment, type TSportsbook_NewCoupon_Fragment } from "@sb/graphql-client/PlayerUI";

type TEvents = Record<string, IFlatEvent>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isEventStart = (event: IFlatEvent, filter: TSportsbook_CouponEventFilter_Fragment, offset: number) => {
  const { eventStartTimeGte: start, eventStartTimeLte: end } = filter;

  if (!start && !end) {
    return true;
  }

  return true;
  //todo all wrong
  // return (
  //   Time.isWithinInterval(
  //     event.startTime,
  //     { start, end },
  //     { offset }
  //   )
  // );
};

const isAvailable = (events: TEvents, filter: TSportsbook_CouponEventFilter_Fragment, offset: number) => (eventId: string) => {
  const event = events[eventId];

  return (
    event && isEventStart(event, filter, offset)
  );
};

const selectByFilter = (events: TEvents, filter: TSportsbook_CouponEventFilter_Fragment) => {
  const notNilEvent = (eventId: string) => getNotNil(events[eventId], ["EventIdListByCouponSelector"], "selectByFilter");

  if (filter.eventIds.length !== 0) {
    return filter.eventIds;
  }

  if (filter.tournamentId !== null) {
    return Object.keys(events)
      .filter((eventId) => notNilEvent(eventId).tournamentId === filter.tournamentId);
  }

  if (filter.categoryId !== null) {
    return Object.keys(events).filter((eventId) => notNilEvent(eventId).categoryId === filter.categoryId);
  }

  if (filter.sportId !== null) {
    return Object.keys(events).filter((eventId) => notNilEvent(eventId).sportId === filter.sportId);
  }

  return [];
};

const selectAvailable = (events: TEvents, filter: TSportsbook_CouponEventFilter_Fragment, timezoneOffset: number) =>
  (eventIdList: string[]) => (
    eventIdList.filter(isAvailable(events, filter, timezoneOffset))
  );

const selectEventIds = (events: TEvents, timezoneOffset: number) => (filter: TSportsbook_CouponEventFilter_Fragment) => (
  selectAvailable(events, filter, timezoneOffset)(selectByFilter(events, filter))
);

const eventIdListByCouponSelector = (events: TEvents, timezoneOffset: number) => (coupon: TSportsbook_NewCoupon_Fragment | undefined) => {
  if (!coupon) {
    return [];
  }

  return deduplicate(coupon.filters.flatMap(selectEventIds(events, timezoneOffset)));
};

export { eventIdListByCouponSelector };

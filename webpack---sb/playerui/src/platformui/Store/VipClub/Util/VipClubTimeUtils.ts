import { getNotNil, Time } from "@sb/utils";
import { getDateByTimeZone } from "../../../../common/Utils/GetDateByTimeZone";
import { VIP_CLUB_TIME_ZONE } from "../VipClubVariables";

const vipClubGetDate = () => getDateByTimeZone(VIP_CLUB_TIME_ZONE);

const vipClubGetTimestamp = () => vipClubGetDate().getTime();

const vipClubGetMSUntilEndOfDay = () => {
  const timestamp = vipClubGetTimestamp();

  return Time.endOfDay(timestamp) - timestamp;
};

const vipClubGetMSWeeklyBonusAvailableFor = (availableDays: number[]) => {
  const currentTimestamp = vipClubGetTimestamp();

  const monday = Time.startOfWeek(currentTimestamp, { weekStartsOn: 0 });

  const lastAvailableDay = getNotNil(availableDays[availableDays.length - 1], ["vipClubGetMSWeeklyBonusAvailableFor"], "lastAvailableDay");

  const targetTimestamp = Time.addDays(monday, lastAvailableDay) - 1;

  return targetTimestamp - currentTimestamp;
};

const vipClubGetMSMonthlyBonusAvailableFor = (availableDays: number) => {
  const currentTimestamp = vipClubGetTimestamp();

  const firstDayOfMonth = Time.startOfMonth(currentTimestamp);

  const targetTimestamp = Time.addDays(firstDayOfMonth, availableDays) - 1;

  return targetTimestamp - currentTimestamp;
};

const vipClubGetMSUntilNextMonday = () => {
  const timestamp = vipClubGetTimestamp();

  const monday = Time.endOfWeek(timestamp, { weekStartsOn: 1 });

  return monday - timestamp;
};

const vipClubGetMSUntilNextMonth = () => {
  const timestamp = vipClubGetTimestamp();

  const nextMonth = Time.endOfMonth(timestamp);

  return nextMonth - timestamp;
};

export {
  vipClubGetMSUntilNextMonth,
  vipClubGetMSUntilNextMonday,
  vipClubGetMSWeeklyBonusAvailableFor,
  vipClubGetMSUntilEndOfDay,
  vipClubGetDate,
  vipClubGetMSMonthlyBonusAvailableFor,
};

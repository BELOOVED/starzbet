import { Time } from "@sb/utils";

type TDate = {
  hours: number;
  minutes: number;
}

type TDailyLimitations = {
  from: TDate;
  to: TDate;
}

const isRightOrder = (from: TDate, to: TDate) => {
  if (from.hours === to.hours && from.minutes === to.minutes) {
    throw new Error(`[isRightOrder] 'from' and 'to' values are equal: ${from.hours}:${from.minutes}`);
  }

  const fromDate = new Date();
  const toDate = new Date();

  fromDate.setHours(from.hours);
  fromDate.setMinutes(from.minutes);

  toDate.setHours(to.hours);
  toDate.setMinutes(to.minutes);

  return Time.isBefore(fromDate.getTime(), toDate.getTime());
};

const matchBonusDailyLimitations = (
  dailyLimitations: TDailyLimitations,
  hours: number,
  minutes: number,
): boolean => {
  const { from, to } = dailyLimitations;

  if (isRightOrder(from, to)) {
    if (hours < from.hours || hours > to.hours) {
      return false;
    } else if (hours === from.hours && hours === to.hours) {
      return minutes >= from.minutes && minutes < to.minutes;
    } else if (hours === from.hours) {
      return minutes >= from.minutes;
    } else if (hours === to.hours) {
      return minutes < to.minutes;
    }

    return true;
  } else {
    if (hours > from.hours || hours < to.hours) {
      return true;
    } else if (hours === from.hours && hours === to.hours) {
      return minutes < to.minutes || minutes >= from.minutes;
    } else if (hours === from.hours) {
      return minutes >= from.minutes;
    } else if (hours === to.hours) {
      return minutes < to.minutes;
    }

    return false;
  }
};

export { isRightOrder, matchBonusDailyLimitations };

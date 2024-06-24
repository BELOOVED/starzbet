import { isNotNil } from "@sb/utils";
import { EExpireAtType } from "../Model/Enums/EExpireAtType";

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MS_IN_HOUR = 60 * 60 * 1000;
const MS_IN_MINUTE = 60 * 1000;

const humanReadableExpiryIn = (expireIn: number) => {
  const fullDays = Math.floor(expireIn / MS_IN_DAY);

  const expiryInWithoutFullDays = expireIn - (fullDays * MS_IN_DAY);
  const fullHours = Math.floor(expiryInWithoutFullDays / MS_IN_HOUR);

  const expiryInWithoutFullHours = expiryInWithoutFullDays - (fullHours * MS_IN_HOUR);
  const fullMinutes = Math.floor(expiryInWithoutFullHours / MS_IN_MINUTE);

  return {
    days: fullDays,
    hours: fullHours,
    minutes: fullMinutes,
  };
};

const shortReadableExpireIn = (expiredAt?: number): { value: number; type: EExpireAtType; } => {
  if (!expiredAt) {
    return ({
      type: EExpireAtType.indefinite,
      value: 0,
    });
  }

  const { days, minutes, hours } = humanReadableExpiryIn(expiredAt);

  if (days > 1) {
    return ({
      type: EExpireAtType.days,
      value: days,
    });
  }

  if (days === 1 && hours === 0) {
    return ({
      type: EExpireAtType.hours,
      value: 24,
    });
  }

  if (days === 1) {
    return ({
      type: EExpireAtType.day,
      value: 1,
    });
  }

  if (hours > 1) {
    return ({
      type: EExpireAtType.hours,
      value: hours,
    });
  }

  if (hours === 1) {
    return ({
      type: EExpireAtType.hour,
      value: 1,
    });
  }

  if (minutes === 1) {
    return ({
      type: EExpireAtType.minute,
      value: 1,
    });
  }

  return ({
    type: EExpireAtType.minutes,
    value: minutes,
  });
};

const getExpireInOrNull = (expiredAt: number | undefined) =>
  isNotNil(expiredAt) && expiredAt - Date.now() > 0
    ? expiredAt - Date.now()
    : null;

export {
  shortReadableExpireIn,
  humanReadableExpiryIn,
  getExpireInOrNull,
};

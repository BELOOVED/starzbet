import { useMemo, useState } from "react";
import { Time, useTime } from "@sb/utils";

const ONE_SECOND = 1000;

const useDateCountDown = (startDate: number | string | Date) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate));

  const callback = useMemo(
    () => {
      const difference = Time.differenceInMilliseconds(new Date(startDate).getTime(), Date.now());

      if (difference <= 0) {
        return null;
      }

      return () => {
        setTimeLeft(calculateTimeLeft(startDate));
      };
    },
    [startDate],
  );

  useTime(callback);

  return timeLeft;
};

function calculateTimeLeft(startDate: number | string | Date) {
  const difference = Time.differenceInMilliseconds(new Date(startDate).getTime(), Date.now());

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isTimeEnd: true,
    };
  }

  return {
    days: Math.floor(difference / (ONE_SECOND * 60 * 60 * 24)),
    hours: Math.floor((difference / (ONE_SECOND * 60 * 60)) % 24),
    minutes: Math.floor((difference / ONE_SECOND / 60) % 60),
    seconds: Math.floor((difference / ONE_SECOND) % 60),
    isTimeEnd: false,
  };
}

export { useDateCountDown };

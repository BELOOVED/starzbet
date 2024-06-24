import { useEffect, useReducer } from "react";
import { Time } from "@sb/utils";

const useCountdown = (dateLeft: number) => {
  const [now, updateNow] = useReducer(() => Date.now(), Date.now());

  useEffect(
    () => {
      const interval = setInterval(
        () => updateNow(),
        1000,
      );

      return () => clearInterval(interval);
    },
    [now],
  );

  if (dateLeft < now) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isOver: true,
    };
  }

  let days: number | string = Time.differenceInDays(dateLeft, now);

  const offsetDays = (days * 24 * 60 * 60 * 1000);

  let hours: number | string = Time.differenceInHours(dateLeft, now + offsetDays);

  const offsetHours = offsetDays + (hours * 60 * 60 * 1000);

  let minutes: number | string = Time.differenceInMinutes(dateLeft, now + offsetHours);

  const offsetMinutes = offsetHours + (minutes * 60 * 1000);

  let seconds: number | string = Time.differenceInSeconds(dateLeft, now + offsetMinutes);

  days = (days < 10) ? `0${days}` : days;
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export { useCountdown };

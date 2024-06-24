import { monoClock } from "./MonoClock";

const getDateByTimeZone = (timeZone: string, fromDate?: number | string | Date) => {
  const clientDate = fromDate ? new Date(fromDate) : new Date(monoClock.now());

  const date = clientDate.toLocaleDateString("en-US", { timeZone });
  const time = clientDate.toLocaleTimeString("en-US", { timeZone });

  return new Date(date + " " + time);
};

export { getDateByTimeZone };

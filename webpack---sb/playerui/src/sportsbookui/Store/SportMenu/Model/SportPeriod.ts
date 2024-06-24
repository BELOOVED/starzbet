import { Time } from "@sb/utils";
import { always, T } from "../../../Utils/Always";

const sportPeriodEnum = {
  today: "today",
  tomorrow: "tomorrow",
  thirtyMinutes: "thirty_minutes",
  oneHour: "one_hour",
  threeHours: "three_hours",
  fourHours: "four_hours",
  sixHours: "six_hours",
  eightHours: "eight_hours",
  twelveHours: "twelve_hours",
  sixteenHours: "sixteen_hours",
  fortyEightHours: "forty_eight_hours",
  day: "day",
  threeDays: "three_days",
  nextTwoDays: "next_two_days",
  all: "all",
  live: "live",
} as const;

enum ESportPeriod {
  TODAY = "today",
  TOMORROW = "tomorrow",
  THIRTY_MINUTES = "thirty_minutes",
  ONE_HOUR = "one_hour",
  THREE_HOURS = "three_hours",
  FOUR_HOURS = "four_hours",
  SIX_HOURS = "six_hours",
  EIGHT_HOURS = "eight_hours",
  TWELVE_HOURS = "twelve_hours",
  SIXTEEN_HOURS = "sixteen_hours",
  FORTY_EIGHT_HOURS = "forty_eight_hours",
  DAY = "day",
  THREE_DAYS = "three_days",
  NEXT_TWO_DAYS = "next_two_days",
  ALL = "all",
  LIVE = "live",
}

interface IWithStartTime {
  startTime: number;
}

const isWithinHours = (hours: number) => (offset: number) => <E extends IWithStartTime>({ startTime }: E) => {
  const start = Date.now();

  return Time.isWithinInterval(
    startTime,
    {
      start,
      end: Time.addHours(start, hours),
    },
    { offset },
  );
};

const isWithinMinutes = (minutes: number) => (offset: number) => <E extends IWithStartTime>({ startTime }: E) => {
  const start = Date.now();

  return Time.isWithinInterval(
    startTime,
    {
      start,
      end: Time.addMinutes(start, minutes),
    },
    { offset },
  );
};

const periodFilterFn = {
  [ESportPeriod.THIRTY_MINUTES]: isWithinMinutes(30),
  [ESportPeriod.ONE_HOUR]: isWithinHours(1),
  [ESportPeriod.THREE_HOURS]: isWithinHours(3),
  [ESportPeriod.FOUR_HOURS]: isWithinHours(4),
  [ESportPeriod.SIX_HOURS]: isWithinHours(6),
  [ESportPeriod.EIGHT_HOURS]: isWithinHours(8),
  [ESportPeriod.TWELVE_HOURS]: isWithinHours(12),
  [ESportPeriod.SIXTEEN_HOURS]: isWithinHours(16),
  [ESportPeriod.DAY]: isWithinHours(24),
  [ESportPeriod.FORTY_EIGHT_HOURS]: isWithinHours(48),
  [ESportPeriod.THREE_DAYS]: isWithinHours(72),
  [ESportPeriod.TODAY]: (offset: number) => <E extends IWithStartTime>({ startTime }: E) => Time.isToday(startTime, { offset }),
  [ESportPeriod.TOMORROW]: (offset: number) => <E extends IWithStartTime>({ startTime }: E) => Time.isTomorrow(startTime, { offset }),
  [ESportPeriod.NEXT_TWO_DAYS]: (offset: number) => <E extends IWithStartTime>({ startTime }: E) => (
    Time.isToday(startTime, { offset }) || Time.isTomorrow(startTime, { offset })
  ),
  [ESportPeriod.ALL]: always(T),
};

export { sportPeriodEnum, periodFilterFn, ESportPeriod };

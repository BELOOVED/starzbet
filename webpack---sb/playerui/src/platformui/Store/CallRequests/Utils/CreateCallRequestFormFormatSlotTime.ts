import { type ELocale, Time } from "@sb/utils";

const createCallRequestFormFormatSlotTime = (locale: ELocale, offset: number, timestamp: number) => Time.format(
  timestamp,
  "HH:mm",
  { locale, offset },
);

const createCallRequestFormFormatSlotTimeRange = (startTime: string, endTime: string, locale: ELocale, offset: number) =>
  `${createCallRequestFormFormatSlotTime(locale, offset, Number(startTime))} - ${createCallRequestFormFormatSlotTime(locale, offset, Number(endTime))}`;

export { createCallRequestFormFormatSlotTimeRange };

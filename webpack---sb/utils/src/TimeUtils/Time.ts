import {
  add,
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  type Duration,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  formatDistance,
  formatDistanceToNowStrict,
  formatDuration,
  formatISO,
  getDate,
  getHours,
  getMilliseconds,
  getMinutes,
  getMonth,
  getSeconds,
  getWeek,
  getYear,
  type Interval,
  intervalToDuration,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
  isPast,
  isSameDay,
  isSameMonth,
  isSameYear,
  isSaturday,
  isSunday,
  isToday,
  isTomorrow,
  isValid,
  isWithinInterval,
  lastDayOfMonth,
  lastDayOfWeek,
  lastDayOfYear,
  type Locale,
  parse,
  setDate,
  setHours,
  setMilliseconds,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subSeconds,
  subWeeks,
  subYears,
} from "date-fns";
import { localeToDateFnsLocaleMap } from "./LocaleToDateFnsLocaleMap";
import { ELocale } from "../ELocale";
import { Logger } from "../InternalLogger";

interface IInterval {
  from: number;
  to: number;
}

interface IOptions extends IWithOptionalLocale {
  offset?: number;
}

interface IWithOptionalLocale {
  locale?: ELocale;
}

type TFormatOptions = Omit<
  IOptions & Parameters<typeof format>[2],
  "locale"
> & IWithOptionalLocale;

type TFormatISOOptions = Omit<
  IOptions & Parameters<typeof formatISO>[1],
  "locale"
> & IWithOptionalLocale;

type TFormatDistanceToNowStrictOptions = Omit<
  IOptions & Parameters<typeof formatDistanceToNowStrict>[1],
  "locale"
> & IWithOptionalLocale;

class Time {
  static format(
    timestamp: number,
    displayFormat: string,
    options?: TFormatOptions,
  ): string {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return format(
      normalizedDate,
      displayFormat,
      {
        locale: getLocale(options),
        weekStartsOn: options?.weekStartsOn,
      },
    );
  }

  static formatISO(
    timestamp: number,
    options?: TFormatISOOptions,
  ): string {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return formatISO(normalizedDate, options);
  }

  static formatOrNoop(
    timestamp: number | undefined,
    displayFormat: string,
    noop: string = "-",
    options?: IOptions,
  ) {
    if (timestamp === undefined) {
      return noop;
    }
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return format(normalizedDate, displayFormat, { locale: getLocale(options) });
  }

  static formatDuration(duration: Duration, locale?: ELocale) {
    return formatDuration(duration, { locale: getLocale({ locale }) });
  }

  static intervalToDuration(timestampA: number, timestampB: number) {
    return intervalToDuration({ start: timestampA, end: timestampB });
  }

  static formatDistance(timestampA: number, timestampB: number, options?: IOptions) {
    const normalizedDateA = getNormalizedDate(timestampA, getOffset(options));
    const normalizedDateB = getNormalizedDate(timestampB, getOffset(options));

    return formatDistance(normalizedDateA, normalizedDateB);
  }

  static formatDistanceToNowStrict(timestamp: number, options?: TFormatDistanceToNowStrictOptions) {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const resolvedELocale = options?.locale ?? ELocale.en_US;

    const libLocale = localeToDateFnsLocaleMap[resolvedELocale];

    return formatDistanceToNowStrict(normalizedDate, {
      ...options,
      locale: libLocale,
    });
  }

  static parse(dateString: string, formatString: string, referenceDate: Date | number, options?: Parameters<typeof parse>[3]) {
    return parse(dateString, formatString, referenceDate, options);
  }

  static startOfDay(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return startOfDay(normalizedDate).getTime();
  }

  static startOfDayUtc(timestamp: number, options?: IOptions): number {
    const startOfWeek = Time.startOfDay(timestamp, options)

    return convertLocalDateToUtc(startOfWeek)
  }

  static startOfMonth(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return startOfMonth(normalizedDate).getTime();
  }

  static startOfMonthUtc(timestamp: number, options?: IOptions): number {
    const startOfMonth = Time.startOfMonth(timestamp, options)

    return convertLocalDateToUtc(startOfMonth)
  }

  static startOfWeek(
    timestamp: number,
    options?: IOptions & Parameters<typeof startOfWeek>[1],
  ): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return startOfWeek(normalizedDate, options).getTime();
  }

  static startOfWeekUtc(
    timestamp: number,
    options?: IOptions & Parameters<typeof startOfWeek>[1],
  ): number {
    const startOfWeek = Time.startOfWeek(timestamp, options)

    return convertLocalDateToUtc(startOfWeek)
  }

  static startOfYear(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return startOfYear(normalizedDate).getTime();
  }

  static startOfYearUtc(timestamp: number, options?: IOptions): number {
    const startOfYear = Time.startOfYear(timestamp, options)

    return convertLocalDateToUtc(startOfYear)
  }

  static endOfDay(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return endOfDay(normalizedDate).getTime();
  }

  static endOfWeek(
    timestamp: number,
    options?: IOptions & Parameters<typeof endOfWeek>[1],
  ): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return endOfWeek(normalizedDate, options).getTime();
  }

  static endOfMonth(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return endOfMonth(normalizedDate).getTime();
  }

  static endOfYear(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return endOfYear(normalizedDate).getTime();
  }

  static intervalOfHours(timestamp: number, amount: number): IInterval {
    const normalizedDate = getNormalizedDate(timestamp);

    return ({
      from: addHours(normalizedDate, -amount).getTime(),
      to: normalizedDate.getTime(),
    });
  }

  static intervalOfDays(timestamp: number, amount: number): IInterval {
    const normalizedDate = getNormalizedDate(timestamp);

    return ({
      from: startOfDay(addDays(normalizedDate, -amount)).getTime(),
      to: endOfDay(normalizedDate).getTime(),
    });
  }

  static isToday(timestamp: number, options?: IOptions): boolean {
    return isToday(getNormalizedDate(timestamp, getOffset(options)));
  }

  static isTomorrow(timestamp: number, options?: IOptions): boolean {
    return isTomorrow(getNormalizedDate(timestamp, getOffset(options)));
  }

  static isBefore(timestamp: number, dateToCompare: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const normalizedDateToCompare = getNormalizedDate(dateToCompare);

    return isBefore(normalizedDate, normalizedDateToCompare);
  }

  static isAfter(timestamp: number, dateToCompare: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const normalizedDateToCompare = getNormalizedDate(dateToCompare);

    return isAfter(normalizedDate, normalizedDateToCompare);
  }

  static isFuture(timestamp: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return isFuture(normalizedDate);
  }

  static isPast(timestamp: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return isPast(normalizedDate);
  }

  static add(timestamp: number, duration: Duration, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return add(normalizedDate, duration).getTime();
  }

  static addSeconds(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return addSeconds(normalizedDate, amount).getTime();
  }

  static addMinutes(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return addMinutes(normalizedDate, amount).getTime();
  }

  static addHours(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return addHours(normalizedDate, amount).getTime();
  }

  static addDays(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return addDays(normalizedDate, amount).getTime();
  }

  static addWeeks(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return addWeeks(normalizedDate, amount).getTime();
  }

  static addMonths(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return addMonths(normalizedDate, amount).getTime();
  }

  static addYears(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return addYears(normalizedDate, amount).getTime();
  }

  static subSeconds(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return subSeconds(normalizedDate, amount).getTime();
  }

  static subMinutes(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return subMinutes(normalizedDate, amount).getTime();
  }

  static subHours(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return subHours(normalizedDate, amount).getTime();
  }

  static subDays(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return subDays(normalizedDate, amount).getTime();
  }

  static subWeeks(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return subWeeks(normalizedDate, amount).getTime();
  }

  static subMonths(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return subMonths(normalizedDate, amount).getTime();
  }

  static subYears(timestamp: number, amount: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return subYears(normalizedDate, amount).getTime();
  }

  static setMilliseconds(timestamp: number, milliseconds: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return setMilliseconds(normalizedDate, milliseconds).getTime();
  }

  static setSeconds(timestamp: number, seconds: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return setSeconds(normalizedDate, seconds).getTime();
  }

  static setMinutes(timestamp: number, minutes: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return setMinutes(normalizedDate, minutes).getTime();
  }

  static setHours(timestamp: number, hours: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return setHours(normalizedDate, hours).getTime();
  }

  static setDay(timestamp: number, day: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return setDate(normalizedDate, day).getTime();
  }

  static setMonth(timestamp: number, month: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return setMonth(normalizedDate, month).getTime();
  }

  static setYear(timestamp: number, year: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return setYear(normalizedDate, year).getTime();
  }

  static isEqual(timestamp: number, dateToCompare: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const normalizedDateToCompare = getNormalizedDate(dateToCompare);

    return isEqual(normalizedDate, normalizedDateToCompare);
  }

  static isWithinInterval(timestamp: number, interval: Interval, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const normalizedInterval = {
      start: getNormalizedDate(+interval.start, getOffset(options)),
      end: getNormalizedDate(+interval.end, getOffset(options)),
    };

    return isWithinInterval(normalizedDate, normalizedInterval);
  }

  static isSameDay(timestamp: number, dateToCompare: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const normalizedDateToCompare = getNormalizedDate(dateToCompare);

    return isSameDay(normalizedDate, normalizedDateToCompare);
  }

  static isSameMonth(timestamp: number, dateToCompare: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const normalizedDateToCompare = getNormalizedDate(dateToCompare);

    return isSameMonth(normalizedDate, normalizedDateToCompare);
  }

  static isSameYear(timestamp: number, dateToCompare: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    const normalizedDateToCompare = getNormalizedDate(dateToCompare);

    return isSameYear(normalizedDate, normalizedDateToCompare);
  }

  static lastDayOfWeek(timestamp: number, options?: IOptions & Parameters<typeof lastDayOfWeek>[1]): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return lastDayOfWeek(normalizedDate, options).getTime();
  }

  static lastDayOfMonth(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return lastDayOfMonth(normalizedDate).getTime();
  }

  static lastDayOfYear(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return lastDayOfYear(normalizedDate).getTime();
  }

  static getMilliseconds(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getMilliseconds(normalizedDate);
  }

  static getSeconds(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getSeconds(normalizedDate);
  }

  static getMinutes(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getMinutes(normalizedDate);
  }

  static getHours(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getHours(normalizedDate);
  }


  static getDay(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getDate(normalizedDate);
  }

  static getWeek(timestamp: number, options?: IOptions & Parameters<typeof getWeek>[1]): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getWeek(normalizedDate, options);
  }

  static getMonth(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getMonth(normalizedDate);
  }

  static getYear(timestamp: number, options?: IOptions): number {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return getYear(normalizedDate);
  }

  static convertTzOffsetInMinutesToMs(offset: number) {
    return (offset / 60) * -3600000;
  }

  static getClientTimezoneOffset(): number {
    return Time.convertTzOffsetInMinutesToMs(new Date().getTimezoneOffset());
  }

  static getClientTimezoneName() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  static differenceInYears(leftDate: number, rightDate: number, options?: IOptions): number {
    const normalizedLeftDate = getNormalizedDate(leftDate, getOffset(options));

    const normalizedRightDate = getNormalizedDate(rightDate, getOffset(options));

    return differenceInYears(normalizedLeftDate, normalizedRightDate);
  }

  static differenceInMonths(leftDate: number, rightDate: number, options?: IOptions): number {
    const normalizedLeftDate = getNormalizedDate(leftDate, getOffset(options));

    const normalizedRightDate = getNormalizedDate(rightDate, getOffset(options));

    return differenceInMonths(normalizedLeftDate, normalizedRightDate);
  }

  static differenceInDays(leftDate: number, rightDate: number, options?: IOptions): number {
    const normalizedLeftDate = getNormalizedDate(leftDate, getOffset(options));

    const normalizedRightDate = getNormalizedDate(rightDate, getOffset(options));

    return differenceInDays(normalizedLeftDate, normalizedRightDate);
  }

  static differenceInMilliseconds(leftDate: number, rightDate: number, options?: IOptions): number {
    const normalizedLeftDate = getNormalizedDate(leftDate, getOffset(options));

    const normalizedRightDate = getNormalizedDate(rightDate, getOffset(options));

    return differenceInMilliseconds(normalizedLeftDate, normalizedRightDate);
  }

  static differenceInSeconds(leftDate: number, rightDate: number, options?: IOptions): number {
    const normalizedLeftDate = getNormalizedDate(leftDate, getOffset(options));

    const normalizedRightDate = getNormalizedDate(rightDate, getOffset(options));

    return differenceInSeconds(normalizedLeftDate, normalizedRightDate);
  }

  static differenceInHours(leftDate: number, rightDate: number, options?: IOptions): number {
    const normalizedLeftDate = getNormalizedDate(leftDate, getOffset(options));

    const normalizedRightDate = getNormalizedDate(rightDate, getOffset(options));

    return differenceInHours(normalizedLeftDate, normalizedRightDate);
  }

  static differenceInMinutes(leftDate: number, rightDate: number, options?: IOptions): number {
    const normalizedLeftDate = getNormalizedDate(leftDate, getOffset(options));

    const normalizedRightDate = getNormalizedDate(rightDate, getOffset(options));

    return differenceInMinutes(normalizedLeftDate, normalizedRightDate);
  }

  static dateToUtc(date: Date): Date {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
  }

  static isValid(timestamp: number, options?: IOptions): boolean {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return isValid(normalizedDate);
  }

  static isWeekDays(timestamp: number, options?: IOptions) {
    const normalizedDate = getNormalizedDate(timestamp, getOffset(options));

    return !isSaturday(normalizedDate) && !isSunday(normalizedDate);
  }
}

function convertLocalDateToUtc(date: number): number {
  return date - (new Date(date).getTimezoneOffset() * 60 * 1000);
}

function getOffset(options: IOptions = {}) {
  return options.offset;
}

function getLocale(options: IOptions = {}): Locale {
  const { locale } = options;

  if (locale) {
    const dateFnsLocale = localeToDateFnsLocaleMap[locale];

    if (dateFnsLocale) {
      return dateFnsLocale
    }

    Logger.warn(`Time: unsupported locale: ${options.locale}`);
  }

  return localeToDateFnsLocaleMap[ELocale.en_US];
}

function getNormalizedDate(timestamp: number, offset?: number): Date {
  if (!Number.isInteger(timestamp)) {
    const timestampType = typeof timestamp;


    throw new Error(`Time: Invalid timestamp type: "typeof timestamp = ${timestampType}", only integer number allowed`);
  }

  if (offset !== undefined) {
    if (!Number.isInteger(offset)) {
      const offsetType = typeof offset;

      throw new Error(`Time: Invalid offset type: "typeof offset = ${offsetType}", only integer number allowed`);
    }

    return Time.dateToUtc(new Date(timestamp + offset));
  }

  return new Date(timestamp);
}

export {
  Time,
  type Duration as TDuration,
  convertLocalDateToUtc,
};

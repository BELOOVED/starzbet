// @ts-nocheck
/* eslint-disable rulesdir/jsx-no-reference-prop */
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { Calendar, DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { isNil, localeToDateFnsLocaleMap, stopPropagation, Time } from "@sb/utils";
import classes from "./Datepicker.module.css";
import { Logger } from "../../../../../../common/Utils/Logger";
import { localeSelector } from "../../../../../Store/Locale/Selectors/localeSelector";

const selectLocale = (currentLocale) => {
  if (localeToDateFnsLocaleMap[currentLocale]) {
    return localeToDateFnsLocaleMap[currentLocale];
  }

  Logger.warn.react(`Datepicker: unsupported locale: ${currentLocale}`);

  return localeToDateFnsLocaleMap.en_US;
};

const DateRangePicker = memo(({
  fit,
  showed,
  changeInterval,
  startDate = null,
  endDate = null,
}) => {
  const locale = useSelector(localeSelector);

  const [state, setState] = useState([
    {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: "selection",
    },
  ]);

  const changeHandler = useCallback(
    (item: any) => {
      setState([item.selection]);
      changeInterval(Number(item.selection.startDate), Time.endOfDay(Number(item.selection.endDate)));
    },
    [],
  );

  if (!showed) {
    return null;
  }

  return (
    <div
      className={clsx(classes.datepickerContainer, fit && classes.fit)}
      onClick={(e) => e.stopPropagation()}
    >
      <DateRange
        locale={selectLocale(locale)}
        className={classes.datepicker}
        editableDateInputs={true}
        onChange={changeHandler}
        showMonthAndYearPickers={false}
        ranges={state}
        weekdayDisplayFormat={"EEEEE"}
        dateDisplayFormat={"dd.MM.yyyy"}
        startDatePlaceholder={"dd.mm.yyyy"}
        endDatePlaceholder={"dd.mm.yyyy"}

      />
    </div>
  );
});
DateRangePicker.displayName = "DateRangePicker";

interface IDatePickerProps {
  date: string | number | null;
  changeDate: (val: string) => void;
  showed: boolean;
  fit?: boolean;
  className?: string;
  disabledDay?: (date: Date) => boolean;
}

const DatePicker = memo<IDatePickerProps>(({
  className,
  fit,
  showed,
  date,
  changeDate,
  disabledDay,
}) => {
  const locale = useSelector(localeSelector);

  const changeHandler = useCallback(
    (item: any) => {
      changeDate(new Date(Time.startOfDay(item.getTime())).getTime());
    },
    [],
  );

  if (!showed) {
    return null;
  }

  const calendarDate = isNil(date)
    ? undefined
    : new Date(date);

  return (
    <div
      className={clsx(classes.datepickerContainer, fit && classes.fit, className)}
      onClick={stopPropagation}
    >
      <Calendar
        color={"var(--blue)"}
        date={calendarDate}
        locale={selectLocale(locale)}
        className={classes.datepicker}
        editableDateInputs={true}
        onChange={changeHandler}
        showMonthAndYearPickers={false}
        weekdayDisplayFormat={"EEEEE"}
        dateDisplayFormat={"dd MMMM yyyy"}
        minDate={new Date()}
        disabledDay={disabledDay}
      />
    </div>
  );
});
DatePicker.displayName = "DatePicker";

export { DateRangePicker, DatePicker };

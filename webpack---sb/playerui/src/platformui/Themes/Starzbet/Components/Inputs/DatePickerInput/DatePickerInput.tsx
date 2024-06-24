import clsx from "clsx";
import { memo, useCallback } from "react";
import { useTranslation } from "@sb/translator";
import { isNotVoid, isVoid, useDropdown } from "@sb/utils";
import { qaAttr } from "@sb/qa-attributes";
import classes from "./DatePickerInput.module.css";
import {
  type IDatePickerInputProps,
} from "../../../../../../common/Components/CreateCallRequestFormFactory/CreateCallRequestFormFactoryModel";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { DatePicker } from "../../../Desktop/Components/Datepicker/Datepicker";

const DatePickerInput = memo<IDatePickerInputProps>(({
  value,
  onChange,
  status,
  placeholder,
  disabledDay,
  qaAttribute,
}) => {
  const [t] = useTranslation();
  const [ref, showed, _, toggle] = useDropdown();

  const enhancedOnChange = useCallback(
    (newValue: string) => {
      onChange(newValue);

      toggle();
    },
    [],
  );

  return (
    <div className={classes.datePickerField} ref={ref}>
      <div
        className={clsx(classes.input, value && classes.filled, status === "error" && classes.incorrect)}
        onClick={toggle}
        {...qaAttr(qaAttribute)}
      >
        {
          isNotVoid(value)
            ? <DateFormat date={value} format={"dd/MM/yyyy"} />
            : (
              <div className={classes.placeholder}>
                {t(placeholder)}
              </div>
            )
        }
      </div>

      <DatePicker
        disabledDay={disabledDay}
        showed={showed}
        changeDate={enhancedOnChange}
        date={isVoid(value) ? null : value}
      />
    </div>
  );
});
DatePickerInput.displayName = "DatePickerInput";

export { DatePickerInput };

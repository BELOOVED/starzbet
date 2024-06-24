import clsx from "clsx";
import { createElement } from "react";
import { isNotEmpty, isNotNil } from "@sb/utils";
import { qaAttr } from "@sb/qa-attributes";
import classes from "./Select.module.css";
import { Ellipsis } from "../../../../../platformui/Components/Ellipsis/Ellipsis";
import { CustomScrollbar } from "../../../../../platformui/Themes/Starzbet/Desktop/Components/CustomScrollbar/CustomScrollbar";
import { CheckIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/CheckIcon/CheckIcon";
import { defaultOption, type IOptionProps, type ISelectProps, type TSelectValue } from "../../../../Components/Field/SelectModel";
import { useSelectHandler } from "../../../../Hooks/UseSelectHandler";
import { dataItemAttr, EDataItemAttr } from "../../../../DataItemAttr";
import { CloseDefaultIcon } from "../Icons/CloseIcon/CloseIcon";
import { Empty } from "../Empty/Empty";
import { CollapseIcon } from "../Icons/CollapseIcon/CollapseIcon";

const MAX_HEIGHT_DROPDOWN = 190;

const Option = <Value extends TSelectValue>({
  option,
  optionComponent,
  value,
  onChange,
  qaAttribute,
}: IOptionProps<Value>) => {
  const onClick = () => onChange(option.value);
  const isSelected = option.value === value;

  const optionClassName = clsx(
    classes.option,
    isSelected && classes.selected,
    option.disabled && classes.disabled,
  );

  return (
    <div
      className={optionClassName}
      onClick={onClick}
      {...qaAttr(qaAttribute)}
      {...dataItemAttr(EDataItemAttr.selectListOption)}
      key={option.value}
    >
      <Ellipsis className={classes.optionValue}>
        {createElement(optionComponent, option)}
      </Ellipsis>

      {isSelected ? <CheckIcon size={"s"} /> : null}
    </div>
  );
};
Option.displayName = "Option";

const Select = <Value extends TSelectValue>({
  onChange,
  value,
  disabled,
  options,
  placeholder,
  optionComponent = defaultOption,
  className,
  allowClear = false,
  emptyComponent = Empty,
  status,
  qaAttributeSelect,
  qaAttributeOption,
}: ISelectProps<Value>) => {
  const {
    ref,
    revertDropdown,
    expanded,
    open,
    onClearValue,
    changeOption,
  } = useSelectHandler(onChange, MAX_HEIGHT_DROPDOWN);

  const isSelected = isNotNil(value);

  const selectClass = clsx(
    classes.selectInput,
    expanded && classes.expanded,
    disabled && classes.disabled,
    status === "error" && classes.error,
    isSelected && classes.selected,
    className,
  );

  const optionsClass = clsx(
    classes.options,
    revertDropdown && classes.revertDirection,
  );

  const optionsElement = (
    expanded
      ? (
        <div className={optionsClass} {...dataItemAttr(EDataItemAttr.selectList)}>
          <CustomScrollbar className={classes.scrollbar}>
            <div className={classes.optionList}>
              {
                isNotEmpty(options)
                  ? (
                    options.map((option, i) => (
                      <Option
                        value={value}
                        optionComponent={optionComponent}
                        onChange={changeOption}
                        qaAttribute={qaAttributeOption}
                        option={option}
                        key={i}
                      />
                    ))
                  )
                  : createElement(emptyComponent)
              }
            </div>
          </CustomScrollbar>
        </div>
      )
      : null
  );

  return (
    <div className={classes.select} ref={ref}>
      <div
        className={selectClass}
        onClick={open}
        {...qaAttr(qaAttributeSelect)}
        {...dataItemAttr(EDataItemAttr.selectInput)}
      >
        <Ellipsis className={classes.selectValue}>
          {isSelected ? createElement(optionComponent, { value }) : placeholder}
        </Ellipsis>

        {
          allowClear && isSelected
            ? <CloseDefaultIcon className={classes.iconControl} onClick={onClearValue} size={"xs"} />
            : <CollapseIcon expanded={expanded} size={"s"} />
        }
      </div>

      {optionsElement}
    </div>
  );
};
Select.displayName = "Select";

export { Select };

import { type ComponentType } from "react";
import { type IWithFieldPath } from "@sb/form-new";
import { type IWithQaAttribute, type IWithSelectQaAttributes } from "@sb/qa-attributes";
import { type TDefaultFieldProps, type TFieldStatus } from "./FieldCreator";

type TSelectValue = string | number;

type TSelectOnChange<Value extends TSelectValue> = (value: Value | undefined) => void

interface ISelectProps<Value extends TSelectValue> extends IWithClassName, IWithSelectQaAttributes {
  containerClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  status: TFieldStatus;
  allowClear?: boolean;
  options: ISelectOption<Value>[];
  emptyComponent?: ComponentType;
  value: Value | null | undefined;
  onChange: TSelectOnChange<Value>;
  optionComponent?: ComponentType<ISelectOption<Value>>;
  valueComponent?: ComponentType<ISelectOption<Value>>;
  prefix?: ComponentType;
}

interface ISelectOption<Value> {
  value: Value;
  disabled?: boolean;
}

type TSelectFieldProps<Value extends TSelectValue> =
  IWithFieldPath &
  Omit<TDefaultFieldProps, "prefix"> &
  Omit<ISelectProps<Value>, "onChange" | "value" | "status">;

const defaultOption = <Value extends TSelectValue>(option: ISelectOption<Value>) => option.value;

const toSelectOption = <Value extends TSelectValue>(id: Value): ISelectOption<Value> => ({
  value: id,
});

const getSelectOptions = <Value extends TSelectValue>(list: Value[]) => list.map(toSelectOption);

interface IOptionProps<Value extends TSelectValue> extends IWithQaAttribute {
  option: ISelectOption<Value>;
  value: Value | null | undefined;
  onChange: (value: Value) => void;
  optionComponent: ComponentType<ISelectOption<Value>>;
}

export type {
  TSelectOnChange,
  TSelectValue,
  ISelectProps,
  ISelectOption,
  TSelectFieldProps,
  IOptionProps,
};

export { defaultOption, toSelectOption, getSelectOptions };

import { type ComponentType } from "react";
import { simpleValueExtractor } from "@sb/form-new";
import { type ISelectProps, type TSelectFieldProps, type TSelectValue } from "./SelectModel";
import { FieldCreator, type TDefaultFieldProps } from "./FieldCreator";

type TSelectFieldCreator<Value extends TSelectValue> = TSelectFieldProps<Value> & {
  ThemedField: ComponentType<TDefaultFieldProps>;
  ThemedSelect: ComponentType<ISelectProps<Value>>;
}

const SelectFieldCreator = <Value extends TSelectValue>({
  placeholder,
  ThemedField,
  ThemedSelect,
  options,
  optionComponent,
  emptyComponent,
  allowClear,
  qaAttributeSelect,
  qaAttributeOption,
  qaAttributeList,
  prefix,
  ...rest
}: TSelectFieldCreator<Value>) => (
    <FieldCreator<Value>
      ThemedField={ThemedField}
      valueExtractor={simpleValueExtractor}
      {...rest}
    >
      {
        (props) => (
          <ThemedSelect
            {...props}
            placeholder={placeholder}
            prefix={prefix}
            options={options}
            optionComponent={optionComponent}
            emptyComponent={emptyComponent}
            allowClear={allowClear}
            qaAttributeSelect={qaAttributeSelect}
            qaAttributeOption={qaAttributeOption}
            qaAttributeList={qaAttributeList}
          />
        )
      }
    </FieldCreator>
  );
SelectFieldCreator.displayName = "SelectFieldCreator";

export { SelectFieldCreator };

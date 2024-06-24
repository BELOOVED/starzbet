import { type TSelectFieldProps, type TSelectValue } from "../../../../../Components/Field/SelectModel";
import { SelectFieldCreator } from "../../../../../Components/Field/SelectFieldCreator";
import { Select } from "../../Select/Select";
import { Field } from "../Field";

const SelectField = <Value extends TSelectValue>(props: TSelectFieldProps<Value>) => (
  <SelectFieldCreator<Value>
    ThemedField={Field}
    ThemedSelect={Select}
    {...props}
  />
);
SelectField.displayName = "SelectField";

export { SelectField };

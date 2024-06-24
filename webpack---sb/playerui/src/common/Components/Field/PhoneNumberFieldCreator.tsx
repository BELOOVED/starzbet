import { type ComponentType, memo } from "react";
import { type IWithFieldPath } from "@sb/form-new";
import type { IWithSelectQaAttributes } from "@sb/qa-attributes";
import { type TPhoneValue } from "../../Model/TPhoneValue";
import { FieldCreator, type TDefaultFieldProps, type TFieldChildProps } from "./FieldCreator";

interface IPhoneNumberInputProps extends TFieldChildProps<TPhoneValue> {
  inputQaAttribute?: string;
  placeholder?: string;
}

type TPhoneNumberBaseFieldProps = TDefaultFieldProps & IWithFieldPath & {
  inputQaAttribute?: string;
}

interface IPhoneNumberFieldProps extends TPhoneNumberBaseFieldProps, IWithSelectQaAttributes {
  ThemedField: ComponentType<TDefaultFieldProps>;
  ThemedPhoneNumberInput: ComponentType<IPhoneNumberInputProps & IWithSelectQaAttributes>;
}

const transformPhoneNumber = (v: Partial<TPhoneValue>): Partial<TPhoneValue> => ({
  code: v.code,
  number: v.number?.replace(/[^0-9]/g, ""),
});

const PhoneNumberFieldCreator = memo<IPhoneNumberFieldProps>(({
  ThemedField,
  ThemedPhoneNumberInput,
  placeholder,
  inputQaAttribute,
  qaAttributeSelect,
  qaAttributeOption,
  ...rest
}) => (
  <FieldCreator<TPhoneValue>
    ThemedField={ThemedField}
    valueExtractor={transformPhoneNumber}
    {...rest}
  >
    {
      (props) => (
        <ThemedPhoneNumberInput
          {...props}
          value={props.value}
          placeholder={placeholder}
          inputQaAttribute={inputQaAttribute}
          qaAttributeOption={qaAttributeOption}
          qaAttributeSelect={qaAttributeSelect}
        />
      )
    }
  </FieldCreator>
));
PhoneNumberFieldCreator.displayName = "PhoneNumberFieldCreator";

export { PhoneNumberFieldCreator };
export type { IPhoneNumberInputProps, TPhoneNumberBaseFieldProps };

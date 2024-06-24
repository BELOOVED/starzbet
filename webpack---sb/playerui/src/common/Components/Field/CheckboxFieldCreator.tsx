import { type ChangeEvent, type ComponentType, memo } from "react";
import { type IWithQaAttribute } from "@sb/qa-attributes";
import { simpleValueExtractor, type TValueExtractor } from "@sb/form-new";
import { isNil, type TNullable } from "@sb/utils";
import type { TTTextBaseFieldProps } from "./TextFieldCreator";
import { FieldCreator, type TDefaultFieldProps, type TFieldChildProps } from "./FieldCreator";

const checkboxValueConverter = (val: TNullable<boolean>) => !!val;

const checkboxValueExtractor: TValueExtractor<boolean, ChangeEvent<HTMLInputElement>> = (event) => {
  if (isNil(event) || isNil(event.target) || !event.target.checked) {
    return undefined;
  }

  return true;
};

type TCheckboxFieldCreator = Omit<TTTextBaseFieldProps, "prefix"> & {
  ThemedField: ComponentType<TDefaultFieldProps>;
  ThemedInput: ComponentType<TFieldChildProps<boolean> & IWithQaAttribute>;
}

const CheckboxFieldCreator = memo<TCheckboxFieldCreator>(({
  ThemedField,
  ThemedInput,
  qaAttribute,
  ...rest
}) => (
  <FieldCreator<boolean>
    ThemedField={ThemedField}
    valueConverter={checkboxValueConverter}
    valueExtractor={checkboxValueExtractor}
    ghost
    {...rest}
  >
    {
      (props) => (
        <ThemedInput
          {...props}
          value={props.value}
          qaAttribute={qaAttribute}
        />
      )
    }
  </FieldCreator>
));
CheckboxFieldCreator.displayName = "CheckboxFieldCreator";

type TBonusFieldCreator = Omit<TCheckboxFieldCreator, "ThemedInput"> & {
  ThemedField: ComponentType<TDefaultFieldProps>;
  ThemedInput: ComponentType<TFieldChildProps<string> & IWithQaAttribute>;
}

const BonusFieldCreator = memo<TBonusFieldCreator>(({
  ThemedField,
  ThemedInput,
  qaAttribute,
  ...rest
}) => (
  <FieldCreator<string>
    ThemedField={ThemedField}
    valueExtractor={simpleValueExtractor}
    ghost
    hideError
    {...rest}
  >
    {
      (props) => (
        <ThemedInput
          {...props}
          qaAttribute={qaAttribute}
        />
      )
    }
  </FieldCreator>
));
BonusFieldCreator.displayName = "BonusFieldCreator";

export { CheckboxFieldCreator, BonusFieldCreator };

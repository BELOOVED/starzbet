import { type ComponentType, type HTMLProps, memo } from "react";
import { type IWithFieldPath } from "@sb/form-new";
import { type IWithQaAttribute } from "@sb/qa-attributes";
import { removeNilProperties, type TComponent } from "@sb/utils";
import { FieldCreator, type TDefaultFieldProps, type TFieldStatus } from "./FieldCreator";

type TInputHTMLProps = Omit<HTMLProps<HTMLInputElement>, "label" | "prefix">;

interface IInputBaseProps extends IWithQaAttribute, TInputHTMLProps {
  value: string | undefined;
  status?: TFieldStatus;
  postfix?: TComponent;
  prefix?: TComponent;
  containerClassName?: string;
  showButtonQaAttribute?: string;
}

interface IAuthInputProps extends Omit<IInputBaseProps, "prefix"> {
  icon?: TComponent;
}

type TInputProps = Omit<IInputBaseProps, "onBlur" | "onFocus" | "onChange" | "value">

type TTTextBaseFieldProps = IWithFieldPath &
  Omit<TDefaultFieldProps, "prefix"> &
  TInputProps

type TTextFieldProps = TTTextBaseFieldProps & {
  ThemedField: ComponentType<TDefaultFieldProps>;
  ThemedInput: ComponentType<IInputBaseProps>;
}

const TextFieldCreator = memo<TTextFieldProps>(({
  ThemedField,
  ThemedInput,
  placeholder,
  qaAttribute,
  type,
  autoComplete,
  validationQaAttribute,
  prefix,
  postfix,
  showButtonQaAttribute,
  ...rest
}) => (
  <FieldCreator<string>
    ThemedField={ThemedField}
    validationQaAttribute={validationQaAttribute}
    {...rest}
  >
    {
      ({ value, ...fromProps }) => {
        const externalProps = removeNilProperties({
          placeholder,
          qaAttribute,
          type,
          autoComplete,
          prefix,
          postfix,
          showButtonQaAttribute,
        });

        return <ThemedInput {...externalProps} {...fromProps} value={value ?? ""} />;
      }
    }
  </FieldCreator>
));
TextFieldCreator.displayName = "TextFieldCreator";

export type {
  IInputBaseProps,
  TTTextBaseFieldProps,
  IAuthInputProps,
};
export { TextFieldCreator };

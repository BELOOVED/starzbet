import { type ComponentType, type HTMLProps, memo } from "react";
import { type IWithFieldPath } from "@sb/form-new";
import { type IWithQaAttribute } from "@sb/qa-attributes";
import { FieldCreator, type TDefaultFieldProps, type TFieldStatus } from "./FieldCreator";

type TTextareaHTMLProps = Omit<HTMLProps<HTMLTextAreaElement>, "label">;

interface ITextareaBaseProps extends IWithQaAttribute, TTextareaHTMLProps {
  status?: TFieldStatus;
}

type TTextareaProps = Omit<ITextareaBaseProps, "onBlur" | "onFocus" | "onChange" | "value">

type TTextBaseFieldProps = IWithFieldPath &
  TDefaultFieldProps &
  TTextareaProps

type TTextFieldProps = TTextBaseFieldProps & {
  ThemedField: ComponentType<TDefaultFieldProps>;
  ThemedTextarea: ComponentType<ITextareaBaseProps>;
}

const TextareaFieldCreator = memo<TTextFieldProps>(({
  ThemedField,
  ThemedTextarea,
  placeholder,
  qaAttribute,
  ...rest
}) => (
  <FieldCreator<string> ThemedField={ThemedField} {...rest}>
    {
      (props) => (
        <ThemedTextarea
          {...props}
          value={props.value ?? ""}
          placeholder={placeholder}
          qaAttribute={qaAttribute}
        />
      )
    }
  </FieldCreator>
));
TextareaFieldCreator.displayName = "TextareaFieldCreator";

export { TextareaFieldCreator, type ITextareaBaseProps, type TTextBaseFieldProps };

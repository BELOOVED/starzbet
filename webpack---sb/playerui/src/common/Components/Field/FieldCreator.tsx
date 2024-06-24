import { type ComponentType, createElement, type DetailedHTMLProps, type HTMLAttributes, type ReactNode } from "react";
import {
  selectIsFormSubmittingStarted,
  type TFieldError,
  type TFieldPath,
  type TFieldValue,
  type TValueExtractor,
  useFormInputField,
  useFormSelector,
} from "@sb/form-new";
import { type TNullable } from "@sb/utils";
import { type IOptions } from "@sb/translator";
import { useFormFieldErrors } from "./UseFormFieldErrors";

type TDivHTMLProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type TFieldStatus = "default" | "error";

type TDefaultFieldProps = {
    label?: ReactNode;
    caption?: ReactNode;
    optional?: boolean;
    status?: TFieldStatus;
    ghost?: boolean;
    hideError?: boolean;
    valueExtractor?: TValueExtractor;
    placeholder?: string;
    fieldQaAttribute?: string;
    validationQaAttribute?: string;
  }
  & TDivHTMLProps;

type TFieldChildProps<Value> = {
  value: Value | undefined;
  onChange: (value: unknown) => void;
  disabled?: boolean;
  status: TFieldStatus;
}

type TBaseFieldProps<Value extends TFieldValue, InputValue extends TFieldValue = Value> =
  {
    fieldPath: TFieldPath;
    valueConverter?: (value: TNullable<Value>) => InputValue | undefined;
  }
  & Omit<TDefaultFieldProps, "children" | "title" | "status">;

type TFieldProps<
  Value extends TFieldValue,
  InputValue extends TFieldValue = Value,
> = {
    ThemedField: ComponentType<TDefaultFieldProps>;
    children: ComponentType<TFieldChildProps<InputValue>>;
  }
  & TBaseFieldProps<Value, InputValue>;

type TValidatorResult = {
  tKey: string;
  options?: IOptions;
};

const baseValueConverter = <
  Value extends TFieldValue,
  InputValue extends TFieldValue = Value
>(
    value: TNullable<Value>,
  ): InputValue | undefined =>
    value === null ? undefined : value as unknown as InputValue;

const FieldCreator = <
  Value extends TFieldValue,
  InputValue extends TFieldValue = Value,
>({
    ThemedField,
    children,
    fieldPath,
    valueExtractor,
    valueConverter = baseValueConverter,
    caption,
    ...rest
  }: TFieldProps<Value, InputValue>) => {
  const {
    input,
    disabled,
  } = useFormInputField<Value, TFieldError | TValidatorResult>(fieldPath, false, valueExtractor);
  const errors = useFormFieldErrors(fieldPath);
  const isFormSubmitting = useFormSelector(selectIsFormSubmittingStarted);

  const status = errors ? "error" : "default";

  return (
    <ThemedField
      status={status}
      caption={errors || caption}
      {...rest}
    >
      {
        createElement(
          children,
          {
            ...input,
            value: valueConverter(input.value),
            disabled: disabled || isFormSubmitting, // todo use form extension/decorator
            status,
          },
        )
      }
    </ThemedField>
  );
};
FieldCreator.displayName = "FieldCreator";

export {
  FieldCreator,
  type TDefaultFieldProps,
  type TFieldChildProps,
  type TFieldStatus,
};

import clsx from "clsx";
import { type ChangeEventHandler, type ComponentType, memo, useCallback, useEffect } from "react";
import { getPhoneCodesList } from "@sb/phone-number";
import type { IWithSelectQaAttributes } from "@sb/qa-attributes";
import classes from "./PhoneNumberInputCreator.module.css";
import { getDefaultPhoneCode, phoneCodeCountry } from "../../Utils/GetDefaultPhoneCode";
import { type IPhoneNumberInputProps } from "../Field/PhoneNumberFieldCreator";
import type { ISelectOption, ISelectProps } from "../Field/SelectModel";
import { type IInputBaseProps } from "../Field/TextFieldCreator";

interface IPhoneNumberInputCreatorProps extends IPhoneNumberInputProps, IWithClassName, IWithSelectQaAttributes {
  Option: ComponentType<ISelectOption<string>>;
  Select: ComponentType<ISelectProps<string>>;
  Input: ComponentType<IInputBaseProps>;
  containerClassName?: string;
}

const phoneCodesList = getPhoneCodesList(phoneCodeCountry);

const codesListAsOption = phoneCodesList.map((value) => ({ value }));

const PhoneNumberInputCreator = memo<IPhoneNumberInputCreatorProps>(({
  value,
  onChange,
  disabled,
  status,
  placeholder,
  Input,
  Select,
  Option,
  className,
  inputQaAttribute,
  containerClassName,
  qaAttributeSelect,
  qaAttributeOption,
}) => {
  const onCodeChange = useCallback(
    (code: string | undefined) => {
      onChange({ ...value, code });
    },
    [onChange, value?.code, value?.number],
  );

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChange({ ...value, number: event.target.value });
    },
    [onChange, value?.code, value?.number],
  );

  //todo remove after form-new fix
  useEffect(
    () => {
      if (!value?.code) {
        onChange({ ...value, code: getDefaultPhoneCode() });
      }
    },
    [onChange, value?.code],
  );

  return (
    <div className={clsx(classes.phoneNumberInput, className)}>
      <Select
        status={status}
        options={codesListAsOption}
        value={value?.code}
        onChange={onCodeChange}
        disabled={disabled}
        optionComponent={Option}
        qaAttributeSelect={qaAttributeSelect}
        qaAttributeOption={qaAttributeOption}
      />

      <Input
        status={status}
        value={value?.number ?? ""}
        onChange={onInputChange}
        disabled={disabled}
        placeholder={placeholder}
        qaAttribute={inputQaAttribute}
        containerClassName={containerClassName}
      />
    </div>
  );
});
PhoneNumberInputCreator.displayName = "PhoneNumberInputCreator";

export { PhoneNumberInputCreator };

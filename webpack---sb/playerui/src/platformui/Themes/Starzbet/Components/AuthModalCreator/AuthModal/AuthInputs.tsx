import { memo } from "react";
import { type TComponent } from "@sb/utils";
import { platformui_starzbet_placeholder_password, type TTKeys } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TFieldPath } from "@sb/form-new";
import { useTranslation } from "@sb/translator";
import { Field } from "../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { TextFieldCreator, type TTTextBaseFieldProps } from "../../../../../../common/Components/Field/TextFieldCreator";
import { PasswordInput } from "../../../../../../common/Themes/Starzbet/Components/Input/PasswordInput";
import { Input } from "../../../../../../common/Themes/Starzbet/Components/Input/Input";

type TBaseAuthInput = {
  fieldPath: TFieldPath;
  tKey: TTKeys;
  icon?: TComponent;
} & TTTextBaseFieldProps

const BaseAuthInput = memo<TBaseAuthInput>(({ tKey, placeholder = tKey, ...rest }) => {
  const [t] = useTranslation();

  return (
    <TextFieldCreator
      ThemedField={Field}
      ThemedInput={Input}
      label={t(tKey)}
      placeholder={t.plain(placeholder)}
      {...rest}
    />
  );
});
BaseAuthInput.displayName = "BaseAuthInput";

interface IPasswordAuthInput extends Omit<TBaseAuthInput, "tKey"> {
  tKey?: TTKeys;
}

const PasswordAuthInput = memo<IPasswordAuthInput>(({
  tKey = platformui_starzbet_placeholder_password,
  ...rest
}) => {
  const [t] = useTranslation();

  return (
    <TextFieldCreator
      ThemedField={Field}
      ThemedInput={PasswordInput}
      label={t(tKey)}
      placeholder={t.plain(tKey)}
      {...rest}
    />
  );
});
PasswordAuthInput.displayName = "PasswordAuthInput";

export { BaseAuthInput, PasswordAuthInput };


import { type ComponentType, memo, useReducer } from "react";
import { not, type TVoidFn, withProps } from "@sb/utils";
import type { IWithQaAttribute } from "@sb/qa-attributes";
import type { IInputBaseProps } from "../Field/TextFieldCreator";

interface IEyeComponent extends IWithQaAttribute {
  onClick: TVoidFn;
  hidden: boolean;
  eyeClasses?: string;
  eyeWrapperClasses?: string;
}

interface IPasswordInputCreatorProps extends Omit<IInputBaseProps, "type" | "postfix"> {
  InputComponent: ComponentType<IInputBaseProps>;
  EyeComponent: ComponentType<IEyeComponent>;
}

const PasswordInputCreator = memo<IPasswordInputCreatorProps>(({
  InputComponent,
  EyeComponent,
  showButtonQaAttribute,
  ...props
}) => {
  const [hidden, toggleHidden] = useReducer(not<boolean>, true);

  const Postfix = withProps(EyeComponent)({
    onClick: toggleHidden,
    hidden,
    qaAttribute: showButtonQaAttribute,
  });

  return <InputComponent {...props} type={hidden ? "password" : "text"} postfix={Postfix} />;
});
PasswordInputCreator.displayName = "PasswordInputCreator";

export { PasswordInputCreator };

import { withProps } from "@sb/utils";
import classes from "./Input.module.css";
import { EyeComponent } from "../../../../../platformui/Themes/Starzbet/Components/EyeComponent/EyeComponent";
import { PasswordInputCreator } from "../../../../Components/PasswordInputCreator/PasswordInputCreator";
import { Input } from "./Input";

const WrappedEyeComponent = withProps(EyeComponent)({ eyeWrapperClasses: classes.hidden });

const PasswordInput = withProps(PasswordInputCreator)({
  InputComponent: Input,
  EyeComponent: WrappedEyeComponent,
});

export { PasswordInput };

import clsx from "clsx";
import { type ButtonHTMLAttributes, type DetailedHTMLProps, forwardRef, type InputHTMLAttributes, memo } from "react";

type TInputBaseProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TButtonBaseProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ResetedInput = memo(forwardRef<HTMLInputElement, TInputBaseProps>(({ className, ...rest }, ref) => (
  <input {...rest} className={clsx("sb__reset_input", className)} ref={ref} />
)));
ResetedInput.displayName = "ResetedInput";

const ResetedButton = memo<TButtonBaseProps>(({ className, ...rest }) => (
  <button {...rest} className={clsx("sb__reset_input", className)} />
));
ResetedButton.displayName = "ResetedButton";

export { ResetedInput, ResetedButton };

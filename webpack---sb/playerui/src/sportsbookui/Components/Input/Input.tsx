// @ts-nocheck
import { memo, type ReactNode, useCallback, useState } from "react";
import { useTranslation } from "@sb/translator";
import { type TVoidFn } from "@sb/utils";
import { noop } from "../../Utils/Noop";
import { ResetedInput } from "../ResetedInput/ResetedInput";

interface IInputProps extends Record<string, unknown> {
  placeholder?: ReactNode;
  placeholderTKey?: string;
  placeholderClass?: string;
  onFocus?: TVoidFn;
  onBlur?: TVoidFn;
  value: string;
}

const Input = memo<IInputProps>(({
  placeholder,
  placeholderTKey,
  placeholderClass = "",
  onFocus = noop,
  onBlur = noop,
  value,
  ...rest
}) => {
  const [t] = useTranslation();

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const focusHandler = useCallback(
    () => {
      setShowPlaceholder(false);

      onFocus();
    },
    [onFocus],
  );

  const blurHandler = useCallback(
    () => {
      setShowPlaceholder(true);

      onBlur();
    },
    [onBlur],
  );

  return (
    <>
      <ResetedInput
        onFocus={focusHandler}
        onBlur={blurHandler}
        value={value}
        {...rest}
      />

      {
        showPlaceholder && !value && (
          <div className={placeholderClass}>
            {
              placeholderTKey
                ? (t(placeholderTKey))
                : placeholder
            }
          </div>
        )
      }
    </>
  );
});
Input.displayName = "Input";

export { Input };

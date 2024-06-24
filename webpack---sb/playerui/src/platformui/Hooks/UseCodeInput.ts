import { type FocusEventHandler, type KeyboardEventHandler, type MouseEventHandler, useState } from "react";

const useCodeInput = (value: string | undefined) => {
  const [isFocused, setFocused] = useState(false);

  const handlePosChange = (input: HTMLInputElement) => {
    const length = value?.length;
    length && input.setSelectionRange(length, length);
  };

  const onMouseUp: MouseEventHandler<HTMLInputElement> = (e) => {
    const input = e.target as HTMLInputElement;
    handlePosChange(input);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const input = e.target as HTMLInputElement;
    handlePosChange(input);

    if (!(/\d/.test(e.key) || e.key === "Backspace")) {
      e.preventDefault();
    }
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    const input = e.target as HTMLInputElement;
    handlePosChange(input);
    setFocused(true);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = () => {
    setFocused(false);
  };

  return {
    isFocused,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseUp,
  };
};

export { useCodeInput };

import { useCallback, useMemo, useState } from "react";
import { not, useOnClickOutside, withStopPropagation } from "@sb/utils";
import { type TSelectValue } from "../Components/Field/SelectModel";

const useSelectHandler = <Value extends TSelectValue>(
  onChange: (value: Value | undefined) => void,
  maxHeight: number,
) => {
  const [expanded, setExpanded] = useState(false);
  const close = useCallback(() => setExpanded(false), [setExpanded]);
  const [ref] = useOnClickOutside<HTMLDivElement>(close);

  const selectRect = ref?.current?.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  const onClearValue = useCallback(
    // @react-compiler-warn
    withStopPropagation(() => {
      onChange(undefined);
    }),
    [onChange],
  );

  const open = useCallback(() => setExpanded(not), []);

  const changeOption = useCallback(
    (value: Value) => {
      close();
      onChange(value);
    },
    [onChange, close],
  );

  return useMemo(
    () => ({
      revertDropdown: selectRect && selectRect.bottom + maxHeight > bodyRect.bottom,
      open,
      changeOption,
      expanded,
      onClearValue,
      ref,
    }),
    [selectRect, bodyRect, open, changeOption, expanded, onClearValue, ref],
  );
};

export { useSelectHandler };

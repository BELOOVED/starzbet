import { type ChangeEvent, useCallback, useState } from "react";
import { type TVoidFn } from "@sb/utils";

type TUseSearchSetter = [string, TVoidFn, (e: ChangeEvent<HTMLInputElement>) => void]

const useSearchSetter = (searchText = ""): TUseSearchSetter => {
  const [value, setValue] = useState(searchText);

  const changeHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    [
      setValue,
    ],
  );

  return [value, setValue, changeHandle];
};

const useSearchKeyDownHandle = (searchHandle: () => void) => useCallback(
  (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      searchHandle();
    }
  },
  [searchHandle],
);

export { useSearchSetter, useSearchKeyDownHandle };

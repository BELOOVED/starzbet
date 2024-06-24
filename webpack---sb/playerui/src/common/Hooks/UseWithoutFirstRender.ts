import { useEffect, useRef, useState } from "react";
import { type TVoidFn, usePersistCallback } from "@sb/utils";

const useWithoutFirstRender = (...deps: unknown[]): [boolean, TVoidFn] => {
  const [flag, setFlag] = useState(false);
  const isPassedFirstRender = useRef(false);

  const reset = usePersistCallback(() => setFlag(false));

  useEffect(
    () => {
      if (isPassedFirstRender.current) {
        setFlag(true);
      }
    },
    [...deps],
  );

  useEffect(
    () => {
      isPassedFirstRender.current = true;
    },
    [],
  );

  return [flag, reset];
};

export { useWithoutFirstRender };

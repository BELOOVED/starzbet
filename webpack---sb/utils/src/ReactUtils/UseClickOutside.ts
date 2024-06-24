import { useCallback, useEffect, useRef } from "react";
import { isNil, isNotNil } from "../IsNil";

const useClickOutside = <T extends HTMLElement>(
  handler: (event: MouseEvent) => void,
  shouldUseParentNode = false,
  shouldExclude: (target: T) => boolean = () => false,
) => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isNil(ref.current)) {
        return;
      }

      const target = event.target as T;

      if (shouldExclude(target)) {
        return;
      }

      const current = shouldUseParentNode ? ref.current.parentNode : ref.current;

      if (isNotNil(current) && !current.contains(target)) {
        handler(event);
      }
    },
    [handler, shouldUseParentNode],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return ref;
};

export { useClickOutside };

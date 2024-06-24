import { useCallback, useEffect, useRef } from "react";

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(handler: (e: MouseEvent) => void) => {
  const ref = useRef<T>(null);

  const listener = useCallback(
    (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    },
    [handler, ref.current],
  );

  useEffect(
    () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [listener, ref],
  );

  return [ref];
};

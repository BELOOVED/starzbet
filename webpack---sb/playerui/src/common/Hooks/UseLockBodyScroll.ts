import { useEffect, useLayoutEffect, useState } from "react";

let countOfLocks = 0;

const useLockBodyScroll = (disabled = false) => {
  useLayoutEffect(
    () => {
      if (!disabled) {
        // Prevent scrolling on mount
        if (countOfLocks === 0) {
          document.body.style.overflow = "hidden";
        }
        countOfLocks++;
        // Re-enable scrolling when component unmounts

        return () => {
          countOfLocks--;

          if (countOfLocks === 0) {
            document.body.style.overflow = "";
          }
        };
      } else {
        return void 0;
      }
    },
    [],
  ); // Empty array ensures effect is only run on mount and unmount
};

const useControlledLockBodyScroll = (scrollWidth: number) => {
  const [lock, setLock] = useState(false);

  const lockBodyScroll = () => setLock(true);
  const unlockBodyScroll = () => setLock(false);

  useEffect(
    () => {
      document.body.style.overflow = lock ? "hidden" : "";
      document.body.style.paddingRight = lock ? `${scrollWidth}px` : "";

      if (window.document.body.parentElement) {
        window.document.body.parentElement.style.scrollbarGutter = "auto";
      }

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    },
    [lock],
  );

  return { lock, lockBodyScroll, unlockBodyScroll };
};

export { useLockBodyScroll, useControlledLockBodyScroll };

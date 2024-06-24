import { type FC, type PropsWithChildren, useLayoutEffect, useRef } from "react";

interface IVirtualListFixHeightProps {
  computeTotalSize: () => number;

  counts: number;
}

const VirtualListFixHeight: FC<PropsWithChildren<IVirtualListFixHeightProps>> = ({ children, computeTotalSize, counts }) => {
  const ref = useRef<HTMLDivElement>(null);
  const initialize = useRef(false);

  useLayoutEffect(
    () => {
      if (counts !== 0 && !initialize.current) {
        const height = computeTotalSize();

        initialize.current = true;

        ref.current.style.height = `${height}px`;

        setTimeout(
          () => {
            if (ref.current) {
              ref.current.style.height = "auto";
            }
          },
          1000,
        );
      }
    },
    [counts],
  );

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};
VirtualListFixHeight.displayName = "VirtualListFixHeight";

export { VirtualListFixHeight };

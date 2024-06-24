import { useEffect, useState } from "react";
import { IS_SERVER } from "@sb/utils";

const initialSize = {
  width: IS_SERVER ? 0 : window.innerWidth,
  height: IS_SERVER ? 0 : window.innerHeight,
};

const usePlayGamePageSize = (withoutHidden: boolean) => {
  const [size, changeSize] = useState(initialSize);

  useEffect(
    () => {
      if (!withoutHidden) {
        window.document.body.style.overflow = "hidden";
      }

      window.document.body.style.minWidth = "initial";

      if (window.document.body.parentElement) {
        window.document.body.parentElement.style.scrollbarGutter = "auto";
      }

      const handler = (e: UIEvent) => {
        const target = e.target as Window;

        changeSize({ width: target.innerWidth, height: target.innerHeight });
      };

      window.addEventListener("resize", handler);

      return () => window.removeEventListener("resize", handler);
    },
    [],
  );

  return size;
};

export { usePlayGamePageSize };

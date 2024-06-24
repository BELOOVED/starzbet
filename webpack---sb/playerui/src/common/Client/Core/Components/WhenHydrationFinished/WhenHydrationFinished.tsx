import { type ComponentType, createElement, type FC, type PropsWithChildren } from "react";
import { isNotNil } from "@sb/utils";
import { useIsHydration } from "./UseIsHydration";

interface IIgnoreHydrationProps extends PropsWithChildren {
  fallback?: ComponentType;
}

const WhenHydrationFinished: FC<IIgnoreHydrationProps> = ({
  children,
  fallback,
}) => {
  const isHydration = useIsHydration();

  if (isHydration) {
    return isNotNil(fallback) ? createElement(fallback) : null;
  }

  return children;
};
WhenHydrationFinished.displayName = "WhenHydrationFinished";

export { WhenHydrationFinished };

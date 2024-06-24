import { type ComponentType, createElement, forwardRef } from "react";
import { isNotNil, type TAnyObject } from "@sb/utils";
import { useIsHydration } from "./UseIsHydration";

const withHydration = <Props extends TAnyObject>(
  component: ComponentType<Props>,
  fallback?: ComponentType,
) => forwardRef<unknown, Props>((props, ref) => {
  const isHydration = useIsHydration();

  if (isHydration) {
    return isNotNil(fallback) ? createElement(fallback) : null;
  }

  return createElement(component, { ...props, ref });
});

export { withHydration };

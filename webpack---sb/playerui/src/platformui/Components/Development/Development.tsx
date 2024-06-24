import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { isDev, isE2E } from "@sb/utils";

const development = <V = unknown>(value: V) => isDev || isE2E ? value : undefined;

const reactDev = (node: ReactNode) => development(node) || null;

const Development: FC<PropsWithChildren> = ({ children }) => (
  reactDev(children)
);
Development.displayName = "Development";

export { Development, development };

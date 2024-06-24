import type { NavLinkProps } from "react-router-dom";
import { matchPath } from "@sb/react-router-compat";

type TIsActive = NavLinkProps["isActive"]

const createSimpleIsActiveFunction = (route: string): TIsActive => (_, { pathname }) => !!matchPath(pathname, route);

export { createSimpleIsActiveFunction };

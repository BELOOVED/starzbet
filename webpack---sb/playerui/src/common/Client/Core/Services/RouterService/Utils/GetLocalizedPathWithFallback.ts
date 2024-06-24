import { IS_SERVER_SIDE_SETUP } from "../../../../../IsServerSideSetup";
import { type TLocalizedRoutePath } from "../Model/LocalizedRoute";
import { ROUTE_LOCALE_PATTERN } from "../Constants";
import { getLocalizedPathPatternByRoute } from "./GetLocalizedPathPatternByRoute";

const isLocalizedRoutePath = (candidate: string): candidate is TLocalizedRoutePath<string> =>
  !IS_SERVER_SIDE_SETUP || candidate.startsWith(ROUTE_LOCALE_PATTERN);

const getLocalizedPathWithFallback = (path: string) => {
  if (isLocalizedRoutePath(path)) {
    return path;
  }

  return getLocalizedPathPatternByRoute("/");
};

export { getLocalizedPathWithFallback, isLocalizedRoutePath };

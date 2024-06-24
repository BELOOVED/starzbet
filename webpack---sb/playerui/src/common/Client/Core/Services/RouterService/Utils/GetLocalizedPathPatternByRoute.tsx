import { IS_SERVER_SIDE_SETUP } from "../../../../../IsServerSideSetup";
import { ROUTE_LOCALE_PATTERN } from "../Constants";
import { type TLocalizedRoutePath } from "../Model/LocalizedRoute";

const getLocalizedPathPatternByRoute = <Path extends string>(route: Path): TLocalizedRoutePath<Path> => IS_SERVER_SIDE_SETUP
  ? `${ROUTE_LOCALE_PATTERN}${route}`
  : route as TLocalizedRoutePath<Path>;

export { getLocalizedPathPatternByRoute };

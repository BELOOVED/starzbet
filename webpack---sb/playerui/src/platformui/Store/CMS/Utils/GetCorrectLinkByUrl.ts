import { isVoid, type TNullable } from "@sb/utils";
import {
  type TLocalizedRouteParams,

} from "../../../../common/Client/Core/Services/RouterService/Model/RoutesTypes";
import { type TLocalizedRoutePath } from "../../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import { routeMap } from "../../../RouteMap/RouteMap";
import { EMPTY_URL } from "../Model/CmsConstants";

const getCorrectLinkByUrl = (router: TLocalizedRoutePath<string>, url: TNullable<string>): TLocalizedRouteParams<string> =>
  isVoid(url) || url === routeMap.root || url === EMPTY_URL
    ? { to: routeMap.root }
    : { to: router, params: { path: url.replace(/\//, "") }, convertTo: decodeURIComponent };

export { getCorrectLinkByUrl };

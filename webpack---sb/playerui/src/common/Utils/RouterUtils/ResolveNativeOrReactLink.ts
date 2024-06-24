import { matchPath } from "@sb/react-router-compat";
import { routeMap as platformRouteMap } from "../../../platformui/RouteMap/RouteMap";
import { getLocalizedPathPatternByRoute } from "../../Client/Core/Services/RouterService/Utils/GetLocalizedPathPatternByRoute";
import { isLocalizedRoutePath } from "../../Client/Core/Services/RouterService/Utils/GetLocalizedPathWithFallback";

const allRoutes = Object.values(platformRouteMap).filter((it) => it !== platformRouteMap.root);

const httpRegex = /^https?:\/\//;
const addHttpIfNeed = (link: string) => {
  if (httpRegex.test(link)) {
    return link;
  }

  return `http://${link}`;
};

const addLocaleIfNeed = (link: string) =>
  isLocalizedRoutePath(link)
    ? link
    : getLocalizedPathPatternByRoute(link);

const resolveNativeOrReactLink = (link: string) => {
  if (link.startsWith("/") || !link.includes(".")) {
    return {
      isNative: false,
      link: addLocaleIfNeed(link.startsWith("/") ? link : `/${link}`),
    };
  }

  try {
    const absoluteLink = new URL(addHttpIfNeed(link));

    return allRoutes.some((path) => !!matchPath(absoluteLink.pathname, { exact: true, path, strict: true }))
      ? {
        isNative: false,
        link: addLocaleIfNeed(absoluteLink.pathname),
      }
      : { isNative: true, link: absoluteLink.href };
  } catch {
    return null;
  }
};

export { resolveNativeOrReactLink };

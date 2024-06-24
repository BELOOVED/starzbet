import { matchPath } from "@sb/react-router-compat";
import { routeMap } from "../../platformui/RouteMap/RouteMap";

const isPlayPage = !!matchPath(window.location.pathname, [routeMap.play, routeMap.playDemo]);

export { isPlayPage };

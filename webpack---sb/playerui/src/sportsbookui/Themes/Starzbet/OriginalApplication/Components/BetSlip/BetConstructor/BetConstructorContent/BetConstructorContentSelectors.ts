import { routeMap } from "../../../../../../../RouteMap/RouteMap";

const selectESportPath = (live: boolean) => live
  ? routeMap.esport.live.event
  : routeMap.esport.preLive.event;
const selectCommonPath = (live: boolean) => live
  ? routeMap.live.event
  : routeMap.preLive.event;
export { selectCommonPath, selectESportPath };

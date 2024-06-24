import { IS_MOBILE_CLIENT_SIDE } from "../../common/Store/DeviceInfo/DeviceInfoConstant";
import { getSportsbookRoutes } from "./RouteMap";

/**
 * Only for Client Side
 */
const sportsBookRoutes = getSportsbookRoutes(IS_MOBILE_CLIENT_SIDE);

export { sportsBookRoutes };

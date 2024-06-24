import { IS_MOBILE_CLIENT_SIDE } from "../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { integrateGoSquared } from "../../../../common/Integrations/IntegrateGoSquared";

integrateGoSquared("GSN-038361-G");

if (IS_MOBILE_CLIENT_SIDE) {
  void import("./Mobile/CreateMobile");
} else {
  void import("./Desktop/CreateDesktop");
}

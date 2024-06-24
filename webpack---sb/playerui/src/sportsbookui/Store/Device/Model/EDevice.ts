import { IS_MOBILE_CLIENT_SIDE } from "../../../../common/Store/DeviceInfo/DeviceInfoConstant";

enum EDevice {
  PC = "pc",
  MOBILE = "mobile",
}

const getDevice = () => IS_MOBILE_CLIENT_SIDE ? EDevice.MOBILE : EDevice.PC;

export { getDevice };

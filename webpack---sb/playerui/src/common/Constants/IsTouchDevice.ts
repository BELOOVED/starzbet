import { IS_MOBILE_CLIENT_SIDE } from "../Store/DeviceInfo/DeviceInfoConstant";

const hasMsMaxTouchPoints = (navigator: Navigator): navigator is Navigator & {
  msMaxTouchPoints: number;
} => navigator.hasOwnProperty("msMaxTouchPoints");

const detectIsTouchDevice = () => {
  if (IS_MOBILE_CLIENT_SIDE) {
    return true;
  }

  return (("ontouchstart" in window) ||
    (navigator.maxTouchPoints > 0) ||
    (hasMsMaxTouchPoints(navigator) && navigator.msMaxTouchPoints > 0));
};

const IS_TOUCH_DEVICE = detectIsTouchDevice();

export { IS_TOUCH_DEVICE };


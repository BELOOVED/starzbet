import { type IWithLoginLockTime } from "./AuthInitialState";

const authGoToRouteSelector = ({ authNavigation }: IWithLoginLockTime) => authNavigation.goToRoute;

const loginLockTimeSelector = ({ loginLockTime }: IWithLoginLockTime) => loginLockTime;
const authInfoModalOpenSelector = ({ authInfoModal }: IWithLoginLockTime) => authInfoModal;

export {
  loginLockTimeSelector,
  authInfoModalOpenSelector,
  authGoToRouteSelector,
};

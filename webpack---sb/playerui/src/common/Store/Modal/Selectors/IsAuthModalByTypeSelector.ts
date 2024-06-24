import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { isMobileSelector } from "../../DeviceInfo/DeviceInfoSelectors";
import { EAuthModal, EModal, type IAuthData } from "../Model/EModal";
import { modalDataSelector } from "./ModalSelectors";

const TYPE_TO_ROUTE_MAP: Record<EAuthModal, string> = {
  [EAuthModal.forgotPassword]: routeMap.forgotPasswordRoute,
  [EAuthModal.updatePassword]: routeMap.updatePasswordByEmailRoute,
  [EAuthModal.login]: routeMap.loginRoute,
  [EAuthModal.registration]: routeMap.registrationRoute,
  [EAuthModal.privateRegistration]: routeMap.privateRegistrationRoute,
};

const isAuthModalByTypeSelector = (state: TPlatformAppState, type: EAuthModal) => {
  const isMobile = isMobileSelector(state);

  if (isMobile) {
    const pathname = routerLocationPathnameSelector(state);

    return !!matchPath(pathname, TYPE_TO_ROUTE_MAP[type]);
  }

  return modalDataSelector<IAuthData>(state, EModal.auth)?.authType === type;
};

export { isAuthModalByTypeSelector };

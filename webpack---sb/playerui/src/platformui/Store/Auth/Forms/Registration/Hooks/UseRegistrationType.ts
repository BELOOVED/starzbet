import { useSelector } from "react-redux";
import { useCallback } from "react";
import { type TVoidFn, useAction } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { setAuthModalTypeAction } from "../../../../../../common/Store/Modal/ModalActions";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { isRegistrationAuthModalOpenedSelector } from "../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { useLocalizedReplace } from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { isMobileSelector } from "../../../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";

const useRegistrationType = (): [boolean, TVoidFn] => {
  const openRegistration = useAction(setAuthModalTypeAction);
  const isRegisterModal = useSelector(isRegistrationAuthModalOpenedSelector);
  const pathname = useSelector(routerLocationPathnameSelector);
  const isRegisterPage = !!matchPath(pathname, routeMap.registrationRoute);
  const goToRoot = useLocalizedReplace();
  const isMobile = useSelector(isMobileSelector);
  const isRegister = isMobile ? isRegisterPage : isRegisterModal;

  const handler = useCallback(
    () => {
      if (isMobile) {
        goToRoot(isRegister ? routeMap.privateRegistrationRoute : routeMap.registrationRoute);
      } else {
        openRegistration(isRegister ? EAuthModal.privateRegistration : EAuthModal.registration);
      }
    },
    [isRegister],
  );

  return [isRegister, handler];
};

export { useRegistrationType };

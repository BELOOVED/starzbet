import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useActionWithBind, usePersistCallback } from "@sb/utils";
import { routeMap } from "../../platformui/RouteMap/RouteMap";
import { scrollToTop } from "../../platformui/Utils/ScrollToTop";
import { type IAuthNavigationOptions } from "../../platformui/Store/Auth/AuthInitialState";
import { authNavigationDataSetAction } from "../../platformui/Store/Auth/AuthActions";
import { authNavigationDefaultData } from "../../platformui/Store/Auth/DefaultData";
import { useModalOpenAction } from "../Store/Modal/Hooks/UseModaOpenAction";
import { EAuthModal, EModal } from "../Store/Modal/Model/EModal";
import { useLocalizedPushPath } from "../Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { isMobileSelector } from "../Store/DeviceInfo/DeviceInfoSelectors";

const useLogin = (data?: Partial<IAuthNavigationOptions>) => {
  const goToLogin = useLocalizedPushPath(routeMap.loginRoute);
  const openModal = useModalOpenAction(EModal.auth, { authType: EAuthModal.login });
  const setData = useActionWithBind(authNavigationDataSetAction, data ?? authNavigationDefaultData);
  const isMobile = useSelector(isMobileSelector);

  return useCallback(
    () => {
      setData();
      if (isMobile) {
        goToLogin();
      } else {
        openModal();
      }
    },
    [setData],
  );
};

const useRegistration = () => {
  const openRegister = useModalOpenAction(EModal.auth, { authType: EAuthModal.registration });
  const toRegister = useLocalizedPushPath(routeMap.registrationRoute);
  const isMobile = useSelector(isMobileSelector);

  const goToRegister = usePersistCallback(() => {
    scrollToTop();
    toRegister();
  });

  return isMobile ? goToRegister : openRegister;
};

export { useLogin, useRegistration };

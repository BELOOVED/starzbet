import { useSelector } from "react-redux";
import { useActionWithBind } from "@sb/utils";
import { useModalCloseAction } from "../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EAuthModal, EModal } from "../../../../../common/Store/Modal/Model/EModal";
import { setAuthModalTypeAction } from "../../../../../common/Store/Modal/ModalActions";
import {
  useLocalizedPushPath,
  useLocalizedReplacePath,
} from "../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { isMobileSelector } from "../../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { withScrollToTop } from "../../../../Utils/ScrollToTop";

const useForgotPasswordNavigation = () => {
  const closeModal = useModalCloseAction(EModal.auth);
  const isMobile = useSelector(isMobileSelector);

  const goToRoot = useLocalizedPushPath(routeMap.root);

  const openLoginModal = useActionWithBind(setAuthModalTypeAction, EAuthModal.login);

  const goToLogin = useLocalizedReplacePath(routeMap.loginRoute);

  const openRegistrationModal = useActionWithBind(setAuthModalTypeAction, EAuthModal.registration);

  const goToRegistration = useLocalizedReplacePath(routeMap.registrationRoute);

  const close = isMobile ? withScrollToTop(goToRoot) : closeModal;
  const openLogin = isMobile ? withScrollToTop(goToLogin) : openLoginModal;
  const openRegistration = isMobile ? withScrollToTop(goToRegistration) : openRegistrationModal;

  return { close, openLogin, openRegistration };
};

export { useForgotPasswordNavigation };

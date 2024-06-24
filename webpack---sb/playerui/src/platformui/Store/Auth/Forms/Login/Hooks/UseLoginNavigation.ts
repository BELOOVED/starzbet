import { useSelector } from "react-redux";
import { useActionWithBind } from "@sb/utils";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { setAuthModalTypeAction } from "../../../../../../common/Store/Modal/ModalActions";
import { useLocalizedReplacePath } from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { isMobileSelector } from "../../../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";

const useLoginNavigation = () => {
  const goToForgot = useLocalizedReplacePath(routeMap.forgotPasswordRoute);
  const isMobile = useSelector(isMobileSelector);

  const openForgotModal = useActionWithBind(setAuthModalTypeAction, EAuthModal.forgotPassword);

  const goToRegistration = useLocalizedReplacePath(routeMap.registrationRoute);

  const openRegistrationModal = useActionWithBind(setAuthModalTypeAction, EAuthModal.registration);

  const openForgot = isMobile ? goToForgot : openForgotModal;
  const openRegistration = isMobile ? goToRegistration : openRegistrationModal;

  return { openForgot, openRegistration };
};

export { useLoginNavigation };

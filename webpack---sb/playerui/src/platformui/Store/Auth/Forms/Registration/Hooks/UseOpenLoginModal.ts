import { useSelector } from "react-redux";
import { useActionWithBind } from "@sb/utils";
import { setAuthModalTypeAction } from "../../../../../../common/Store/Modal/ModalActions";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { useLocalizedReplacePath } from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { isMobileSelector } from "../../../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";

const useOpenLoginModal = () => {
  const openModal = useActionWithBind(setAuthModalTypeAction, EAuthModal.login);
  const goToLogin = useLocalizedReplacePath(routeMap.loginRoute);
  const isMobile = useSelector(isMobileSelector);

  return isMobile ? goToLogin : openModal;
};

export { useOpenLoginModal };

import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useAction } from "@sb/utils";
import { goBack } from "@sb/router";
import { useModalCloseAction } from "../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { useLocalizedPush } from "../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { isMobileSelector } from "../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { authGoToRouteSelector } from "../AuthSelectors";

const useCloseAuthModal = () => {
  const hideModal = useModalCloseAction(EModal.auth);
  const isMobile = useSelector(isMobileSelector);

  const routeToGo = useSelector(authGoToRouteSelector);

  const goToRoute = useLocalizedPush();
  const goToBack = useAction(goBack);

  const handleCloseModal = useCallback(
    () => {
      hideModal();

      if (routeToGo) {
        goToRoute(routeToGo);
      }
    },
    [hideModal, goToRoute, routeToGo],
  );

  const handleNavigateBack = useCallback(
    () => {
      routeToGo
        ? goToRoute(routeToGo)
        : goToBack();
    },
    [goToRoute, routeToGo],
  );

  return isMobile ? handleNavigateBack : handleCloseModal;
};

export { useCloseAuthModal };

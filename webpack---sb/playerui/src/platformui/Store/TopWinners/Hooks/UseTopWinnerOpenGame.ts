import { useSelector } from "react-redux";
import { loggedSelector } from "@sb/auth";
import { useAction } from "@sb/utils";
import { useModalOpenAction } from "../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { useLocalizedPushPath } from "../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { isMobileSelector } from "../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { routeMap } from "../../../RouteMap/RouteMap";
import { useGameWindowOpenParams } from "../../../Hooks/UseOpenGame";
import { addToRecentlyPlayedAction } from "../../Games/Actions/GamesRecentlyPlayedActions";

const useTopWinnerOpenGame = (gameId: string) => {
  const isLogged = useSelector(loggedSelector);
  const goToLogin = useLocalizedPushPath(routeMap.loginRoute);
  const pushToRecently = useAction(addToRecentlyPlayedAction);
  const openModal = useModalOpenAction(EModal.auth);
  const openParams = useGameWindowOpenParams(gameId);
  const isMobile = useSelector(isMobileSelector);

  return () => {
    if (isLogged) {
      pushToRecently(gameId);
      window.open(...openParams);
    } else if (isMobile) {
      goToLogin();
    } else {
      openModal();
    }
  };
};

export { useTopWinnerOpenGame };

import { useSelector } from "react-redux";
import { useCallback } from "react";
import { loggedSelector } from "@sb/auth";
import { useActionWithBind } from "@sb/utils";
import { useLogin } from "../../common/Hooks/UseAuth";
import { useModalCloseAction } from "../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../common/Store/Modal/Model/EModal";
import { useLocalizedPathToRoute } from "../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPathToRoute";
import { isMobileSelector } from "../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { getGameWindowFeatures } from "../Utils/GameWindowUtils";
import { addToRecentlyPlayedAction } from "../Store/Games/Actions/GamesRecentlyPlayedActions";
import { playGameStateSelectors } from "../Store/PlayGamePage/Selectors/PlayGameSelectors";
import { routeMap } from "../RouteMap/RouteMap";

const useGameWindowOpenParams = (gameId: string, isDemo = false): Parameters<Window["open"]> => {
  const url = useLocalizedPathToRoute(isDemo ? routeMap.playDemo : routeMap.play, { gameId });
  const isMobile = useSelector(isMobileSelector);

  return [
    url,
    "_blank",
    getGameWindowFeatures(isMobile),
  ];
};

const useOpenGame = (gameId: string) => {
  const logged = useSelector(loggedSelector);
  const pushToRecently = useActionWithBind(addToRecentlyPlayedAction, gameId);
  const login = useLogin();
  const closeGameInfoModal = useModalCloseAction(EModal.gameInfo);
  const openParams = useGameWindowOpenParams(gameId);

  return useCallback(
    () => {
      if (logged) {
        pushToRecently();
        window.open(...openParams);
      } else {
        closeGameInfoModal();
        login();
      }
    },
    [logged, openParams],
  );
};

const useOpenDemoGame = (gameId: string) => {
  const openParams = useGameWindowOpenParams(gameId, true);

  return useCallback(
    () => {
      window.open(...openParams);
    },
    [openParams],
  );
};

const useOpenGameNew = (gameId: string) => {
  const isDemo = useSelector(playGameStateSelectors.isDemo);
  const route = useLocalizedPathToRoute(isDemo ? routeMap.playDemoGame : routeMap.playGame, { gameId });

  return useCallback(
    () => {
      window.open(route, "_blank");
    },
    [gameId, isDemo],
  );
};

export {
  useGameWindowOpenParams,
  useOpenGame,
  useOpenDemoGame,
  useOpenGameNew,
};

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { goBack } from "@sb/router";
import { routeMap } from "../../sportsbookui/RouteMap/RouteMap";
import { useLocalizedPushPath } from "../Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { type TLocalizedRoutePath } from "../Client/Core/Services/RouterService/Model/LocalizedRoute";

const useGoBack = (route: TLocalizedRoutePath<string> = routeMap.root) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const goTo = useLocalizedPushPath(route);

  return useCallback(
    () => {
      if (history.action === "PUSH") {
        dispatch(goBack());
      } else {
        goTo();
      }
    },
    [history, goTo],
  );
};

export { useGoBack };

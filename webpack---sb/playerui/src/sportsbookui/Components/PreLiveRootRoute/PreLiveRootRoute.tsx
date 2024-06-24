import { useEffect } from "react";
import { useActionWithBind } from "@sb/utils";
import { type TLocalizedRouteParams } from "../../../common/Client/Core/Services/RouterService/Model/RoutesTypes";
import { preLiveSetRootRouteAction } from "../../Store/PreLive/PreLiveActions";

const PreLiveRootRoute = <R extends string>(route: TLocalizedRouteParams<R>) => {
  const setRootRoute = useActionWithBind(preLiveSetRootRouteAction, route);

  useEffect(
    () => {
      setRootRoute();
    },
    [],
  );

  return null;
};
PreLiveRootRoute.displayName = "PreLiveRootRoute";

export { PreLiveRootRoute };

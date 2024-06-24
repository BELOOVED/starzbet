import { useDispatch, useSelector } from "react-redux";
import type { Location } from "history";
import { push, routerPrevLocationSelector, type TRouterMatch } from "@sb/router";
import { usePersistCallback } from "@sb/utils";
import { matchPath } from "@sb/react-router-compat";
import { useLocalizedPushPath } from "../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../RouteMap/RouteMap";
import { platformBankingPlayerPaymentAccountFetchAction } from "../BankingActions";

const inListMatch = (list: string[]): TRouterMatch => <Params extends { [K in keyof Params]?: string }>(location: Location) => {
  for (const path of list) {
    const matched = matchPath<Params>(location.pathname, { path });

    if (matched) {
      return matched;
    }
  }

  return null;
};

const usePaymentAccountSuccessForm = () => {
  const dispatch = useDispatch();
  const previousPath = useSelector(routerPrevLocationSelector);
  const goBack = useLocalizedPushPath(routeMap.bankingPaymentAccountsRoute);

  return usePersistCallback(
    () => {
      const withdrawPath = inListMatch([routeMap.withdrawPaymentMethodRoute])(previousPath);

      if (withdrawPath) {
        dispatch(push(previousPath));
      } else {
        goBack();
        dispatch(platformBankingPlayerPaymentAccountFetchAction());
      }
    },
  );
};

export { usePaymentAccountSuccessForm };

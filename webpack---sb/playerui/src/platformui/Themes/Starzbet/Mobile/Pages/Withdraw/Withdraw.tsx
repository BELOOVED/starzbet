import {
  platformui_starzbet_banking_page_withdraw,
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_withdraw_title_youHaveNotAvailablePaymentMethod,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { withProps } from "@sb/utils";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { PaymentMethods } from "../../Components/PaymentMethods/PaymentMethods";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_banking_page_withdraw,
  },
];

const Withdraw = withProps(PaymentMethods)({
  to: routeMap.withdrawPaymentMethodRoute,
  headerTKey: platformui_starzbet_banking_page_withdraw,
  emptyText: platformui_starzbet_withdraw_title_youHaveNotAvailablePaymentMethod,
  headerRouteMap,
});

export { Withdraw };

import {
  platformui_starzbet_banking_page_deposit,
  platformui_starzbet_deposit_title_youHaveNotAvailablePaymentMethod,
  platformui_starzbet_navLink_myAccount,
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
    titleTKey: platformui_starzbet_banking_page_deposit,
  },
];

const Deposit = withProps(PaymentMethods)({
  to: routeMap.depositPaymentMethodRoute,
  headerTKey: platformui_starzbet_banking_page_deposit,
  emptyText: platformui_starzbet_deposit_title_youHaveNotAvailablePaymentMethod,
  headerRouteMap,
});

export { Deposit };

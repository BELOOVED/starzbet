import { type TRouteProps } from "@sb/react-router-compat";
import { routeMap } from "../RouteMap/RouteMap";

const ladingMathOptions: TRouteProps = { path: routeMap.root, exact: true };

const gamesMathOptions: TRouteProps = { path: [routeMap.casino, routeMap.liveCasino, routeMap.games] };

const withdrawMethodMatchOptions: TRouteProps = { path: routeMap.withdrawPaymentMethodRoute };

const depositMethodMatchOptions: TRouteProps = { path: routeMap.depositPaymentMethodRoute, exact: true };

const verifyPlayerMatchOptions: TRouteProps = { path: routeMap.verifyPlayer };

const updatePasswordByEmailMatchOptions: TRouteProps = { path: routeMap.updatePasswordByEmailRoute };

const accountVerificationMatchOptions: TRouteProps = { path: routeMap.accountVVerificationRoute };

const historyMatchOptions: TRouteProps = {
  path: routeMap.historyRouteWithParam,
  exact: true,
};

const ticketDetailsMatchOptions: TRouteProps = { path: routeMap.ticketDetail, exact: true };

const ticketsMatchOptions = { path: routeMap.tickets, exact: true };

const bankingHistoryMatchOptions: TRouteProps = { path: routeMap.bankingHistoryRoute, exact: true };

const bankingHistoryDepositsMatchOptions: TRouteProps = { path: routeMap.bankingHistoryDepositsRoute, exact: true };

const callRequestMatchOptions: TRouteProps = { path: routeMap.callRequestsRoute, exact: true };
const bankingHistoryWithdrawsMatchOptions: TRouteProps = { path: routeMap.bankingHistoryWithdrawalsRoute, exact: true };

const bankingPaymentAccountCreateOptions: TRouteProps = { path: routeMap.bankingPaymentAccountCreateKindRoute };

const userMessageDetailsMatchOptions: TRouteProps = { path: routeMap.userMessageDetails, exact: true };
const userMessagesMatchOptions: TRouteProps = { path: routeMap.userMessages, exact: true };

const devicesRoute: TRouteProps = { path: routeMap.devices, exact: true };

export {
  ladingMathOptions,
  verifyPlayerMatchOptions,
  updatePasswordByEmailMatchOptions,
  accountVerificationMatchOptions,
  ticketDetailsMatchOptions,
  ticketsMatchOptions,
  withdrawMethodMatchOptions,
  depositMethodMatchOptions,
  bankingHistoryMatchOptions,
  bankingHistoryDepositsMatchOptions,
  bankingHistoryWithdrawsMatchOptions,
  bankingPaymentAccountCreateOptions,
  historyMatchOptions,
  callRequestMatchOptions,
  userMessageDetailsMatchOptions,
  userMessagesMatchOptions,
  gamesMathOptions,
  devicesRoute,
};

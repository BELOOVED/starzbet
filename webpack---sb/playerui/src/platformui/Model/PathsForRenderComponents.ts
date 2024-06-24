import { routeMap } from "../RouteMap/RouteMap";

const withoutFooter = [
  routeMap.myAccountRoute,
  routeMap.bankingRoute,
  routeMap.historyRoute,
  routeMap.userMessages,
  routeMap.tickets,
  routeMap.loginRoute,
  routeMap.registrationRoute,
  routeMap.forgotPasswordRoute,
  routeMap.updatePasswordByEmailRoute,
  routeMap.updatePasswordByPhoneRoute,
  routeMap.play,
  routeMap.playDemo,
];

const withoutFooterExceptProfile = [
  routeMap.loginRoute,
  routeMap.registrationRoute,
  routeMap.privateRegistrationRoute,
  routeMap.forgotPasswordRoute,
  routeMap.updatePasswordByEmailRoute,
  routeMap.updatePasswordByPhoneRoute,
  routeMap.play,
  routeMap.playDemo,
];

const withoutHeader = [
  routeMap.loginRoute,
  routeMap.registrationRoute,
  routeMap.forgotPasswordRoute,
  routeMap.updatePasswordByEmailRoute,
  routeMap.updatePasswordByPhoneRoute,
  routeMap.play,
  routeMap.playDemo,
];

export { withoutHeader, withoutFooter, withoutFooterExceptProfile };

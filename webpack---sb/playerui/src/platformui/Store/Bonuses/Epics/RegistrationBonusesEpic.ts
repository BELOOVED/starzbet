import { filter, switchMap, take } from "rxjs";
import { routerEpic, routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { loggedSelector } from "@sb/auth";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { isRegistrationAuthModalOpenedSelector } from "../../../../common/Store/Modal/Selectors/ModalSelectors";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { dependLoggedConditionEpic } from "../../../../common/Utils/EpicUtils/DependLoggedConditionEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { REGISTRATION_BONUSES_CALL_SYMBOL } from "../BonusVariables";
import { registrationBonusesFetchedAction } from "../BonusesActions";
import { loadRegistrationBonusesEpicFactory } from "./LoadEpicFactories/LoadRegistrationBonusesEpicFactory";

const loadRegistrationBonusesEpic = loadRegistrationBonusesEpicFactory(
  REGISTRATION_BONUSES_CALL_SYMBOL,
  registrationBonusesFetchedAction,
);

const registrationBonusesEpic: TMixAppEpic = (action$, state$, deps) => state$.pipe(
  filter((state) => {
    const logged = loggedSelector(state);
    if (logged) {
      return false;
    }

    const pathname = routerLocationPathnameSelector(state);

    if (matchPath(pathname, { path: routeMap.registrationRoute, exact: true })) {
      return true;
    }

    return isRegistrationAuthModalOpenedSelector(state);
  }),
  take(1),
  switchMap(() => loadRegistrationBonusesEpic(action$, state$, deps)),
);

const loadRegistrationBonusesOnLandingEpic = routerEpic({
  name: "loadRegistrationBonusesOnRootRouteEpic",
  match: getMatch({ path: routeMap.root, exact: true }),
  onStart: () => dependLoggedConditionEpic(undefined, loadRegistrationBonusesEpic),
});
export { registrationBonusesEpic, loadRegistrationBonusesOnLandingEpic };

import { combineEpics } from "redux-observable";
import { of } from "rxjs";
import { routerEpic } from "@sb/router";
import { extractExport } from "@sb/utils";
import { unmountFormAction } from "@sb/form-new";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { DEPOSIT_LIMIT_FORM } from "../Form/DepositLimit/DepositLimitFormModel";
import { PLAY_LIMIT_FORM } from "../Form/PlayLimit/PlayLimitFormModel";
import { TIME_OUT_FORM } from "../Form/TimeOut/TimeOutFormModel";
import { SELF_EXCLUSION_FORM } from "../Form/SelfExclusion/SelfExclusionFormModel";
import { ACCOUNT_CLOSURE_FORM } from "../Form/AccountClosure/AccountClosureFormModel";
import { REALITY_CHECK_FORM } from "../Form/RealityCheck/RealityCheckFormModel";

const selfProtectionPlayLimitEpic = routerEpic({
  name: "selfProtectionPlayLimitEpic",
  match: getMatch(routeMap.playLimitRoute),
  onStart: () => import("./SelfProtectionRouteEpic").then(extractExport("selfProtectionPlayLimitRouteEpic")),
  onStop: () => () => of(unmountFormAction(PLAY_LIMIT_FORM)),
});

const selfProtectionDepositLimitEpic = routerEpic({
  name: "selfProtectionDepositLimitEpic",
  match: getMatch(routeMap.depositLimitRoute),
  onStart: () => import("./SelfProtectionRouteEpic").then(extractExport("selfProtectionDepositLimitRouteEpic")),
  onStop: () => () => of(unmountFormAction(DEPOSIT_LIMIT_FORM)),
});

const selfProtectionTimeOutEpic = routerEpic({
  name: "selfProtectionTimeOutEpic",
  match: getMatch(routeMap.timeOutRoute),
  onStart: () => import("./SelfProtectionRouteEpic").then(extractExport("selfProtectionTimeOutRouteEpic")),
  onStop: () => () => of(unmountFormAction(TIME_OUT_FORM)),
});

const selfProtectionSelfExclusionEpic = routerEpic({
  name: "selfProtectionSelfExclusionEpic",
  match: getMatch(routeMap.selfExclusionRoute),
  onStart: () => import("./SelfProtectionRouteEpic").then(extractExport("selfProtectionSelfExclusionRouteEpic")),
  onStop: () => () => of(unmountFormAction(SELF_EXCLUSION_FORM)),
});

const selfProtectionAccountClosureEpic = routerEpic({
  name: "selfProtectionSelfExclusionEpic",
  match: getMatch(routeMap.accountClosureRoute),
  onStart: () => import("./SelfProtectionRouteEpic").then(extractExport("selfProtectionAccountClosureRouteEpic")),
  onStop: () => () => of(unmountFormAction(ACCOUNT_CLOSURE_FORM)),
});

const selfProtectionRealityCheckEpic = routerEpic({
  name: "selfProtectionRealityCheckEpic",
  match: getMatch(routeMap.realityChecksRoute),
  onStart: () => import("./SelfProtectionRouteEpic").then(extractExport("selfProtectionRealityCheckRouteEpic")),
  onStop: () => () => of(unmountFormAction(REALITY_CHECK_FORM)),
});

const selfProtectionRootEpic: TPlatformEpic = combineEpics(
  selfProtectionPlayLimitEpic,
  selfProtectionDepositLimitEpic,
  selfProtectionTimeOutEpic,
  selfProtectionSelfExclusionEpic,
  selfProtectionAccountClosureEpic,
  selfProtectionRealityCheckEpic,
);

export { selfProtectionRootEpic };

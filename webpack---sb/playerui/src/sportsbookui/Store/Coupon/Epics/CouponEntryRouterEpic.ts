import { EMPTY } from "rxjs";
import { epicMonitor } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { type TMatch } from "@sb/react-router-compat";
import { createCallManagerSymbol } from "@sb/call-manager";
import {
  sportsbookFindCouponByIdQueryOptionalFields,
} from "@sb/graphql-client/PlayerUI/OptionalFields/Sportsbook/Sportsbook_FindCouponById_Query";
import { query_Sportsbook_FindCouponById } from "@sb/graphql-client/PlayerUI";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlSportsbookDataSelector } from "../../../../platformui/Store/Root/Selectors/GraphQlSelectors";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { allCouponsSelector } from "../Selectors/CouponsSelector";
import { couponFetchedAction } from "../CouponActions";

const COUPON_ENTRY_ROUTER_EPIC = "COUPON_ENTRY_ROUTER_EPIC";
const FIND_COUPON_BY_ID_LOADING_SYMBOL = createCallManagerSymbol("FIND_COUPON_BY_ID_LOADING_SYMBOL");

const getEpicByCouponId = (couponId: string): TMixAppEpic => (action$, state$, dependencies) => {
  const entries = allCouponsSelector(state$.value);

  if (entries[couponId]) {
    return EMPTY;
  }

  return gqlLoadingFactory(
    FIND_COUPON_BY_ID_LOADING_SYMBOL,
    query_Sportsbook_FindCouponById,
    {
      optionalFields: sportsbookFindCouponByIdQueryOptionalFields,
      variables: {
        couponId,
      },
    },
    couponFetchedAction,
    (res) => [graphQlSportsbookDataSelector(res).FindCouponById],
  )(action$, state$, dependencies);
};

const couponEntryRouterEpic = routerEpic({
  name: "couponEntry",
  match: getMatch<{
    couponId: string;
  }>({ path: [routeMap.preLive.coupon, routeMap.esport.preLive.coupon] },
  ),
  onStart: ({ params: { couponId } }: TMatch<{ couponId: string; }>) => epicMonitor(
    getEpicByCouponId(couponId),
    COUPON_ENTRY_ROUTER_EPIC,
  ),
  shouldRestart: restartOnParamsChanged,
});

export { couponEntryRouterEpic };

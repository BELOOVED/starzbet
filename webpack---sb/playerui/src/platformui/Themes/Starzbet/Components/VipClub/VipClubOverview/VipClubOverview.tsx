import { memo } from "react";
import { Route } from "react-router-dom";
import { type TRouteProps } from "@sb/react-router-compat";
import classes from "./VipClubOverview.module.css";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { VipClubOverviewFallbackSwitch } from "../../../../../Components/VipClub/VipClubOverviewFallbackSwitch";
import { VipClubPromoOverviewFallbackSwitch } from "../../../../../Components/VipClub/VipClubPromoOverviewFallbackSwitch";
import { VipClubIntro, VipClubPromoIntro } from "../VipClubIntro/VipClubIntro";
import { VipClubTabs } from "../VipClubTabs/VipClubTabs";
import { VipClubLevelRules } from "../VipClubLevelRules/VipClubLevelRules";
import { VipClubPlayerState } from "../VipClubPlayerState/VipClubPlayerState";
import { VipClubBonus } from "../VipClubBonus/VipClubBonus";
import { VipClubCommissionRefund } from "../VipClubCommissionRefund/VipClubCommissionRefund";
import { VipClubBenefits } from "../VipClubBenefits/VipClubBenefits";

const routes: TRouteProps[] = [
  { component: VipClubPlayerState, path: routeMap.vipClubOverviewPlayerStateRoute },
  { component: VipClubLevelRules, path: routeMap.vipClubOverviewLevelRulesRoute },
  { component: VipClubBonus, path: routeMap.vipClubOverviewBonusRoute },
  { component: VipClubCommissionRefund, path: routeMap.vipClubOverviewCommissionRefundRoute },
  { component: VipClubBenefits, path: routeMap.vipClubOverviewBenefitsRoute },
];

const VipClubOverview = memo(() => (
  <div className={classes.vipClubOverview}>
    <VipClubIntro />

    <VipClubTabs />

    <VipClubOverviewFallbackSwitch>
      {routes.map((route) => <Route {...route} key={String(route.path)} />)}
    </VipClubOverviewFallbackSwitch>
  </div>
));
VipClubOverview.displayName = "VipClubOverview";

const VipClubPromoOverview = memo(() => (
  <>
    <VipClubPromoIntro />

    <VipClubPromoOverviewFallbackSwitch>
      <Route path={routeMap.vipClubOverviewLevelRulesRoute} component={VipClubLevelRules} />
    </VipClubPromoOverviewFallbackSwitch>
  </>
));
VipClubPromoOverview.displayName = "VipClubPromoOverview";

export { VipClubOverview, VipClubPromoOverview };

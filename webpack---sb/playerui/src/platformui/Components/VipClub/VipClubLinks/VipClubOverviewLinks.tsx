import { withProps } from "@sb/utils";
import { NavLinkLocalized } from "../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { routeMap } from "../../../RouteMap/RouteMap";

const VipClubOverviewPlayerStateLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubOverviewPlayerStateRoute,
});

const VipClubOverviewLevelRulesLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubOverviewLevelRulesRoute,
});

const VipClubOverviewBonusLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubOverviewBonusRoute,
});

const VipClubOverviewCommissionRefundLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubOverviewCommissionRefundRoute,
});

const VipClubOverviewBenefitsLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubOverviewBenefitsRoute,
});

const VipClubOverviewContributionTableLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubOverviewContributionTableRoute,
});

export {
  VipClubOverviewPlayerStateLink,
  VipClubOverviewLevelRulesLink,
  VipClubOverviewBonusLink,
  VipClubOverviewCommissionRefundLink,
  VipClubOverviewBenefitsLink,
  VipClubOverviewContributionTableLink,
};

import { withProps } from "@sb/utils";
import { NavLinkLocalized } from "../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { routeMap } from "../../../RouteMap/RouteMap";
import { LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP } from "../../../Store/VipClub/VipClubModels";
import { VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING } from "../../../Store/VipClub/VipClubVariables";
import { createSimpleIsActiveFunction } from "./CreateSimpleIsActiveFunction";

const DAILY_LINK_PARAMS = { period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP.DAILY, page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING };

const isDailyLinkActive = createSimpleIsActiveFunction(routeMap.vipClubLeadersDailyPeriodRoute);

const VipClubLeadersDailyLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubLeadersPeriodPageRoute,
  params: DAILY_LINK_PARAMS,
  isActive: isDailyLinkActive,
});

const WEEKLY_LINK_PARAMS = { period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP.WEEKLY, page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING };

const isWeeklyLinkActive = createSimpleIsActiveFunction(routeMap.vipClubLeadersWeeklyPeriodRoute);

const VipClubLeadersWeeklyLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubLeadersPeriodPageRoute,
  params: WEEKLY_LINK_PARAMS,
  isActive: isWeeklyLinkActive,
});

const MONTHLY_LINK_PARAMS = { period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP.MONTHLY, page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING };

const isMonthlyLinkActive = createSimpleIsActiveFunction(routeMap.vipClubLeadersMonthlyPeriodRoute);

const VipClubLeadersMonthlyLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubLeadersPeriodPageRoute,
  params: MONTHLY_LINK_PARAMS,
  isActive: isMonthlyLinkActive,
});

const ALL_TIME_LINK_PARAMS = { period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP.ALL_TIME, page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING };

const isAllTimeLinkActive = createSimpleIsActiveFunction(routeMap.vipClubLeadersAllTimePeriodRoute);

const VipClubLeadersAllTimeLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubLeadersPeriodPageRoute,
  params: ALL_TIME_LINK_PARAMS,
  isActive: isAllTimeLinkActive,
});

export {
  VipClubLeadersDailyLink,
  VipClubLeadersWeeklyLink,
  VipClubLeadersMonthlyLink,
  VipClubLeadersAllTimeLink,
};

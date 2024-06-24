import { useSelector } from "react-redux";
import { type FC } from "react";
import { type TPlatform_VipClubTournament_Fragment } from "@sb/graphql-client/PlayerUI";
import { vipClubParsePeriodKind } from "@sb/vip-club";
import { withProps } from "@sb/utils";
import { NavLinkLocalized } from "../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type IVipClubTournamentsParams, LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP } from "../../../Store/VipClub/VipClubModels";
import { VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING } from "../../../Store/VipClub/VipClubVariables";
import { vipClubSelectedActiveTournamentSelector } from "../../../Store/VipClub/Selectors/VipClubTournamentsSelectors";
import { vipClubSelectors } from "../../../Store/VipClub/Selectors/VipClubSelectors";
import { type TVipClubLinkProps } from "./TVipClubLinkProps";
import { createSimpleIsActiveFunction } from "./CreateSimpleIsActiveFunction";

const isOverviewLinkActive = createSimpleIsActiveFunction(routeMap.vipClubOverviewRoute);

const VipClubOverviewLink: FC<TVipClubLinkProps> = ({ children, ...rest }) => {
  const playerState = useSelector(vipClubSelectors.playerState);

  const to = playerState ? routeMap.vipClubOverviewPlayerStateRoute : routeMap.vipClubOverviewLevelRulesRoute;

  return (
    <NavLinkLocalized to={to} isActive={isOverviewLinkActive} {...rest}>
      {children}
    </NavLinkLocalized>
  );
};
VipClubOverviewLink.displayName = "VipClubOverviewLink";

const LEADERS_LINK_PARAMS = {
  period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP.DAILY,
  page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING,
};

const isLeadersLinkActive = createSimpleIsActiveFunction(routeMap.vipClubLeadersRoute);

const VipClubLeadersLink = withProps(NavLinkLocalized)({
  to: routeMap.vipClubLeadersPeriodPageRoute,
  isActive: isLeadersLinkActive,
  params: LEADERS_LINK_PARAMS,
});

const getTournamentLinkParams =
  (tournament: TPlatform_VipClubTournament_Fragment | null): IVipClubTournamentsParams | undefined => {
    if (!tournament) {
      return undefined;
    }

    const {
      id,
      templateSnapshot: { period: { kind } },
    } = tournament;

    return {
      selectedTournamentId: id,
      period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP[vipClubParsePeriodKind(kind).period],
      page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING,
    };
  };

const isTournamentsLinkActive = createSimpleIsActiveFunction(routeMap.vipClubTournamentsRoute);

const VipClubTournamentsLink: FC<TVipClubLinkProps> = ({ children, ...rest }) => {
  const activeTournament = useSelector(vipClubSelectedActiveTournamentSelector);

  return (
    <NavLinkLocalized
      to={activeTournament ? routeMap.vipClubTournamentsIdPeriodPageRoute : routeMap.vipClubTournamentsRoute}
      params={getTournamentLinkParams(activeTournament)}
      isActive={isTournamentsLinkActive}
      {...rest}
    >
      {children}
    </NavLinkLocalized>
  );
};
VipClubTournamentsLink.displayName = "VipClubTournamentsLink";

export { VipClubOverviewLink, VipClubLeadersLink, VipClubTournamentsLink };

import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { type FC, type PropsWithChildren } from "react";
import { useParams } from "@sb/react-router-compat";
import { getNotNil } from "@sb/utils";
import { vipClubParsePeriodKind } from "@sb/vip-club";
import {
  RedirectLocalized,
} from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { findById } from "../../../common/Utils/IDUtils";
import {
  type IVipClubTournamentsParams,
  LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP,
} from "../../Store/VipClub/VipClubModels";
import { vipClubTournamentsSelectors } from "../../Store/VipClub/Selectors/VipClubTournamentsSelectors";
import { routeMap } from "../../RouteMap/RouteMap";
import { VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING } from "../../Store/VipClub/VipClubVariables";

const VipClubTournamentsIdPeriodPageFallbackSwitch: FC<PropsWithChildren> = ({ children }) => {
  const { selectedTournamentId } = useParams<IVipClubTournamentsParams>();

  const tournaments = useSelector(vipClubTournamentsSelectors.active);

  const tournament = findById(tournaments, selectedTournamentId);

  if (!tournament) {
    const firstTournament = getNotNil(tournaments[0], ["VipClubTournamentsIdPeriodPageFallbackSwitch"], "firstTournament");
    const params = {
      period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP[vipClubParsePeriodKind(firstTournament.templateSnapshot.period.kind).period],
      page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING,
      selectedTournamentId: firstTournament.id,
    };

    return <RedirectLocalized to={routeMap.vipClubTournamentsIdPeriodPageRoute} params={params} />;
  }

  const params = {
    period: LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP[vipClubParsePeriodKind(tournament.templateSnapshot.period.kind).period],
    page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING,
    selectedTournamentId: tournament.id,
  };

  return (
    <Switch>
      {children}

      <RedirectLocalized to={routeMap.vipClubTournamentsIdPeriodPageRoute} params={params} />
    </Switch>
  );
};
VipClubTournamentsIdPeriodPageFallbackSwitch.displayName = "VipClubTournamentsIdPeriodPageFallbackSwitch";

export { VipClubTournamentsIdPeriodPageFallbackSwitch };

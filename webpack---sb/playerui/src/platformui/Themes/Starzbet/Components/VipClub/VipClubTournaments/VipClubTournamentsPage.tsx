import { useSelector } from "react-redux";
import { type ComponentType, createElement, memo } from "react";
import { Route } from "react-router-dom";
import classes from "./VipClubTournaments.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { vipClubTournamentsPageStateSelector } from "../../../../../Store/VipClub/Selectors/VipClubTournamentsSelectors";
import { EVipClubTournamentsPageState } from "../../../../../Store/VipClub/VipClubModels";
import { VipClubTournamentsSelectedIdFallbackSwitch } from "../../../../../Components/VipClub/VipClubTournamentsSelectedIdFallbackSwitch";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import {
  VipClubTournamentsIdPeriodPageFallbackSwitch,
} from "../../../../../Components/VipClub/VipClubTournamentsIdPeriodPageFallbackSwitch";
import { VipClubErrorTournamentsPage } from "../VipClubError/VipClubError";
import { VipClubEmptyNoActiveTournaments } from "../VipClubEmpty/VipClubEmpty";
import { VipClubLeaderBoard } from "../VipClubLeaderBoard/VipClubLeaderBoard";
import { VipClubTournaments } from "./VipClubTournaments";

const VipClubTournamentsIdPeriodPage = memo(() => (
  <VipClubTournamentsIdPeriodPageFallbackSwitch>
    <Route path={routeMap.vipClubTournamentsIdPeriodPageRoute} component={VipClubLeaderBoard} />
  </VipClubTournamentsIdPeriodPageFallbackSwitch>
));
VipClubTournamentsIdPeriodPage.displayName = "VipClubTournamentsIdPeriodPage";

const VipClubTournamentsPageFull = memo(() => (
  <div className={classes.vipClubTournamentsPage}>
    <VipClubTournaments />

    <VipClubTournamentsSelectedIdFallbackSwitch>
      <Route path={routeMap.vipClubTournamentsIdRoute} component={VipClubTournamentsIdPeriodPage} />
    </VipClubTournamentsSelectedIdFallbackSwitch>
  </div>
));
VipClubTournamentsPageFull.displayName = "VipClubTournamentsPageFull";

const PAGE_STATE_TO_COMPONENT_TYPE_MAP: Record<EVipClubTournamentsPageState, ComponentType> = {
  [EVipClubTournamentsPageState.loading]: Loader,
  [EVipClubTournamentsPageState.failed]: VipClubErrorTournamentsPage,
  [EVipClubTournamentsPageState.noActiveTournaments]: VipClubEmptyNoActiveTournaments,
  [EVipClubTournamentsPageState.full]: VipClubTournamentsPageFull,
};

const VipClubTournamentsPage = memo(() => {
  const state = useSelector(vipClubTournamentsPageStateSelector);

  return createElement(PAGE_STATE_TO_COMPONENT_TYPE_MAP[state]);
});
VipClubTournamentsPage.displayName = "VipClubTournamentsPage";

export { VipClubTournamentsPage };

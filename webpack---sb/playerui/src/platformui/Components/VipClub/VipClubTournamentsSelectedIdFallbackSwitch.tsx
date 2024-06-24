import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { type FC, type PropsWithChildren } from "react";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { routeMap } from "../../RouteMap/RouteMap";
import { vipClubTournamentsFirstActiveTournamentIdNotNilSelector } from "../../Store/VipClub/Selectors/VipClubTournamentsSelectors";

const VipClubTournamentsSelectedIdFallbackSwitch: FC<PropsWithChildren> = ({ children }) => {
  const firstActiveTournamentId = useSelector(vipClubTournamentsFirstActiveTournamentIdNotNilSelector);
  const params = { selectedTournamentId: firstActiveTournamentId };

  return (
    <Switch>
      {children}

      <RedirectLocalized to={routeMap.vipClubTournamentsIdRoute} params={params} />
    </Switch>
  );
};
VipClubTournamentsSelectedIdFallbackSwitch.displayName = "VipClubTournamentsSelectedIdFallbackSwitch";

export { VipClubTournamentsSelectedIdFallbackSwitch };

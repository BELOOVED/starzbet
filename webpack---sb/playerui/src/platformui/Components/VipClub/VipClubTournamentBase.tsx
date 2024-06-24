import { type FC, type PropsWithChildren, useCallback, useMemo } from "react";
import { type NavLinkProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { matchPath } from "@sb/react-router-compat";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { NavLinkLocalized } from "../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { generateLocalizedPathByRoute } from "../../../common/Client/Core/Services/RouterService/Utils/GenerateLocalizedPathByRoute";
import { routeMap } from "../../RouteMap/RouteMap";
import { vipClubTournamentPeriodUrlParamByIdSelector } from "../../Store/VipClub/Selectors/VipClubTournamentsSelectors";
import { VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING } from "../../Store/VipClub/VipClubVariables";
import { localeSelector } from "../../Store/Locale/Selectors/localeSelector";

type TVipClubTournamentBaseProps = PropsWithChildren & IWithClassName & IWithId;

const VipClubTournamentBase: FC<TVipClubTournamentBaseProps> = ({ children, id, className }) => {
  const period = useParamSelector(vipClubTournamentPeriodUrlParamByIdSelector, [id]);
  const locale = useSelector(localeSelector);

  const isActive = useCallback<Exclude<NavLinkProps["isActive"], undefined>>(
    (_, { pathname }) => !!matchPath(
      pathname,
      { path: generateLocalizedPathByRoute(locale, routeMap.vipClubTournamentsIdRoute, { selectedTournamentId: id }) },
    ),
    [locale, id],
  );

  const params = useMemo(
    () => ({ selectedTournamentId: id, period, page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING }),
    [period, id],
  );

  return (
    <NavLinkLocalized
      className={className}
      to={routeMap.vipClubTournamentsIdPeriodPageRoute}
      params={params}
      isActive={isActive}
      {...qaAttr(PlayerUIQaAttributes.VipClubPage.Tournament_Container)}
    >
      {children}
    </NavLinkLocalized>
  );
};
VipClubTournamentBase.displayName = "VipClubTournamentBase";

export { VipClubTournamentBase };

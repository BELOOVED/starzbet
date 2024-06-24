import { type FC, type PropsWithChildren } from "react";
import { Switch } from "react-router-dom";
import { useParams } from "@sb/react-router-compat";
import { EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import {
  type IVipClubLeadersParams,
  LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP,
  LEADER_BOARD_URL_PARAM_TO_PERIOD_MAP,
} from "../../Store/VipClub/VipClubModels";
import { routeMap } from "../../RouteMap/RouteMap";
import { VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_NUMBER } from "../../Store/VipClub/VipClubVariables";

const VipClubLeadersPeriodPageFallbackSwitch: FC<PropsWithChildren> = ({ children }) => {
  const { period } = useParams<IVipClubLeadersParams>();

  const isValidPeriod = LEADER_BOARD_URL_PARAM_TO_PERIOD_MAP[period] !== undefined;

  const params = {
    period: isValidPeriod ? period : LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP[EPlatform_VipClubLeaderBoardPeriod.daily],
    page: VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_NUMBER,
  };

  if (!isValidPeriod) {
    return <RedirectLocalized to={routeMap.vipClubLeadersPeriodPageRoute} params={params} />;
  }

  return (
    <Switch>
      {children}

      <RedirectLocalized to={routeMap.vipClubLeadersPeriodPageRoute} params={params} />
    </Switch>
  );
};
VipClubLeadersPeriodPageFallbackSwitch.displayName = "VipClubLeadersPeriodPageFallbackSwitch";

export { VipClubLeadersPeriodPageFallbackSwitch };

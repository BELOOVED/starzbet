import { type FC, Fragment, memo, type PropsWithChildren } from "react";
import { Route, Switch } from "react-router-dom";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_vipClub_page_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { withProps } from "@sb/utils";
import classes from "./VipClubPage.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { LoggedContainer } from "../../../../../common/Containers/LoggedContainer/LoggedContainer";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { VipClubSwitcher } from "../../Components/VipClub/VipClubSwitcher/VipClubSwitcher";
import { VipClubLeadersPage } from "../../Components/VipClub/VipClubLeaders/VipClubLeadersPage";
import { VipClubOverview, VipClubPromoOverview } from "../../Components/VipClub/VipClubOverview/VipClubOverview";
import { CrownIconV1 } from "../../Components/Icons/CrownIcon/CrownIcon";
import { VipClubTournamentsPage } from "../../Components/VipClub/VipClubTournaments/VipClubTournamentsPage";
import { type TPageHeaderSourceMap } from "../../Mobile/Components/PageHeader/PageHeader";
import { AccountPage } from "../../Mobile/Components/AccountPage/AccountPage";
import { MyAccount } from "../../Desktop/Pages/MyAccount/MyAccount";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_vipClub_page_title,
  },
];

const MobilePage: FC<PropsWithChildren> = ({ children }) => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={CrownIconV1}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_vipClub_page_title)}
      headerColorScheme={"orange-gradient"}
    >
      {children}
    </AccountPage>
  );
};
MobilePage.displayName = "MobilePage";

const Component = IS_MOBILE_CLIENT_SIDE ? MobilePage : Fragment;

const VipClubPage = memo(() => (
  <Component>
    <div className={classes.vipClubPage}>
      <VipClubSwitcher />

      <Switch>
        <Route path={routeMap.vipClubLeadersRoute}>
          <VipClubLeadersPage />
        </Route>

        <Route path={routeMap.vipClubTournamentsRoute}>
          <VipClubTournamentsPage />
        </Route>

        <Route>
          <VipClubOverview />
        </Route>
      </Switch>
    </div>
  </Component>

));
VipClubPage.displayName = "VipClubPage";

const VipClubPromoPage = memo(() => (
  <div className={classes.vipClubPromoPage}>
    <VipClubSwitcher />

    <Switch>
      <Route path={routeMap.vipClubLeadersRoute}>
        <VipClubLeadersPage />
      </Route>

      <Route path={routeMap.vipClubTournamentsRoute}>
        <VipClubTournamentsPage />
      </Route>

      <Route>
        <VipClubPromoOverview />
      </Route>
    </Switch>
  </div>
));
VipClubPromoPage.displayName = "VipClubPromoPage";

const MainComponent = IS_MOBILE_CLIENT_SIDE ? VipClubPage : withProps(MyAccount)({ child: VipClubPage });

const VipClubPageMain = withProps(LoggedContainer)({ logged: <MainComponent />, notLogged: <VipClubPromoPage /> });

const VIP_CLUB_PAGE_ROUTE = {
  vipClub: {
    path: routeMap.vipClubRoute,
    component: VipClubPageMain,
  },
};

export { VIP_CLUB_PAGE_ROUTE };

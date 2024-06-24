// @ts-nocheck
import { Route, Switch } from "react-router-dom";
import { objToComponent } from "@sb/utils";
import { EBanner_Device } from "@sb/graphql-client";
import classes from "./MainPage.module.css";
import {
  RedirectLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { IS_STARZBET_KG } from "../../../../../../ServerEnvironment";
import { BannerSlot } from "../../../../../Components/BannerSlot/BannerSlot";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { withoutFooterExceptProfile } from "../../../../../Model/PathsForRenderComponents";
import { sportsBookRoutes } from "../../../../../RouteMap/SportsbookRoutes";
import { Banner } from "../../../Components/Banner/Banner";
import { Virtual } from "../../../Components/Virtual/Virtual";
import { FooterWrapper } from "../../Components/Footer/Footer";
import { Main } from "../../Components/Main/Main";
import { LandingPage } from "../LandingPage/LandingPage";

const sportsBookRoutesWithBonuses = [
  ...sportsBookRoutes,
  routeMap.bonusesRoute,
  routeMap.availableBonusesRoute,
  routeMap.availableBonusRoute,
  routeMap.myBonusesRoute,
  routeMap.myBonusRoute,
  routeMap.historyBonusesRoute,
  routeMap.historyBonusRoute,
];

const slots = {
  Live: {
    path: routeMap.live,
  },
  ESportLive: {
    path: routeMap.esportLive,
  },

  ESportPreLive: {
    path: routeMap.esport,
  },

  PreLive: {
    path: routeMap.preLive,
  },

  Casino: {
    path: routeMap.casino,
  },

  LiveCasino: {
    path: routeMap.liveCasino,
  },

  Games: {
    path: routeMap.games,
  },

  Virtual: {
    path: routeMap.virtual,
  },

  Bingo: {
    path: routeMap.bingo,
  },

  Landing: {
    path: routeMap.root,
    exact: true,
  },
};

const SLOTS_ENTRIES = Object.entries(slots);

const MainPage = ({ children, pages, isSportsbookHaveBonuses }) => {
  const extendedSportsBookRoutes = isSportsbookHaveBonuses
    ? sportsBookRoutesWithBonuses
    : sportsBookRoutes;

  return (
    <div className={classes.mainPage}>
      <Main>
        <Switch>
          {
            SLOTS_ENTRIES.map(([page, route]) => (
              <Route {...route} key={page}>
                <BannerSlot
                  device={EBanner_Device.mobile}
                  page={page}
                  slot={"top"}
                  isMain={true}
                  className={classes.withoutPadding}
                >
                  {(banners) => <Banner isMobile={true} banners={banners} slot={"top"} />}
                </BannerSlot>
              </Route>
            ))
          }
        </Switch>

        <Switch>
          {IS_STARZBET_KG ? null : <Route path={extendedSportsBookRoutes}>{children}</Route>}

          <Route path={routeMap.virtual}>
            <Virtual>
              {children}
            </Virtual>
          </Route>

          {Object.values(pages).map(objToComponent("path")(Route))}

          <Route path={routeMap.root} component={LandingPage} exact />

          <RedirectLocalized to={routeMap.root} />
        </Switch>
      </Main>

      <Switch>
        <Route component={null} path={withoutFooterExceptProfile} />

        <Route component={FooterWrapper} />
      </Switch>
    </div>
  );
};
MainPage.displayName = "MainPage";

export { MainPage };

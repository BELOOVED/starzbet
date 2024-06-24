// @ts-nocheck
import { createElement, memo, type MouseEvent } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_betSlip_tab_betSlip,
  sportsbookui_starzbet_bottomNavMenu_button_azSports,
  sportsbookui_starzbet_bottomNavMenu_button_myBets,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { loggedSelector } from "@sb/auth";
import {
  platformui_starzbet_mainNavigationLinks_link_home,
  platformui_starzbet_menu_button_deposit,
  platformui_starzbet_navLink_offers,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./BottomNavigationMenu.module.css";
import { routeMap as routeMapCasino } from "../../../../../../../platformui/RouteMap/RouteMap";
import { BonusIcon } from "../../../../../../../platformui/Themes/Starzbet/Components/Icons/BonusIcon/BonusIcon";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { useModalOpenAction } from "../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { DepositIcon } from "../../../../../../../platformui/Themes/Starzbet/Components/Icons/DepositIcon/DepositIcon";
import { LoggedContainer } from "../../../../../../../common/Containers/LoggedContainer/LoggedContainer";
import { LinkLocalized } from "../../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { betSlipTabEnum } from "../../../../../../Store/BetSlip/Model/BetSlipTab";
import { useBetSlipChangeTabAction } from "../../../../../../Store/BetSlip/Hooks/UseBetSlipChangeTabAction";
import { ResetedLink, ResetedNavLink } from "../../../../../../Components/ResetedLink/ResetedLink";
import { totalCoefficientForAllViewSelector } from "../../../../../../Store/BetSlip/Selectors/ViewSelectors/TotalCoefficientViewSelectors";
import { coefficientFormat } from "../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { openedBetsCountSelector } from "../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { ReceiptIcon } from "../../../Components/Icons/ReceiptIcon/ReceiptIcon";
import { MyBetsIcon } from "../../../Components/Icons/MyBetsIcon/MyBetsIcon";
import { HomeIconButton } from "../../../Components/Icons/HomeIcon/HomeIcon";
import { SoccerIconBottom } from "../../../Components/SportIcon/SoccerIcon/SoccerIcon";

const AllSportsLink = memo(({ to }) => {
  const [t] = useTranslation();

  return (
    <ResetedNavLink className={classes.button} activeClassName={classes.active} to={to}>
      <SoccerIconBottom size={"s"} color={"darkText"} />

      <span className={classes.headline}>{t(sportsbookui_starzbet_bottomNavMenu_button_azSports)}</span>
    </ResetedNavLink>
  );
});
AllSportsLink.displayName = "AllSportsLink";

const NotLoggedBonusButton = memo(() => {
  const [t] = useTranslation();

  return (
    <ResetedLink className={classes.button} to={routeMap.login}>
      <BonusIcon size={"m"} color={"darkText"} />

      <span className={classes.headline}>
        {t(platformui_starzbet_navLink_offers)}
      </span>
    </ResetedLink>
  );
});
NotLoggedBonusButton.displayName = "NotLoggedBonusButton";

const BonusButton = memo(() => {
  const [t] = useTranslation();

  return (
    <ResetedLink to={routeMap.myAccount.bonuses.root} className={classes.button}>
      <BonusIcon size={"m"} color={"darkText"} />

      <span className={classes.headline}>
        {t(platformui_starzbet_navLink_offers)}
      </span>
    </ResetedLink>
  );
});
BonusButton.displayName = "BonusButton";

const allSportsLinkList = [
  {
    path: routeMap.live.root,
    to: routeMap.live.allSports,
  },
  {
    path: routeMap.esport.root,
    to: routeMap.esport.preLive.allSports,
  },
  {
    path: routeMapCasino.casino,
    to: routeMapCasino.casinoAllSports,
  },
  {
    path: routeMapCasino.liveCasino,
    to: routeMapCasino.liveCasinoAllSports,
  },
  {
    path: routeMapCasino.games,
    to: routeMapCasino.gamesAllSports,
  },
];

const BetSlipOdds = memo(() => {
  const odds = useSelector(totalCoefficientForAllViewSelector);

  if (odds === 0) {
    return (
      <ReceiptIcon size={"s"} color={"darkText"} />
    );
  }

  return (
    <div className={classes.totalOdds}>
      {coefficientFormat(odds)}
    </div>
  );
});
BetSlipOdds.displayName = "BetSlipOdds";

const MyBetCount = memo(() => {
  const opened = useSelector(openedBetsCountSelector);

  if (opened === 0) {
    return null;
  }

  return (
    <div className={classes.opened}>{opened}</div>
  );
});
MyBetCount.displayName = "MyBetCount";

const AllButton = memo(() => (
  <Switch>
    {
      allSportsLinkList.map(({ path, to }) => (
        <Route path={path} key={path}>
          <AllSportsLink to={to} />
        </Route>
      ))
    }

    <AllSportsLink to={routeMap.preLive.allSports} />
  </Switch>
));
AllButton.displayName = "AllButton";

const MyCouponButton = memo(() => {
  const [t] = useTranslation();
  const changeBetSlipTab = useBetSlipChangeTabAction();
  const logged = useSelector(loggedSelector);

  const openLoginModal = useModalOpenAction(EModal.login);
  const openBetSlipModal = useModalOpenAction(EModal.betSlip);

  const handleTabClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!logged) {
      openLoginModal();
    } else {
      openBetSlipModal();
      changeBetSlipTab(e);
    }
  };

  return (
    <button
      className={classes.button}
      data-tab={betSlipTabEnum.myBets}
      onClick={handleTabClick}
    >
      <MyBetCount />

      <MyBetsIcon size={"s"} color={"darkText"} />

      <Ellipsis className={classes.headline}>
        {t(sportsbookui_starzbet_bottomNavMenu_button_myBets)}
      </Ellipsis>
    </button>
  );
});
MyCouponButton.displayName = "MyCouponButton";

const BetSlipButton = memo(() => {
  const [t] = useTranslation();
  const changeBetSlipTab = useBetSlipChangeTabAction();
  const openBetSlipModal = useModalOpenAction(EModal.betSlip);

  const handleTabClick = (e: MouseEvent<HTMLButtonElement>) => {
    openBetSlipModal();
    changeBetSlipTab(e);
  };

  return (
    <button
      className={classes.button}
      data-tab={betSlipTabEnum.betConstructor}
      onClick={handleTabClick}
    >
      <BetSlipOdds />

      <Ellipsis className={classes.headline}>
        {t(sportsbookui_starzbet_betSlip_tab_betSlip)}
      </Ellipsis>
    </button>
  );
});
BetSlipButton.displayName = "BetSlipButton";

const DepositButtonContent = memo(() => {
  const [t] = useTranslation();

  return (
    <button
      className={classes.button}
    >
      <DepositIcon size={"s"} />

      <span>
        <Ellipsis>
          {t(platformui_starzbet_menu_button_deposit)}
        </Ellipsis>
      </span>
    </button>
  );
});
DepositButtonContent.displayName = "DepositButtonContent";

const NotLoggedDepositBtn = memo(() => (
  <ResetedLink
    className={classes.button}
    to={routeMapCasino.loginRoute}
  >
    <DepositButtonContent />
  </ResetedLink>
));
NotLoggedDepositBtn.displayName = "NotLoggedDepositBtn";

const DepositBtn = memo(() => (
  <ResetedLink
    className={classes.button}
    to={routeMapCasino.depositRoute}
  >
    <DepositButtonContent />
  </ResetedLink>
));
DepositBtn.displayName = "DepositBtn";

const Deposit = memo(() => (
  <LoggedContainer
    logged={<DepositBtn />}
    notLogged={<NotLoggedDepositBtn />}
  />
));
Deposit.displayName = "Deposit";

const HomeButton = memo(() => {
  const [t] = useTranslation();

  return (
    <LinkLocalized to={routeMap.root} className={classes.button}>
      <HomeIconButton />

      <span className={classes.headline}>
        <Ellipsis>
          {t(platformui_starzbet_mainNavigationLinks_link_home)}
        </Ellipsis>
      </span>
    </LinkLocalized>
  );
});
HomeButton.displayName = "HomeButton";

const buttons = [{
  el: HomeButton,
}, {
  el: AllButton,
}, {
  el: BetSlipButton,
}, {
  el: MyCouponButton,
}, {
  el: Deposit,
}];

const BottomNavigationMenu = memo(() => (
  <div className={classes.bottomNavigationMenu}>
    {/* eslint-disable-next-line rulesdir/no-truethly-default-assign */}
    {buttons.map(({ el, condition = true }, index) => condition && createElement(el, { key: index }))}
  </div>
));
BottomNavigationMenu.displayName = "BottomNavigationMenu";

export { BottomNavigationMenu };

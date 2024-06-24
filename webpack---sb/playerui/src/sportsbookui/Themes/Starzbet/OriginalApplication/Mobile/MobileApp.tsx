// @ts-nocheck
import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { objToComponent } from "@sb/utils";
import classes from "./MobileApp.module.css";
import { ThemeContainer } from "../../../../../common/Components/ThemeContainer/ThemeContainer";
import { EModal } from "../../../../../common/Store/Modal/Model/EModal";
import { SkeletonLoader } from "../../../../../common/Components/SkeletonLoader/SkeletonLoader";
import { Modal } from "../../../../Containers/Modal/Modal";
import { NotSupportedCurrency } from "../../../../Components/NotSupportedCurrency/NotSupportedCurrency";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { lineIsReadySelector } from "../../../../Store/Feed/Selectors/FeedSelectors";
import { LoginModal as LoginPreview } from "../Desktop/Components/LoginModal/LoginModal";
import { BetSettings } from "../Components/BetSlip/BetConstructor/BetConstructorToolbar/BetSettings/BetSettings";
import { EditBetTutorial } from "../Desktop/Components/BetSlip/EditBetTutorial/EditBetTutorial";
import { BetHistory } from "../Desktop/Components/BetSlip/BetHistory/BetHistory";
import { CustomCoupon } from "../Components/CustomCoupon/CustomCoupon/CustomCoupon";
import { BetSlipModal } from "../Components/BetSlip/BetSlip/BetSlip";
import { routes } from "./Routes/Routes";
import { Autocashout } from "./Components/BetSlip/Autocashout/Autocashout";
import { BetConflictModal } from "./Components/BetSlip/BetConflictModal/BetConflictModal";
import { AddSelectionTip } from "./Components/BetSlip/AddSelectionTip/AddSelectionTip";
import { Virtual } from "./Pages/Virtual/Virtual";
import { BottomNavigationMenu } from "./Components/BottomNavigationMenu/BottomNavigationMenu";
import { AddingSelections } from "./Components/BetSlip/AddingSelections/AddingSelections";

const pages = [
  routes.preLiveAll,
  routes.liveAll,
  routes.esportPreLiveAll,
  routes.preLive,
  routes.live,
  routes.esport.live,
  routes.esport.preLive,
  routes.betSlip,
  routes.statistics,
  routes.category,
  routes.tournament,
];

const modalMap = {
  [EModal.betHistory]: <BetHistory />,
  [EModal.betConflict]: <BetConflictModal />,
  [EModal.autoCashout]: <Autocashout />,
  [EModal.editBetTutorial]: <EditBetTutorial />,
  [EModal.addSelectionTip]: <AddSelectionTip />,
  [EModal.betSettings]: <BetSettings />,
  [EModal.coupon]: <CustomCoupon />,
  [EModal.login]: <LoginPreview />,
  [EModal.notSupportedCurrency]: <NotSupportedCurrency />,
  [EModal.betSlip]: <BetSlipModal />,
};

const MobileApp = memo(({ extraClass = "" }) => {
  const isLineReady = useSelector(lineIsReadySelector);

  return (
    <ThemeContainer>
      <div className={`${classes.mobileApp} ${extraClass}`}>
        <Modal modalMap={modalMap} />

        {
          isLineReady
            ? (
              <Switch>
                <Route path={routeMap.virtual.root} component={Virtual} />

                {pages.map(objToComponent("path")(Route))}
              </Switch>
            )
            : <SkeletonLoader isFullHeight />
        }

        <BottomNavigationMenu />

        <AddingSelections />
      </div>
    </ThemeContainer>
  );
});
MobileApp.displayName = "MobileApp";

export { MobileApp };

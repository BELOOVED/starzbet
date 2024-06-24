import { memo } from "react";
import { Route } from "react-router-dom";
import { type Location, matchPath, type TMatch } from "@sb/react-router-compat";
import {
  platformui_starzbet_bonus_tabs_available,
  platformui_starzbet_bonus_tabs_history,
  platformui_starzbet_bonus_tabs_myBonuses,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./BonusTabs.module.css";
import { NativeHorizontalScroll } from "../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { NavLink } from "../../../../../../../common/Themes/Starzbet/Components/NavLink/NavLink";
import { Space } from "../../../../../../../common/Components/Space/Space";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { BonusSortSelect } from "../../../../Components/Bonuses/BonusSortSelect/BonusSortSelect";
import { CompletedToggle } from "../../../../Components/Bonuses/CompletedToggle/CompletedToggle";
import { PromoCode } from "../../../../Components/Bonuses/PromoCode/PromoCode";
import { ProductFilter } from "./ProductFilter/ProductFilter";

const routesWithProductsFilter = [
  routeMap.bonusesRoute,
  routeMap.availableBonusesRoute,
  routeMap.myBonusesRoute,
];

const routesWithPromoCode = [
  routeMap.bonusesRoute,
  routeMap.availableBonusesRoute,
];

const routesWithSort = [
  routeMap.historyBonusesRoute,
];

const isAvailableLinkActive = (_: TMatch | null, location: Location) =>
  !!matchPath(location.pathname, { path: [routeMap.availableBonusesRoute, routeMap.bonusesRoute], exact: true });

const Tabs = memo(() => {
  const [t] = useTranslation();

  return (
    <NativeHorizontalScroll>
      <Space value={4}>
        <NavLink
          colorScheme={"orange-gradient-mobile"}
          to={routeMap.availableBonusesRoute}
          isActive={isAvailableLinkActive}
        >
          {t(platformui_starzbet_bonus_tabs_available)}
        </NavLink>

        <NavLink
          colorScheme={"orange-gradient-mobile"}
          to={routeMap.myBonusesRoute}
        >
          {t(platformui_starzbet_bonus_tabs_myBonuses)}
        </NavLink>

        <NavLink
          colorScheme={"orange-gradient-mobile"}
          to={routeMap.historyBonusesRoute}
        >
          {t(platformui_starzbet_bonus_tabs_history)}
        </NavLink>
      </Space>
    </NativeHorizontalScroll>
  );
});
Tabs.displayName = "Tabs";

const BonusTabs = memo(() => (
  <div className={classes.tabsContainer}>
    <Tabs />

    <Route path={routesWithProductsFilter} exact>
      <div className={classes.mt8}>
        <ProductFilter />
      </div>
    </Route>

    <Route path={routesWithPromoCode} exact>
      <div className={classes.bottomBlock}>
        <PromoCode className={classes.promoContainer} />
      </div>
    </Route>

    <Route path={routesWithSort} exact>
      <div className={classes.bottomBlock}>
        <BonusSortSelect className={classes.bonusSortSelect} />

        <CompletedToggle className={classes.completedToggle} />
      </div>
    </Route>
  </div>
));
BonusTabs.displayName = "BonusTabs";

export { BonusTabs };

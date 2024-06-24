// @ts-nocheck
import clsx from "clsx";
import React, { createElement, memo, useCallback, useReducer } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import { not, type TVoidFn, withProps } from "@sb/utils";
import classes from "./NavMenu.module.css";
import { CollapseIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import { NativeHorizontalScroll } from "../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { useLocalizedPush } from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import {
  esportsLiveSelector,
  esportsPreLiveSelector,
  withoutEsportsAndVirtualPreLiveSelector,
} from "../../../../../../Store/Feed/Hooks/UsePreLiveSportsSelector";
import { withoutEsportsLiveSelector } from "../../../../../../Store/Feed/Hooks/UseLiveSportsSelector";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { ChevronRightIcon } from "../../../Components/Icons/ChevronIcon/ChevronRightIcon";
import { ChevronLeftIcon } from "../../../Components/Icons/ChevronIcon/ChevronLeftIcon";
import { MobileNavBar } from "../SideBarCommonItems/SideBarCommonItems";
import { defaultPeriod, getPeriod, getSportSlug, type IPeriod, periods } from "./NavUtils";
import { EsportLiveSportSlide, EsportPreLiveSportSlide, LiveSportSlide, PreLiveSportSlide } from "./SportSlide";

const PrevArrow = memo(({
  scrollBy,
}) => {
  const onClick = () => scrollBy(-50);

  return (
    <div className={classes.prevArrow} onClick={onClick}>
      <ChevronLeftIcon width={24} height={24} />
    </div>
  );
});
PrevArrow.displayName = "PrevArrow";

const NextArrow = memo(({
  scrollBy,
}) => {
  const onClick = () => scrollBy(50);

  return (
    <div className={classes.nextArrow} onClick={onClick}>
      <ChevronRightIcon width={24} height={24} />
    </div>
  );
});
NextArrow.displayName = "NextArrow";

const SportCarousel = memo(({
  sports,
  slide,
}) => {
  const isMuchSports = sports.length > 10;

  return (
    <div className={clsx(classes.carouselContainer, !isMuchSports && classes.noPadding)}>
      <NativeHorizontalScroll
        trackClassName={classes.sportCarousel}
        prevArrow={isMuchSports && PrevArrow}
        nextArrow={isMuchSports && NextArrow}
      >
        {
          sports.map(({ id }) => (
            createElement(slide, { sportId: id, key: id })
          ))
        }
      </NativeHorizontalScroll>
    </div>
  );
});
SportCarousel.displayName = "SportCarousel";

const MobileSportCarousel = memo(({
  sports,
  slide,
}) => (
  <div className={classes.sportCarouselMobile}>
    <NativeHorizontalScroll trackClassName={classes.sportCarousel}>
      {
        sports.map(({ id }) => (
          createElement(slide, { sportId: id, key: id })
        ))
      }

      <div className={classes.stub} />
    </NativeHorizontalScroll>
  </div>
));
MobileSportCarousel.displayName = "MobileSportCarousel";

interface IPeriodDropdown {
  changePeriod: TVoidFn;
  matchPeriod: string;
}

interface IPeriodItem extends IPeriodDropdown {
  index: number;
  item: IPeriod;
}

const PeriodItem = memo<IPeriodItem>(({
  changePeriod,
  index,
  item,
  matchPeriod,
}) => {
  const [t] = useTranslation();

  const { name, period } = item;
  const onClick = () => changePeriod(index);

  const match = period === matchPeriod;

  return (
    <div onClick={onClick} className={clsx(classes.dropdownItem, match && classes.activeDropdown)}>
      <Ellipsis>
        {t(...name)}
      </Ellipsis>
    </div>
  );
});
PeriodItem.displayName = "PeriodItem";

const PeriodDropdown = memo<IPeriodDropdown>(({ changePeriod, matchPeriod }) => (
  <div className={classes.dropdown}>
    {
      periods.map((el, index) => (
        <PeriodItem
          changePeriod={changePeriod}
          index={index}
          item={el}
          key={index}
          matchPeriod={matchPeriod}
        />
      ))
    }
  </div>
));
PeriodDropdown.displayName = "PeriodDropdown";

const PeriodSelect = memo(({ isEsport }) => {
  const [open, toggleOpen] = useReducer(not<boolean>, false);

  const [t] = useTranslation();

  const matchParams = isEsport
    ? [routeMap.esport.preLive.sport, routeMap.esport.preLive.period]
    : [routeMap.preLive.sport, routeMap.preLive.period];

  const match = useRouteMatch<{
    period: string;
    sportSlug: string;
  }>(matchParams,
  );

  const matchPeriod = getPeriod(match) ?? defaultPeriod;

  const { name } = periods.find(({ period }) => period === matchPeriod);

  const sportSlug = getSportSlug(match);

  const push = useLocalizedPush();

  const sportPathToPush = isEsport ? routeMap.esport.preLive.sport : routeMap.preLive.sport;

  const periodPathToPush = isEsport ? routeMap.esport.preLive.period : routeMap.preLive.period;

  const changePeriod = useCallback(
    (value: number) => {
      const period = periods[value].period;

      const path = sportSlug ? sportPathToPush : periodPathToPush;

      push(path, { period, sportSlug });
    },
    [sportSlug],
  );

  return (
    <div className={classes.select} onClick={toggleOpen}>
      <div className={classes.currentSelect}>
        <Ellipsis>
          {t(...name)}
        </Ellipsis>
      </div>

      <CollapseIcon expanded={open} />

      {open && <PeriodDropdown changePeriod={changePeriod} matchPeriod={matchPeriod} />}
    </div>
  );
});
PeriodSelect.displayName = "PeriodSelect";

enum ESportPage {
  live,
  prelive,
  e_live,
  e_prelive,
}

const selectors = {
  [ESportPage.live]: withoutEsportsLiveSelector,
  [ESportPage.e_live]: esportsLiveSelector,
  [ESportPage.prelive]: withoutEsportsAndVirtualPreLiveSelector,
  [ESportPage.e_prelive]: esportsPreLiveSelector,
};

const slides = {
  [ESportPage.live]: LiveSportSlide,
  [ESportPage.e_live]: EsportLiveSportSlide,
  [ESportPage.prelive]: PreLiveSportSlide,
  [ESportPage.e_prelive]: EsportPreLiveSportSlide,
};

interface INavMenu {
  type: ESportPage;
}

const DesktopNavMenu = memo<INavMenu>(({ type }) => {
  const sports = useSelector(selectors[type], shallowEqual);

  const isPreLive = (type === ESportPage.e_prelive) || (type === ESportPage.prelive);

  const isEsport = (type === ESportPage.e_prelive) || (type === ESportPage.e_live);

  return (
    <div className={classes.navMenu}>
      <SportCarousel sports={sports} slide={slides[type]} />

      {isPreLive && <PeriodSelect isEsport={isEsport} />}
    </div>
  );
});
DesktopNavMenu.displayName = "DesktopNavMenu";

const MobileNavMenu = memo<INavMenu>(({ type }) => {
  const sports = useSelector(selectors[type], shallowEqual);

  const isPreLive = (type === ESportPage.e_prelive) || (type === ESportPage.prelive);

  const isEsport = (type === ESportPage.e_prelive) || (type === ESportPage.e_live);

  return (
    <div className={classes.mobileNavMenu}>
      <div className={classes.mobileControls}>
        <MobileNavBar isLive={!isPreLive} isEsport={isEsport} />

        {isPreLive && <PeriodSelect isEsport={isEsport} />}
      </div>

      <div className={classes.buttons}>
        <MobileSportCarousel
          sports={sports}
          slide={slides[type]}
        />
      </div>
    </div>
  );
});
MobileNavMenu.displayName = "MobileNavMenu";

const PreLiveNavMenu = withProps(DesktopNavMenu)({ type: ESportPage.prelive });

const LiveNavMenu = withProps(DesktopNavMenu)({ type: ESportPage.live });

const ESportLiveNavMenu = withProps(DesktopNavMenu)({ type: ESportPage.e_live });

const EsportPreLiveNavMenu = withProps(DesktopNavMenu)({ type: ESportPage.e_prelive });

const MobilePreLiveNavMenu = withProps(MobileNavMenu)({ type: ESportPage.prelive });

const MobileEsportPreLiveNavMenu = withProps(MobileNavMenu)({ type: ESportPage.e_prelive });

const MobileLiveNavMenu = withProps(MobileNavMenu)({ type: ESportPage.live });

const MobileEsportLiveNavMenu = withProps(MobileNavMenu)({ type: ESportPage.e_live });

export {
  PreLiveNavMenu,
  LiveNavMenu,
  EsportPreLiveNavMenu,
  ESportLiveNavMenu,
  MobilePreLiveNavMenu,
  MobileLiveNavMenu,
  MobileEsportPreLiveNavMenu,
  MobileEsportLiveNavMenu,
  ESportPage,
};

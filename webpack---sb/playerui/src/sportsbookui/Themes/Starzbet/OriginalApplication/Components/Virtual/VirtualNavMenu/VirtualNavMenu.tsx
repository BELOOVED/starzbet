// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import classes from "./VirtualNavMenu.module.css";
import { NativeHorizontalScroll } from "../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { virtualSportSortedSelector } from "../../../../../../Store/Feed/Hooks/UsePreLiveSportsSelector";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import {
  virtualActiveSportIdByParamsSelector,
} from "../../../../../../Store/Virtual/Common/Selectors/VirtualActiveSportIdByParamsSelector";
import { getSportTKeyById } from "../../../../../../Store/Feed/Model/Sport";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { useVirtualNavMenuSportHandler } from "../../../../../../Store/Virtual/Common/Hooks/UseVirtualNavMenuSportHandler";
import { SportIcon } from "../../../../../../Components/SportIcon/SportIcon";

const VirtualSportSlide = memo(({ id }) => {
  const [t] = useTranslation();

  const handleClick = useVirtualNavMenuSportHandler(id);
  const match = useRouteMatch([routeMap.virtual.category, routeMap.virtual.roulette]);

  const activeSportId = useSelector(virtualActiveSportIdByParamsSelector(match?.params));

  const classList = clsx(
    classes.slide,
    classes.virtual,
    activeSportId === id && classes.active,
  );

  return (
    <div className={classList} onClick={handleClick}>
      <div className={classes.icon}>
        <SportIcon id={id} />
      </div>

      <Ellipsis>
        {t(getSportTKeyById(id))}
      </Ellipsis>
    </div>
  );
});
VirtualSportSlide.displayName = "VirtualSportSlide";

const VirtualNavMenu = memo(() => {
  const sports = useSelector(virtualSportSortedSelector, shallowEqual);

  return (
    <NativeHorizontalScroll className={classes.sliderWrapper}>
      {
        sports.map(({ id }) => (
          <VirtualSportSlide key={id} id={id} />
        ))
      }
    </NativeHorizontalScroll>
  );
});
VirtualNavMenu.displayName = "VirtualNavMenu";

export { VirtualNavMenu };

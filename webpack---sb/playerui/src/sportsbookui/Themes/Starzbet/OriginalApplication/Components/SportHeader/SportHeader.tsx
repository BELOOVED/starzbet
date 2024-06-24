import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { sportsbookui_starzbet_liveMenuEvent_live } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./SportHeader.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { getSportTKeyById } from "../../../../../Store/Feed/Model/Sport";
import { removeFavouritePostfix } from "../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { SportIcon } from "../SportIcon/SportIcon";

const SportHeader = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();

  const pathname = useSelector(routerLocationPathnameSelector);

  const isLive = matchPath(pathname, routeMap.live.root);

  const sportId = removeFavouritePostfix(id);

  const containerClass = clsx(classes.sportHeader, IS_MOBILE_CLIENT_SIDE && classes.mobileHeader);

  return (
    <div className={containerClass}>
      <div className={classes.left}>
        <div className={classes.sportIconWrapper}>
          <SportIcon id={sportId} isSportHeader={true} />
        </div>

        <Ellipsis>
          {t(getSportTKeyById(sportId))}
        </Ellipsis>

        {
          isLive
            ? (
              <div className={classes.live}>
                <span>
                  {t(sportsbookui_starzbet_liveMenuEvent_live)}
                </span>
              </div>
            )
            : null
        }
      </div>
    </div>
  );
});
SportHeader.displayName = "SportHeader";

export { SportHeader };

import clsx from "clsx";
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { type TComponent } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_mainNavigationLinks_link_home, type TTKeys } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./PageTitle.module.css";
import { Ellipsis } from "../../../../../platformui/Components/Ellipsis/Ellipsis";
import { routeMap } from "../../../../../platformui/RouteMap/RouteMap";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../Store/DeviceInfo/DeviceInfoConstant";
import { LinkLocalized } from "../../../../Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";

interface IPageTitleProps {
  path: string;
  tKey: TTKeys;
  icon: TComponent;
  className?: string;
}

const PageTitle = memo<IPageTitleProps>(({
  path,
  icon,
  tKey,
  className,
}) => {
  const currentPath = useSelector(routerLocationPathnameSelector);

  const match = matchPath(currentPath, path);

  const [t] = useTranslation();

  if (!match) {
    return null;
  }

  if (IS_MOBILE_CLIENT_SIDE) {
    return (
      <div className={classes.container}>
        <div className={classes.pageTitle}>
          <div className={classes.left}>
            <div className={clsx(classes.iconBack, className)}>
              {createElement(icon)}
            </div>
          </div>

          <div className={classes.right}>
            <div className={classes.name}>
              <Ellipsis>
                {t(tKey)}
              </Ellipsis>
            </div>

            <div className={classes.bread}>
              <LinkLocalized to={routeMap.root}>
                {t(platformui_starzbet_mainNavigationLinks_link_home)}
              </LinkLocalized>

              {" // "}

              <div>
                {t(tKey)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>
        <div className={classes.left}>
          <div className={clsx(classes.iconBack, className)}>
            {createElement(icon)}
          </div>

          <div className={classes.name}>
            <Ellipsis>
              {t(tKey)}
            </Ellipsis>
          </div>
        </div>

        <div className={classes.bread}>
          <LinkLocalized to={routeMap.root}>
            {t(platformui_starzbet_mainNavigationLinks_link_home)}
          </LinkLocalized>

          {" // "}

          <div>
            {t(tKey)}
          </div>
        </div>
      </div>
    </div>
  );
});
PageTitle.displayName = "PageTitle";

export { PageTitle };

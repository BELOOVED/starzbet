import clsx from "clsx";
import { type ComponentType, createElement, Fragment, memo, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { isNotNil, useAction } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { type TTKeys } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./PageHeader.module.css";
import { type TIconProps } from "../../../../../../common/Components/Icon/Icon";
import { ResetedNavLink } from "../../../../../../sportsbookui/Components/ResetedLink/ResetedLink";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { hiddenDetailsSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { toggleHideDetailsAction } from "../../../../../../common/Store/Player/PlayerActions";
import { type TRoutePath } from "../../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { BackButton } from "../BackButton/BackButton";

interface IRoutePointWithTKey {
  titleTKey: TTKeys;
  titleNode?: never;
  path: TRoutePath;
}

interface IRoutePointWithNode {
  titleTKey?: never;
  titleNode: ReactNode;
  path: TRoutePath;
}

type TRoutePointProps = IRoutePointWithTKey | IRoutePointWithNode

const RoutePoint = memo<TRoutePointProps>(({ titleTKey, path, titleNode }) => {
  const [t] = useTranslation();

  if (isNotNil(path)) {
    return (
      <ResetedNavLink to={path}>
        {titleTKey ? t(titleTKey) : titleNode}
      </ResetedNavLink>
    );
  }

  return (
    <span className={classes.activeRoute}>
      {titleTKey ? t(titleTKey) : titleNode}
    </span>
  );
});
RoutePoint.displayName = "RoutePoint";

const HideButton = memo(() => {
  const hide = useSelector(hiddenDetailsSelector);
  const toggleHide = useAction(toggleHideDetailsAction);

  return (
    <Button colorScheme={"secondary-grey"} onClick={toggleHide} className={classes.hideButton}>
      <div
        className={clsx(classes.hide, hide && classes.show)}
      />
    </Button>
  );
});
HideButton.displayName = "HideButton";

const divider = (
  <>
    &nbsp;
    &#47;
    &#47;
    &nbsp;
  </>
);

type TPageHeaderSourceMap = [...TRoutePointProps[], Omit<TRoutePointProps, "path">]

const isRoutePoint = (point: TPageHeaderSourceMap[number]): point is TRoutePointProps => Object.hasOwn(point, "path");

type THeaderColorScheme = "orange-gradient" | "purple" | "grey" | "blue"

const colorSchemeToClassNameMap: Record<THeaderColorScheme, string | undefined> = {
  "orange-gradient": classes.orangeHeaderIcon,
  "purple": classes.purpleHeaderIcon,
  "blue": classes.blueHeaderIcon,
  "grey": classes.greyHeaderIcon,
};

interface IPageHeaderProps {
  title: ReactNode;
  routeMap: TPageHeaderSourceMap;
  icon: ComponentType<TIconProps>;
  /**
   * icon background
   */
  headerColorScheme: THeaderColorScheme;
  backPath?: TRoutePath;
  withHide?: boolean;
}

interface IPageHeaderPropsNever {
  title?: never;
  routeMap?: never;
  icon?: never;
  iconClassName?: never;
  backPath?: never;
}

const PageHeader = memo<IPageHeaderProps>(({
  title,
  routeMap,
  icon,
  headerColorScheme,
  backPath,
  withHide,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.header}>
      <div className={clsx(classes.headerIconContainer, colorSchemeToClassNameMap[headerColorScheme])}>
        {createElement(icon, { size: "s", color: "white" })}
      </div>

      <div className={classes.headerContent}>
        <div className={classes.headerTitle} {...qaAttr(PlayerUIQaAttributes.PageTitle)}>
          <Ellipsis>{title}</Ellipsis>
        </div>

        <div className={classes.headerSubtitle}>
          {
            routeMap.map((point, idx) => isRoutePoint(point)
              ? (
                <Fragment key={idx}>
                  <RoutePoint {...point} key={idx} />

                  {divider}
                </Fragment>
              )
              : (
                <span className={classes.activeRoute} key={idx}>
                  {point.titleTKey ? t(point.titleTKey) : point.titleNode}
                </span>
              ))
          }
        </div>
      </div>

      {isNotNil(backPath) ? <BackButton to={backPath} /> : null}

      {withHide ? <HideButton /> : null}
    </div>
  );
});
PageHeader.displayName = "PageHeader";

export type { TPageHeaderSourceMap, IPageHeaderProps, IPageHeaderPropsNever };
export { PageHeader };

import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { loggedSelector } from "@sb/auth";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./Logo.module.css";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { routeMap } from "../../../../../RouteMap/RouteMap";

const Logo = memo(() => {
  const logged = useSelector(loggedSelector);

  const logo = clsx(
    classes.logo,
    logged && classes.logged,
  );

  return (
    <LinkLocalized to={routeMap.root} className={logo} {...qaAttr(PlayerUIQaAttributes.Header.Logo)} />
  );
});
Logo.displayName = "Logo";

export { Logo };

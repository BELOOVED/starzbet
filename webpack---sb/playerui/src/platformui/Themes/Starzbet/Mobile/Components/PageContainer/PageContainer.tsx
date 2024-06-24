// @ts-nocheck
import clsx from "clsx";
import { useRouteMatch } from "@sb/react-router-compat";
import classes from "./PageContainer.module.css";
import { WITHOUT_NAV_BAR_ROUTES } from "../Header/Header";

const PageContainer = ({ children }) => {
  const withoutNavBar = useRouteMatch({ path: WITHOUT_NAV_BAR_ROUTES, exact: true });

  return (
    <div className={clsx(classes.pageContainer, withoutNavBar && classes.withoutNavBar)}>
      {children}
    </div>
  );
};
PageContainer.displayName = "PageContainer";

export { PageContainer };

// @ts-nocheck
import { memo } from "react";
import { useSelector } from "react-redux";
import { awaitLoginSelector, awaitRecoverySelector, loggedSelector } from "@sb/auth";
import classes from "./PageContainer.module.css";
import {
  RedirectLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { hasProfileAndWalletSelector } from "../../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";

const AuthenticationPending = memo(() => (
  <div className={classes.pageContainer}>
    <div className={classes.authenticationPending}>
      <Loader />
    </div>
  </div>
));
AuthenticationPending.displayName = "AuthenticationPending";

const LoggedPage = ({ children }) => {
  const hasProfile = useSelector(hasProfileAndWalletSelector);

  if (!hasProfile) {
    return (
      <AuthenticationPending />
    );
  }

  return (
    <div className={classes.pageContainer}>
      {children}
    </div>
  );
};
LoggedPage.displayName = "LoggedPage";

const NotLoggedPage = memo(() => {
  const awaitLogin = useSelector(awaitLoginSelector);
  const awaitRecovery = useSelector(awaitRecoverySelector);

  if (!awaitLogin && !awaitRecovery) {
    return <RedirectLocalized to={routeMap.root} />;
  }

  return (
    <AuthenticationPending />
  );
});
NotLoggedPage.displayName = "NotLoggedPage";

const PageContainer = ({ children }) => {
  const logged = useSelector(loggedSelector);

  return (
    logged
      ? (
        <LoggedPage>{children}</LoggedPage>
      )
      : <NotLoggedPage />
  );
};
PageContainer.displayName = "PageContainer";

export { PageContainer };

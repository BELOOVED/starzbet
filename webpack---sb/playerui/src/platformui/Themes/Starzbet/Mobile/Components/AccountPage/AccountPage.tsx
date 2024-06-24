import { type FC, memo, type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { awaitLoginSelector, awaitRecoverySelector, loggedSelector } from "@sb/auth";
import { isNotVoid, withProps } from "@sb/utils";
import { useRouteMatch } from "@sb/react-router-compat";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./AccountPage.module.css";
import {
  RedirectLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { hasProfileAndWalletSelector } from "../../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { playerNotVerifiedSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { smoothScrollToTop } from "../../../../../Utils/ScrollToTop";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon/VerifiedIcon";
import { AuthenticationPending } from "../AuthenticationPending/AuthenticationPending";
import { type IPageHeaderProps, type IPageHeaderPropsNever, PageHeader } from "../PageHeader/PageHeader";

const routeAvailableWhenNotVerified = [
  routeMap.myAccountRoute,
  routeMap.myDetailsRoute,
  routeMap.passwordRoute,
  routeMap.contactUs,
  routeMap.helpCenter,
];

const LoggedPage: FC<PropsWithChildren> = ({ children }) => {
  const hasProfile = useSelector(hasProfileAndWalletSelector);
  const notVerified = useSelector(playerNotVerifiedSelector);

  const match = useRouteMatch(routeAvailableWhenNotVerified);

  if (!hasProfile) {
    return (
      <AuthenticationPending />
    );
  }

  if (notVerified && !match) {
    return (
      <RedirectLocalized to={routeMap.myDetailsRoute} />
    );
  }

  return (
    <div className={classes.childrenContainer}>
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

const isPageHeaderProps = (props: IPageHeaderProps | IPageHeaderPropsNever): props is IPageHeaderProps => isNotVoid(props);

const Wrapper: FC<PropsWithChildren<IPageHeaderProps | IPageHeaderPropsNever>> = ({
  children,
  ...props
}) => (
  <div className={classes.accountPage} {...qaAttr(PlayerUIQaAttributes.PageContent)}>
    {isPageHeaderProps(props) ? <PageHeader {...props} /> : null}

    {children}
  </div>
);
Wrapper.displayName = "Wrapper";

const AccountPage: FC<PropsWithChildren<IPageHeaderProps | IPageHeaderPropsNever>> = ({
  children,
  ...props
}) => {
  const logged = useSelector(loggedSelector);

  smoothScrollToTop();

  return (
    <Wrapper {...props}>
      {
        logged
          ? (
            <LoggedPage>{children}</LoggedPage>
          )
          : <NotLoggedPage />
      }
    </Wrapper>
  );
};
AccountPage.displayName = "AccountPage";

const BonusAccountPage = withProps(AccountPage)({
  icon: VerifiedIcon,
  backPath: routeMap.myAccountRoute,
  headerColorScheme: "orange-gradient",
});

export { AccountPage, BonusAccountPage };

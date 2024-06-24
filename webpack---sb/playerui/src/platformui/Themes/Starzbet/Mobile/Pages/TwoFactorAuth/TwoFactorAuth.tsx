import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_2fa_fullTitle,
  platformui_starzbet_navLink_2fa,
  platformui_starzbet_navLink_security,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { LockIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/LockIcon/LockIcon";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { isReadyTwoFactorAuthSecretSelector } from "../../../../../Store/TwoFactorAuth/TwoFactorAuthSelectors";
import { TwoFactorAuthContent } from "../../../Components/TwoFactorAuth/TwoFactorAuthContent";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";
import { AccountPage } from "../../Components/AccountPage/AccountPage";

const HEADER_ROUTE_MAP: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_security,
    path: routeMap.twoFactorAuthenticationRoute,
  },
  {
    titleTKey: platformui_starzbet_navLink_2fa,
  },
];

const TwoFactorAuth = memo(() => {
  const isReady = useSelector(isReadyTwoFactorAuthSecretSelector);
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={LockIcon}
      headerColorScheme={"orange-gradient"}
      routeMap={HEADER_ROUTE_MAP}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_2fa_fullTitle)}
    >
      {isReady ? <TwoFactorAuthContent /> : <Loader />}
    </AccountPage>
  );
});
TwoFactorAuth.displayName = "TwoFactorAuth";

export { TwoFactorAuth };

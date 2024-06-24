// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_verify_verifyEmail,
  platformui_starzbet_verify_verifyEmailAndPhoneNumber,
  platformui_starzbet_verify_verifyPhoneNumber,
  platformui_starzbet_verify_your_account_now,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./NotVerified.module.css";
import { WarningIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/WarningIcon/WarningIcon";
import {
  shouldVerifyEmailSelector,
  shouldVerifyPhoneSelector,
} from "../../../../../common/Store/Player/Selectors/VerifyStrategySelectors";
import { playerNotVerifiedSelector } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { LinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { isKycRequiredDocumentsNotEmptySelector } from "../../../../Store/Kyc/Selectors/PlayerKycSelectors";
import { routeMap } from "../../../../RouteMap/RouteMap";

const getVerifyTKey = (shouldVerifyEmail: boolean, shouldVerifyPhone: boolean) => {
  if (shouldVerifyEmail && shouldVerifyPhone) {
    return platformui_starzbet_verify_verifyEmailAndPhoneNumber;
  }

  if (shouldVerifyEmail) {
    return platformui_starzbet_verify_verifyEmail;
  }

  return platformui_starzbet_verify_verifyPhoneNumber;
};

const Icon = memo(() => (
  <div className={classes.icon}>
    <WarningIcon size={"s"} />
  </div>
));
Icon.displayName = "Icon";

const VerifyButton = memo(({ closeHandler }) => {
  const [t] = useTranslation();

  const shouldVerifyEmail = useSelector(shouldVerifyEmailSelector);
  const shouldVerifyPhone = useSelector(shouldVerifyPhoneSelector);

  return (
    <LinkLocalized
      className={classes.menuElement}
      to={routeMap.myDetailsRoute}
      onClick={closeHandler}
      {...qaAttr(PlayerUIQaAttributes.SideMenu.VerifyEmailButton)}
    >
      <Icon />

      <div className={classes.name}>
        {t(getVerifyTKey(shouldVerifyEmail, shouldVerifyPhone))}
      </div>
    </LinkLocalized>
  );
});
VerifyButton.displayName = "VerifyButton";

const NotVerified = memo(({ closeHandler }) => {
  const [t] = useTranslation();

  const notVerified = useSelector(playerNotVerifiedSelector);
  const isKycRequiredDocumentsNotVoid = useSelector(isKycRequiredDocumentsNotEmptySelector);

  return notVerified || isKycRequiredDocumentsNotVoid
    ? (
      <div className={classes.notVerified}>
        {notVerified ? <VerifyButton closeHandler={closeHandler} /> : null}

        {
          isKycRequiredDocumentsNotVoid
            ? (
              <LinkLocalized
                className={clsx(classes.menuElement, notVerified && classes.locked)}
                to={routeMap.accountVVerificationRoute}
                onClick={closeHandler}
                {...qaAttr(PlayerUIQaAttributes.SideMenu.VerifyAccountButton)}
              >
                <Icon />

                <div className={classes.name}>
                  {t(platformui_starzbet_verify_your_account_now)}
                </div>
              </LinkLocalized>
            )
            : null
        }
      </div>
    )
    : null;
});
NotVerified.displayName = "NotVerified";

export { NotVerified };

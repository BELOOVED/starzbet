// @ts-nocheck
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_realityChecks_button_continue,
  platformui_starzbet_realityChecks_button_logout,
  platformui_starzbet_realityChecks_message_sessionExceeded,
  platformui_starzbet_realityChecks_message_toContinue,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useAction, useParamSelector } from "@sb/utils";
import { requestLogoutAction } from "@sb/auth";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import type { TPlatform_RealityCheckByTimeBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import classes from "./RealityCheckModal.module.css";
import { getLocalStorage } from "../../../../../common/Store/LocalStorage/localStorageKeys";
import { Ellipsis } from "../../../../../sportsbookui/Components/Ellipsis/Ellipsis";
import { WarningIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/WarningIcon/WarningIcon";
import { platformLocalStorageKeys } from "../../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { currentBagSelector, selfProtectionSelectors } from "../../../../Store/SelfProtection/Selectors/SelfProtectionSelectors";
import { useSetRealityChecksTimerAction } from "../../../../Store/SelfProtection/Hooks/UseSetRealityChecksTimerAction";
import { msToTime } from "../../../../Utils/MsToTime";

const Content = memo(() => {
  const [t] = useTranslation();

  const logout = useAction(requestLogoutAction);

  const setTimer = useSetRealityChecksTimerAction();

  const lastTime = getLocalStorage(platformLocalStorageKeys.lastRealityCheckTime);

  const [duration, setDuration] = useState(Date.now() - lastTime);

  const ModalLogOutButton = memo(() => (
    <button
      className={classes.btn}
      onClick={logout}
      {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.RealityCheckModalLogoutButton)}
    >
      <Ellipsis>
        {t(platformui_starzbet_realityChecks_button_logout)}
      </Ellipsis>
    </button>
  ));
  ModalLogOutButton.displayName = "ModalLogOutButton";

  useEffect(
    () => {
      const interval = setInterval(setDuration, 1000, (d) => d + 1000);

      return () => clearInterval(interval);
    },
    [],
  );

  const buttonClasses = clsx(classes.btn, classes.continue);

  return (
    <div className={classes.modalContainer}>
      <div className={classes.overlay} />

      <div className={classes.childrenContainer} {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.RealityCheckModal)}>
        <div className={classes.top}>
          <div
            className={classes.close}
            onClick={setTimer}
            {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.RealityCheckModalCloseButton)}
          />
        </div>

        <div className={classes.info}>
          <WarningIcon color={"warning"} size={"xxxl"} className={classes.warning} />

          <div className={classes.text} {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.RealityCheckModalMessage)}>
            {t(platformui_starzbet_realityChecks_message_sessionExceeded, { time: msToTime(duration) })}
          </div>
        </div>

        <div className={classes.bottom}>
          <div className={classes.title}>
            <Ellipsis>
              {t(platformui_starzbet_realityChecks_message_toContinue)}
            </Ellipsis>
          </div>

          <div className={classes.buttons}>
            <ModalLogOutButton />

            <button
              className={buttonClasses}
              onClick={setTimer}
              {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.RealityCheckModalContinueButton)}
            >
              <Ellipsis>
                {t(platformui_starzbet_realityChecks_button_continue)}
              </Ellipsis>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
Content.displayName = "Content";

const RealityCheckModal = memo(() => {
  const expired = useSelector(selfProtectionSelectors.realityCheckExpired);

  const bag = useParamSelector(
    currentBagSelector.type<TPlatform_RealityCheckByTimeBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.realityCheckByTimeBag],
  );

  if (!expired || !bag) {
    return null;
  }

  return (
    <Content bag={bag} />
  );
});
RealityCheckModal.displayName = "RealityCheckModal";

export { RealityCheckModal };

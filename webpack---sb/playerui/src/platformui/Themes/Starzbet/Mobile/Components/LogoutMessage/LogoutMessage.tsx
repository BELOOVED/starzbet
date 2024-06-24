// @ts-nocheck
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_logoutMessage_button_ok,
  platformui_starzbet_logoutMessage_title_youAreLoggedOutDueToSessionExpiration,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction, useOnClickOutside } from "@sb/utils";
import classes from "./LogoutMessage.module.css";
import { hideLogoutMessageAction } from "../../../../../../common/Store/Player/PlayerActions";
import { logoutMessageDisplaySelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";

const Content = memo(() => {
  const [t] = useTranslation();

  const hide = useAction(hideLogoutMessageAction);

  const [ref] = useOnClickOutside(hide);

  return (
    <div className={classes.logoutMessageWrapper}>
      <div className={classes.logoutMessage} ref={ref}>
        <button className={classes.closeButton} onClick={hide} />

        <div className={classes.message}>
          {t(platformui_starzbet_logoutMessage_title_youAreLoggedOutDueToSessionExpiration)}

          <button className={classes.okButton} onClick={hide}>
            {t(platformui_starzbet_logoutMessage_button_ok)}
          </button>
        </div>
      </div>
    </div>
  );
});
Content.displayName = "Content";

const LogoutMessage = memo(() => {
  const logoutMessage = useSelector(logoutMessageDisplaySelector);

  if (!logoutMessage) {
    return null;
  }

  return (
    <Content />
  );
});
LogoutMessage.displayName = "LogoutMessage";

export { LogoutMessage };

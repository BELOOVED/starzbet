// @ts-nocheck
import TwitterShareButton from "react-share/es/TwitterShareButton";
import FacebookShareButton from "react-share/es/FacebookShareButton";
import WhatsappShareButton from "react-share/es/WhatsappShareButton";
import copy from "copy-to-clipboard";
import { createElement, memo, useCallback, useEffect, useState } from "react";
import { sportsbookui_starzbet_betSlip_share_title } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./BetSlipShare.module.css";
import { SharedUrl } from "../../../../../../Components/SharedUrl/SharedUrl";
import { ShareIcon } from "../../Icons/ShareIcon/ShareIcon";
import { LinkIcon } from "../../Icons/LinkIcon/LinkIcon";
import { TwitterIcon } from "../../Icons/TwitterIcon/TwitterIcon";
import { FacebookIcon } from "../../Icons/FacebookIcon/FacebookIcon";
import { WatsappIcon } from "../../Icons/WatsappIcon/WatsappIcon";
import { CircleCheckIcon } from "../../Icons/CircleCheckIcon/CircleCheckIcon";

const Copy = memo(({ url, openMessage }) => {
  const clickHandler = useCallback(
    () => {
      copy(url);

      openMessage();
    },
    [url],
  );

  return (
    <div className={classes.copyItem} onClick={clickHandler} />
  );
});
Copy.displayName = "Copy";

const buttons = [
  {
    component: Copy,
    icon: LinkIcon,
  },
  {
    component: TwitterShareButton,
    icon: TwitterIcon,
  },
  {
    component: FacebookShareButton,
    icon: FacebookIcon,
  },
  {
    component: WhatsappShareButton,
    icon: WatsappIcon,
  },
];

const Item = memo(({
  component,
  icon,
  url,
  closeHandler,
  openMessage,
}) => (
  <div className={classes.item}>
    {createElement(icon, { size: "m", className: classes.icon })}

    {
      component === Copy
        ? createElement(component, { url, onClick: closeHandler, openMessage })
        : createElement(component, { url, onClick: closeHandler })
    }
  </div>
));
Item.displayName = "Item";

const Message = memo(({ closeMessage, message }) => {
  const [t] = useTranslation();

  useEffect(
    () => {
      let timeout = null;

      if (message) {
        timeout = setTimeout(closeMessage, 800);
      }

      return () => clearTimeout(timeout);
    },
    [message],
  );

  if (!message) {
    return null;
  }

  return (
    <>
      <div className={classes.messageOverlay} onClick={closeMessage} />

      <div className={classes.message} onClick={closeMessage}>
        <CircleCheckIcon className={classes.messageIcon} size={"m"} color={"validation"} />

        <div className={classes.title}>{t(sportsbookui_starzbet_betSlip_share_title)}</div>
      </div>
    </>
  );
});
Message.displayName = "Message";

const BetSlipShare = memo(() => {
  const [dropdown, setDropdown] = useState(false);
  const [message, setMessage] = useState(false);

  const openHandler = useCallback(() => setDropdown(true), []);

  const closeHandler = useCallback(() => setDropdown(false), []);

  const openMessage = useCallback(() => setMessage(true), []);

  const closeMessage = useCallback(
    () => {
      setDropdown(false);
      setMessage(false);
    },
    [],
  );

  return (
    <div className={classes.shareContainer}>
      <ShareIcon
        className={classes.shareLink}
        onClick={openHandler}
      />

      {
        dropdown && (
          <>
            <div className={classes.overlay} onClick={closeHandler} />

            <Message
              message={message}
              closeMessage={closeMessage}
            />

            <div className={classes.dropdown}>
              <SharedUrl>
                {
                  (url) => (
                    buttons.map(
                      (button, index) => (
                        <Item
                          {...button}
                          key={index}
                          url={url}
                          closeHandler={closeHandler}
                          openMessage={openMessage}
                        />
                      ),
                    ))
                }
              </SharedUrl>
            </div>
          </>
        )
      }
    </div>
  );
});
BetSlipShare.displayName = "BetSlipShare";

export { BetSlipShare };

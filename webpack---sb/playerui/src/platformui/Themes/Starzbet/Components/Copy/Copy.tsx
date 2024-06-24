import copy from "copy-to-clipboard";
import clsx from "clsx";
import { memo, type ReactNode, useCallback, useEffect, useReducer } from "react";
import { useTranslation } from "@sb/translator";
import { not, type TVoidFn, withStopPropagation } from "@sb/utils";
import { platformui_starzbet_copy_subtitle } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./Copy.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { CopyIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/CopyIcon/CopyIcon";
import { TickIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";

interface IMessageProps {
  closeMessage: TVoidFn;
  isRight?: boolean;
}

const Message = memo<IMessageProps>(({ closeMessage, isRight = false }) => {
  const [t] = useTranslation();

  const rectangleClasses = clsx(
    classes.rectangle,
    IS_MOBILE_CLIENT_SIDE && classes.rectangleMobile,
    isRight && classes.rectangleRight,
    isRight && IS_MOBILE_CLIENT_SIDE && classes.rectangleMobileRight,
  );

  useEffect(
    () => {
      const timeout = setTimeout(closeMessage, 1100);

      return () => clearTimeout(timeout);
    },
    [],
  );

  return (
    <div className={classes.messageWrapper}>
      <div className={clsx(classes.message, isRight && classes.messageRight)} onClick={closeMessage}>
        <TickIcon size={"s"} color={"validation"} className={classes.tickIcon} />

        <Ellipsis className={classes.text}>
          {t(platformui_starzbet_copy_subtitle)}
        </Ellipsis>

        <div className={rectangleClasses} />
      </div>
    </div>
  );
});
Message.displayName = "Message";

interface ICopyProps {
  text: string;
  node?: ReactNode;
  className?: string;
  isRight?: boolean;
  location?: string;
}

const Copy = memo<ICopyProps>(({
  text,
  node,
  className,
  isRight = false,
  location,
}) => {
  const [state, toggle] = useReducer(not<boolean>, false);

  const clickHandler = useCallback(
    withStopPropagation(() => {
      copy(text);
      toggle();
    }),
    [text],
  );

  return (
    <div className={clsx(classes.copy, className)} onClick={clickHandler} data-location={location}>
      {node}

      <div>
        <CopyIcon size={"s"} className={classes.copyIcon} />

        {state && <Message closeMessage={toggle} isRight={isRight} />}
      </div>
    </div>

  );
});
Copy.displayName = "Copy";

export { Copy };

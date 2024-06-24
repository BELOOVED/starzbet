import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import { type TVoidFn } from "@sb/utils";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./ThemedModalHeader.module.css";
import { CloseDefaultIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";

type TThemedModalHeaderProps = {
  closeButtonClickHandler?: TVoidFn;
  className?: string;
}

const ThemedModalHeader: FC<PropsWithChildren<TThemedModalHeaderProps>> = ({
  children,
  closeButtonClickHandler,
  className,
}) => (
  <>
    <div className={clsx(classes.header, className)}>
      <div className={classes.headerContent}>
        {children}
      </div>

      {
        closeButtonClickHandler
          ? (
            <div
              className={classes.largeHitBox}
              onClick={closeButtonClickHandler}
              {...qaAttr(PlayerUIQaAttributes.Modal.CloseButton)}
            >
              <CloseDefaultIcon
                className={classes.closeIconColor}
                width={12}
                height={12}
              />
            </div>
          )
          : null
      }
    </div>

    <div className={classes.separator} />
  </>
);
ThemedModalHeader.displayName = "ThemedModalHeader";

export { ThemedModalHeader };

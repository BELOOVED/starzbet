import clsx from "clsx";
import { type CSSProperties, type FC, type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { type TVoidFn, useEscape, voidFn } from "@sb/utils";
import classes from "./BaseModalComponent.module.css";
import { useLockBodyScroll } from "../../Hooks/UseLockBodyScroll";
import { isMobileSelector } from "../../Store/DeviceInfo/DeviceInfoSelectors";
import { Portal } from "../Portal/Portal";
import { ThemeContainer } from "../ThemeContainer/ThemeContainer";

type TBaseModalComponentProps = PropsWithChildren & {
  onCancel?: TVoidFn;
  overlayBackground?: CSSProperties["background"];
  blur?: boolean;
  disableLockBodyScroll?: boolean;
  withoutVariables?: boolean;
  withMobileOnCancel?: boolean;
};

const defaultOverlayBackground = "rgb(0 0 0 / .5)";
const BaseModalComponent: FC<TBaseModalComponentProps> = ({
  children,
  onCancel = voidFn,
  overlayBackground = defaultOverlayBackground,
  blur = false,
  disableLockBodyScroll = false,
  withoutVariables,
  withMobileOnCancel = false,
}) => {
  useLockBodyScroll(disableLockBodyScroll);
  useEscape(onCancel);

  const overlayStyle = { background: overlayBackground };
  const isMobile = useSelector(isMobileSelector);

  return (
    <Portal>
      <ThemeContainer className={classes.fullScreenContainer} withoutVariables={withoutVariables}>
        <div
          className={clsx(classes.overlay, blur && classes.blur)}
          style={overlayStyle}
          onClick={isMobile && !withMobileOnCancel ? voidFn : onCancel}
        />

        {children}
      </ThemeContainer>
    </Portal>
  );
};
BaseModalComponent.displayName = "BaseModalComponent";

export { BaseModalComponent };
export type { TBaseModalComponentProps };

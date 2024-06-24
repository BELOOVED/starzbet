import clsx from "clsx";
import { type FC, type ReactNode } from "react";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./ThemedModal.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { BaseModalComponent, type TBaseModalComponentProps } from "../../../../../common/Components/BaseModalComponent/BaseModalComponent";

type TThemedModalProps = {
  headerContent?: ReactNode;
  className?: string;
} & Omit<TBaseModalComponentProps, "overlayBackground">

const ThemedModal: FC<TThemedModalProps> = ({
  children,
  onCancel,
  className,
  disableLockBodyScroll,
}) => (
  <BaseModalComponent
    onCancel={onCancel}
    overlayBackground={"#090A0CCC"}
    blur
    disableLockBodyScroll={disableLockBodyScroll}
  >
    <div
      className={clsx(classes.container, className, IS_MOBILE_CLIENT_SIDE && classes.mobile)}
      {...qaAttr(PlayerUIQaAttributes.Modal.Container)}
    >
      {children}
    </div>
  </BaseModalComponent>
);
ThemedModal.displayName = "ThemedModal";

export { ThemedModal };

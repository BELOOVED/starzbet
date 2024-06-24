import { type CSSProperties, memo } from "react";
/* eslint-disable no-restricted-imports */
import {
  type ITeamIconProps as IBaseTeamItemProps,
  type IVirtualTeamIconProps as IBaseVirtualTeamIconProps,
  type TCdnIconSize,
  TeamIcon as BaseTeamIcon,
  VirtualTeamIcon as BaseVirtualTeamIcon,
} from "@sb/icons/cdn";
import { type TComponent } from "@sb/utils";
import fallbackIcon from "./FallbackIcon.svg";

interface IFallbackIconProps {
  size?: TCdnIconSize;
  className?: string;
}

const FallBackIcon = memo<IFallbackIconProps>(({ size, className }) => {
  const style = {
    width: size,
    height: size,
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain" as CSSProperties["objectFit"],
  };

  return (
    <img
      src={fallbackIcon}
      alt={""}
      style={style}
      className={className}
      draggable={false}
    />
  );
});
FallBackIcon.displayName = "FallBackIcon";

const createIcon = <P extends (IBaseTeamItemProps | IBaseVirtualTeamIconProps)>(TeamIconComponent: TComponent<P>) =>
  memo((props: Omit<P, "children">) => (
    <TeamIconComponent {...props as P}>
      {() => <FallBackIcon size={props.size} className={props.className} />}
    </TeamIconComponent>
  ));

const TeamIcon = createIcon(BaseTeamIcon);
const VirtualTeamIcon = createIcon(BaseVirtualTeamIcon);

export { TeamIcon, VirtualTeamIcon };

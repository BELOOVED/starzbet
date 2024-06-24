import { type FC } from "react";
import { BaseCdnIcon, getCdnIconName, type ICdnIconWithFallbackProps, type TCdnIconSize } from "../BaseCdnIcon/BaseCdnIcon";

const getFilePath = (teamId: string, size: number) =>
  `/virtual-team-webp/${getCdnIconName(`${teamId}_${size}x${size}`)}.webp?cache-workaround=1`;

interface IVirtualTeamIconProps extends Omit<ICdnIconWithFallbackProps, "path" | "size" | "alt"> {
  teamId: string;
  size?: TCdnIconSize;
  alt?: string;
  withoutLazy?: boolean;
}

const VirtualTeamIcon: FC<IVirtualTeamIconProps> = ({
  teamId,
  size = 32,
  children,
  withoutLazy,
  ...props
}) => (
  <BaseCdnIcon
    {...props}
    path={getFilePath(teamId, size)}
    size={size}
    alt={props.alt ?? "VirtualTeamIcon"}
    withoutLazy={withoutLazy}
  >
    {children}
  </BaseCdnIcon>
);
VirtualTeamIcon.displayName = "VirtualTeamIcon";

export type { IVirtualTeamIconProps };
export { VirtualTeamIcon };

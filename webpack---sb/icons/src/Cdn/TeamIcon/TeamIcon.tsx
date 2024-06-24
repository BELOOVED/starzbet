import { type FC } from "react";
import { BaseCdnIcon, getCdnIconName, type ICdnIconWithFallbackProps, type TCdnIconSize } from "../BaseCdnIcon/BaseCdnIcon";

const getFilePath = (teamId: string, size: number) =>
  `/team-webp/${getCdnIconName(`${teamId}_${size}x${size}`)}.webp?cache-workaround=1`;

interface ITeamIconProps extends Omit<ICdnIconWithFallbackProps, "path" | "size" | "alt"> {
  teamId: string;
  size?: TCdnIconSize;
  alt?: string;
  withoutLazy?: boolean;
}

const TeamIcon: FC<ITeamIconProps> = ({
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
    alt={props.alt ?? "TeamIcon"}
    withoutLazy={withoutLazy}
  >
    {children}
  </BaseCdnIcon>
);
TeamIcon.displayName = "TeamIcon";

export type { ITeamIconProps };
export { TeamIcon };

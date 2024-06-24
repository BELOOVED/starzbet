// @ts-nocheck
import { type FC, type PropsWithChildren } from "react";
import { useParamSelector } from "@sb/utils";
import { pathByTreeSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { ResetedLink, type TResetedLinkProps } from "../ResetedLink/ResetedLink";

interface ITournamentLinkProps extends Omit<TResetedLinkProps, "to"> {
  tournamentId: string;
  isOutright?: boolean;
}

const TournamentLink: FC<PropsWithChildren<ITournamentLinkProps>> = ({
  tournamentId,
  isOutright,
  children,
  ...rest
}) => {
  const path = useParamSelector(pathByTreeSelector, [tournamentId, isOutright]);

  return (
    <ResetedLink {...path} {...rest}>
      {children}
    </ResetedLink>
  );
};
TournamentLink.displayName = "TournamentLink";

export { TournamentLink };

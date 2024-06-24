import clsx from "clsx";
import { memo } from "react";
import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { withProps } from "@sb/utils";
import { BaseTeamName } from "@sb/entity-translates";
import { type TParticipants } from "@sb/betting-core/Feed/Types";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./BetTeams.module.css";
import { ResetedNavLink } from "../../../../../../Components/ResetedLink/ResetedLink";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { isEsport } from "../../../../../../Store/Feed/Model/Sport";
import { scrollToTop } from "../../../../../../Utils/ScrollToTop";
import { EventContainer } from "../../../../../../Containers/EventContainer/EventContainer";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

const selectESportPath = (live) => live
  ? routeMap.esport.live.event
  : routeMap.esport.preLive.event;

const selectCommonPath = (live) => live
  ? routeMap.live.event
  : routeMap.preLive.event;

interface ITeamNamesProps extends IWithClassName {
  participants: TParticipants;
}

const TeamNames = memo<ITeamNamesProps>(({ participants, className }) => (
  <div className={clsx(classes.teamNames, className)}>
    <Ellipsis>
      <BaseTeamName team={participants[EParticipantType.team1]} />

      {" - "}

      <BaseTeamName team={participants[EParticipantType.team2]} />
    </Ellipsis>
  </div>
));
TeamNames.displayName = "TeamNames";

interface ITeamsByFeedProps extends IWithClassName {
  event: {
    id: string;
    participants: TParticipants;
    sportId: string;
    status: EEventStatus;
  };
}

const TeamsByFeed = memo<ITeamsByFeedProps>(({
  event: {
    id,
    participants,
    sportId,
    status,
  },
  className,
}) => {
  const esport = isEsport(sportId);
  const live = isLive(status);

  const path = esport
    ? selectESportPath(live)
    : selectCommonPath(live);

  const params = { eventId: id };

  return (
    <ResetedNavLink
      activeClassName={classes.active}
      className={classes.link}
      to={path}
      params={params}
      onClick={scrollToTop}
    >
      <TeamNames participants={participants} className={className} />
    </ResetedNavLink>
  );
});
TeamsByFeed.displayName = "TeamsByFeed";

interface IBetTeamsProps {
  eventId: string;
  participants: TParticipants;
}

const BetTeams = memo<IBetTeamsProps>(({ eventId, participants }) => (
  <EventContainer
    eventId={eventId}
    contentView={TeamsByFeed}
    emptyView={withProps(TeamNames)({ participants })}
  />
));
BetTeams.displayName = "BetTeams";

export { BetTeams, TeamsByFeed };

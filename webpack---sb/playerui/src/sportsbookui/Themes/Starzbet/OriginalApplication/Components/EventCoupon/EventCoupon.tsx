import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { BaseTeamName } from "@sb/entity-translates";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_event_goToEvent } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./EventCoupon.module.css";
import { LinkToTop } from "../../../../../../common/Components/LinkToTop/LinkToTop";
import { type IWithEventId } from "../../../../../../common/IWith";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { eventByIdSelector } from "../../../../../Store/Feed/Selectors/FeedSelectors";
import { type IWithEvent } from "../../../../../Model/Bet";
import { getMarketTypeListBySportId } from "../../../../../Store/Feed/Model/Market/Market";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { type IParticipant } from "../../../../../Model/Event";
import { TournamentName } from "../../../../../Components/TournamentName/TournamentName";
import { useMarketIdByTypeSelector } from "../../../../../Store/Feed/Hooks/UseMarketIdByTypeSelector";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { TeamIcon } from "../../../../../Components/TeamIcon/TeamIcon";
import { BaseOutcomeContainer } from "../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { EmptyOutcome, Market } from "../Market/Market";

interface ITimeProps {
  startTime: number;
}

const Time = memo<ITimeProps>(({ startTime }) => (
  <div className={classes.time}>
    <Ellipsis>
      <DateFormat date={startTime} format={"dd MMM, HH:mm"} />
    </Ellipsis>
  </div>
));
Time.displayName = "Time";

const CouponHead = memo<IWithEvent>(({ event }) => (
  <div className={classes.header}>
    <div className={classes.tournament}>
      <TournamentName id={event.tournamentId} />
    </div>

    <Time startTime={event.startTime} />
  </div>
));
CouponHead.displayName = "CouponHead";

interface ITeamProps {
  team: IParticipant;
  withoutLazy: boolean;
}

const Team = memo<ITeamProps>(({ team, withoutLazy }) => (
  <div className={classes.team}>
    <div className={classes.iconWrapper}>
      <TeamIcon teamId={team.teamId} withoutLazy={withoutLazy} />
    </div>

    <Ellipsis className={classes.couponTeam}>
      <BaseTeamName team={team} />
    </Ellipsis>
  </div>
));
Team.displayName = "Team";

interface IMarketProps extends IWithEventId {
  sportId: string;
}

const Markets = memo<IMarketProps>(({ eventId, sportId }) => {
  const [marketType] = getMarketTypeListBySportId(sportId);
  const marketId = useMarketIdByTypeSelector(marketType, eventId);

  return (
    <div className={classes.markets}>
      {
        marketId
          ? (
            <BaseOutcomeContainer
              contentView={Market}
              marketId={marketId}
              marketType={marketType}
            />
          )
          : (
            <>
              <EmptyOutcome />

              <EmptyOutcome />

              <EmptyOutcome />
            </>
          )
      }
    </div>
  );
});
Markets.displayName = "Markets";

const Button = memo(() => {
  const [t] = useTranslation();

  return (
    <button className={classes.button}>
      <Ellipsis>
        {t(sportsbookui_starzbet_event_goToEvent)}
      </Ellipsis>
    </button>
  );
});
Button.displayName = "Button";

interface IEventCouponProps extends IWithEventId {
  withoutLazy?: boolean;
}

const EventCoupon = memo<IEventCouponProps>(({ eventId, withoutLazy = false }) => {
  const event = useParamSelector(eventByIdSelector, [eventId]);
  if (!event) {
    return null;
  }

  const route = routeMap.preLive.event;

  const params = { eventId };

  return (
    <LinkToTop to={route} params={params} className={classes.coupon}>
      <CouponHead event={event} />

      <div className={classes.teams}>
        <Team team={event.participants.team1} withoutLazy={withoutLazy} />

        <Team team={event.participants.team2} withoutLazy={withoutLazy} />
      </div>

      <Markets sportId={event.sportId} eventId={eventId} />

      <Button />
    </LinkToTop>
  );
});
EventCoupon.displayName = "EventCoupon";

export { EventCoupon };

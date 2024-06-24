import { memo } from "react";
import { isNil, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_live } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./EventStatus.module.css";
import { DateFormat } from "../../../../../../../../../common/Components/Date/DateFormat";
import { eventByIdSelector } from "../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { useMainScoreValueByEventIdSelector } from "../../../../../../../../Store/Feed/Hooks/UseMainScoreValueByEventIdSelector";
import { normalizeScore } from "../../../../../../../../Store/Feed/Model/Score";
import { FullEventStatus } from "../../../../../../../../Components/EventStatus/EventStatus";
import { WhenLiveVideo } from "../../../../../../../../Components/WhenLiveVideo/WhenLiveVideo";
import { ResetedLink } from "../../../../../../../../Components/ResetedLink/ResetedLink";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { isEsport } from "../../../../../../../../Store/Feed/Model/Sport";
import { PlayLinkIcon } from "../../../../Icons/PlayLinkIcon/PlayLinkIcon";
import { TimeIcon } from "../../../../Icons/TimeIcon/TimeIcon";
import { selectCommonPath, selectESportPath } from "../BetConstructorContentSelectors";
import { type TWithEventId, type TWithLive, type TWithSportId } from "../TBetConstructorContent";

const Score = memo<TWithEventId>(
  ({ eventId }) => {
    const score1 = useMainScoreValueByEventIdSelector(eventId, EParticipantType.team1);
    const score2 = useMainScoreValueByEventIdSelector(eventId, EParticipantType.team2);

    if (!score1 || !score2) {
      return null;
    }

    return (
      <div className={classes.score}>{`${normalizeScore(score1)} - ${normalizeScore(score2)}`}</div>
    );
  },
);
Score.displayName = "Score";

const LiveStatus = memo<TWithEventId & TWithLive & TWithSportId>(
  ({ eventId, live, sportId }) => {
    const [t] = useTranslation();

    const path = isEsport(sportId)
      ? selectESportPath(live)
      : selectCommonPath(live);

    const params = { eventId };

    return (
      <>
        <div className={classes.scope}>
          <div className={classes.circle} />

          <Ellipsis>
            <FullEventStatus eventId={eventId} noop={<p>{t(sportsbookui_starzbet_title_live)}</p>} />
          </Ellipsis>
        </div>

        <Score eventId={eventId} />

        <WhenLiveVideo eventId={eventId}>
          <ResetedLink className={classes.watchLink} to={path} params={params}>
            <PlayLinkIcon className={classes.playLinkIcon} />
          </ResetedLink>
        </WhenLiveVideo>
      </>
    );
  },
);
LiveStatus.displayName = "LiveStatus";

const EventStatus = memo<TWithEventId & TWithLive>(
  ({ eventId, live }) => {
    const event = useParamSelector(eventByIdSelector, [eventId]);

    if (isNil(event)) {
      return null;
    }

    return (

      <div className={classes.eventStatus}>
        {
          live
            ? <LiveStatus eventId={eventId} sportId={event.sportId} live={live} />
            : (
              <>
                <TimeIcon className={classes.timeIcon} />

                <Ellipsis>
                  <DateFormat date={event.startTime} format={"HH:mm • E, do MMM"} />
                </Ellipsis>
              </>
            )
        }
      </div>
    );
  },
);
EventStatus.displayName = "EventStatus";

export { EventStatus };

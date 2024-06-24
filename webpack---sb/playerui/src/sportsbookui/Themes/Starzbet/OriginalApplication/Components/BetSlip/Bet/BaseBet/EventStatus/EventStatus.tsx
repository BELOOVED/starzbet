// @ts-nocheck
import { memo } from "react";
import { type TParticipants } from "@sb/betting-core/Feed/Types";
import { isFinished, isPreLive } from "@sb/betting-core/EEventStatusUtils";
import { useTranslation } from "@sb/translator";
import type { TSportsbook_EventInfo_Fragment } from "@sb/graphql-client/PlayerUI";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportsbookui_betSlip_title_result } from "@sb/translates/sportsbookui/CommonTKeys";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./EventStatus.module.css";
import { DateFormat } from "../../../../../../../../../common/Components/Date/DateFormat";
import { BetFullEventStatus } from "../../../../../../../../Components/EventStatus/EventStatus";
import { isEsport, isVirtual, isVirtualGame } from "../../../../../../../../Store/Feed/Model/Sport";
import { routeMap } from "../../../../../../../../RouteMap/RouteMap";
import { ResetedLink } from "../../../../../../../../Components/ResetedLink/ResetedLink";
import { normalizeScore } from "../../../../../../../../Store/Feed/Model/Score";
import { type IDeprecatedEventInfoFromFS, type TDeprecatedScoreFromFS } from "../../../../../../../../Model/Bet";
import { virtualRacingSport } from "../../../../../../../../Store/Virtual/Common/Model/VirtualRacingSport";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { TimeIcon } from "../../../../Icons/TimeIcon/TimeIcon";
import { PlayLinkIcon } from "../../../../Icons/PlayLinkIcon/PlayLinkIcon";
import { ScoreRacingSport } from "./ScoreRacingSport";
import { ScoreRacingRoulette } from "./ScoreRacingRoulette";

interface IWatchMatchProps {
  eventId: string;
  sportId: string;
  live: boolean;
}

const WatchMatch = memo<IWatchMatchProps>(({ eventId, sportId, live }) => {
  if (!live) {
    return null;
  }

  const path = isEsport(sportId) ? routeMap.esport.live.event : routeMap.live.event;
  const params = { eventId };

  return (
    <ResetedLink to={path} params={params} className={classes.liveIcon}>
      <PlayLinkIcon className={classes.playLinkIcon} />
    </ResetedLink>
  );
});
WatchMatch.displayName = "WatchMatch";

interface IScoreProps {
  score: TDeprecatedScoreFromFS | null;
  participants: TParticipants;
}

const Score = memo<IScoreProps>(({ score, participants, sportId }) => {
  const [t] = useTranslation();

  if (!score) {
    return null;
  }

  if (isVirtualGame(sportId)) {
    return (
      <div className={classes.scoreWithOutcome}>
        <div className={classes.scoreWithOutcomeTitle}>
          {t(sportsbookui_betSlip_title_result)}

          {": "}
        </div>

        <div className={classes.scoreOutcome}>
          {Object.values(score).map(normalizeScore).join(", ")}
        </div>
      </div>
    );
  }

  const score1 = score[participants[EParticipantType.team1].shortId];
  const score2 = score[participants[EParticipantType.team2].shortId];

  if (score1 == null || score2 == null) {
    return null;
  }

  return (
    <div className={classes.score}>{`${normalizeScore(score1)} - ${normalizeScore(score2)}`}</div>
  );
});
Score.displayName = "Score";

interface IEventStatusProps {
  eventInfo: TSportsbook_EventInfo_Fragment | IDeprecatedEventInfoFromFS;
  score?: TDeprecatedScoreFromFS;
  startTime: number;
  participants: TParticipants;
  sportId: string;
  eventId: string;
  live: boolean;
}

const EventStatus = memo<IEventStatusProps>(({
  eventInfo,
  score,
  startTime,
  participants,
  sportId,
  eventId,
  live,
}) => {
  if (isVirtual(sportId)) {
    if (!isFinished(eventInfo.eventStatus)) {
      return (
        <div className={classes.preLiveWrapper}>
          <div className={classes.timeWrapper}>
            <TimeIcon className={classes.timeIcon} />

            <Ellipsis>
              <DateFormat date={startTime} format={"HH:mm • E, do MMM"} />
            </Ellipsis>
          </div>
        </div>
      );
    }

    if (virtualRacingSport.includes(sportId)) {
      return (
        <ScoreRacingSport
          score={score}
          participants={participants}
        />
      );
    }

    if (sportId === sportCodeToIdMap[ESportCode.kiron_racing_roulette]) {
      return (
        <ScoreRacingRoulette
          score={score}
          participants={participants}
        />
      );
    }
  }

  if (isPreLive(eventInfo.eventStatus)) {
    return (
      <div className={classes.preLiveWrapper}>
        <div className={classes.timeWrapper}>
          <TimeIcon className={classes.timeIcon} />

          <Ellipsis className={classes.date}>
            <DateFormat date={startTime} format={"HH:mm • E, do MMM"} />
          </Ellipsis>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.liveWrapper}>
      <div className={classes.subLiveWrapper}>
        <Ellipsis className={classes.period}>
          <BetFullEventStatus
            eventInfo={eventInfo}
            sportId={sportId}
          />
        </Ellipsis>

        <Score participants={participants} score={score} sportId={sportId} />
      </div>

      <WatchMatch eventId={eventId} sportId={sportId} live={live} />
    </div>
  );
});
EventStatus.displayName = "EventStatus";

export { EventStatus };

// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./ScoreWidget.module.css";
import { type IWithEventId } from "../../../../../../../common/IWith";
import { eventByIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { participantTypesDoubleTuple } from "../../../../../../Store/Feed/Model/Event";
import { DashScoreValueByScope } from "../../../../../../Components/ScoreValue/ScoreValue";
import {
  useStatsWidgetScopesByEventIdSelector,
} from "../../../../../../Store/Feed/Hooks/UseStatsWidgetScopesByEventIdSelector";
import { CurrentGameScore } from "../../../../../../Components/CurrentGameScore/CurrentGameScore";
import { TeamIcon } from "../../../../../../Components/TeamIcon/TeamIcon";
import { CurrentScore } from "../StatsWidget/CurrentScore/CurrentScore";

const Teams = memo(({ eventId }) => {
  const { participants } = useParamSelector(eventByIdSelector, [eventId]);

  return (
    <div className={classes.column}>
      <div className={classes.teamTitle}>{"T"}</div>

      {
        participantTypesDoubleTuple.map((type) => {
          const teamId = participants[type].teamId;

          return (
            <div className={classes.partisipantImage} key={type}>
              <TeamIcon teamId={teamId} />
            </div>
          );
        })
      }
    </div>
  );
});
Teams.displayName = "Teams";

interface IWithScopeType extends IWithEventId {
  scopeType?: EScopeType;
}

const Scopes = memo<IWithScopeType>(({ eventId }) => {
  const scopes = useStatsWidgetScopesByEventIdSelector(eventId);

  return (
    <div className={classes.columnWrapper}>
      {

        scopes.map(({ number, locked, id }, index) => (
          <div className={classes.columnScore} key={id}>
            <div className={classes.col}>{number}</div>

            <div className={clsx(classes.col, !locked && classes.locked)}>
              {
                index === scopes.length - 1
                  ? (
                    <CurrentScore
                      scopeId={id}
                      type={EParticipantType.team1}
                    />
                  )
                  : (
                    <DashScoreValueByScope
                      scopeId={id}
                      type={EParticipantType.team1}
                    />
                  )
              }
            </div>

            <div className={clsx(classes.col, !locked && classes.locked)} key={id}>
              {
                index === scopes.length - 1
                  ? (
                    <CurrentScore
                      scopeId={id}
                      type={EParticipantType.team2}
                    />
                  )
                  : (
                    <DashScoreValueByScope
                      scopeId={id}
                      type={EParticipantType.team2}
                    />
                  )
              }
            </div>
          </div>
        ))
      }
    </div>
  );
});
Scopes.displayName = "Scopes";

const ScoreWidget = memo<IWithScopeType>(({ eventId }) => (
  <div className={classes.widgetWrapper}>
    <Teams eventId={eventId} />

    <Scopes eventId={eventId} />
  </div>
));
ScoreWidget.displayName = "ScoreWidget";

const TennisScoreWidget = memo(({ eventId }) => (
  <div className={classes.widgetWrapper}>
    <Teams eventId={eventId} />

    <div className={classes.column}>
      <div className={classes.teamTitle}>{"P"}</div>

      {
        participantTypesDoubleTuple.map((type) => (
          <div className={classes.col} key={type}>
            <CurrentGameScore
              eventId={eventId}
              participantType={type}
            />
          </div>
        ))
      }
    </div>

    <Scopes eventId={eventId} />
  </div>
));
TennisScoreWidget.displayName = "TennisScoreWidget";

export { ScoreWidget, TennisScoreWidget };

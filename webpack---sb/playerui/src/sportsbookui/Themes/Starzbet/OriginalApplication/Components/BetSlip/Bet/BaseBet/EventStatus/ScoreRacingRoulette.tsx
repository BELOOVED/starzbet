// @ts-nocheck
import { Fragment, memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_betSlip_title_result } from "@sb/translates/sportsbookui/CommonTKeys";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./EventStatus.module.css";
import { racingSportPlacesByScore } from "../../../../../../../../Store/Virtual/ScoreRacingSport/Model/RacingSportPlacesByScore";
import { findTeamByShortId } from "../../../../../../../../Store/Feed/Model/Event";

const ScoreRacingRoulette = memo(({ score, participants }) => {
  const [t] = useTranslation();

  if (!score) {
    return null;
  }

  return (
    <div className={classes.scoreWithOutcome}>
      <div>
        {t(sportsbookui_betSlip_title_result)}

        {": "}
      </div>

      <div className={classes.scoreOutcome}>
        {
          racingSportPlacesByScore(score).map(([shortId], index, arr) => (
            <Fragment key={shortId}>
              <BaseTeamName team={findTeamByShortId(participants, shortId)} />

              {index < arr.length - 1 && ", "}
            </Fragment>
          ))
        }
      </div>
    </div>
  );
});
ScoreRacingRoulette.displayName = "ScoreRacingRoulette";

export { ScoreRacingRoulette };

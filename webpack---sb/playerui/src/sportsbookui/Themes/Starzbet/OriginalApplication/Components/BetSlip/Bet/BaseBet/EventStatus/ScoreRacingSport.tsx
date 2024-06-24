// @ts-nocheck
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_betSlip_title_result } from "@sb/translates/sportsbookui/CommonTKeys";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./EventStatus.module.css";
import { findTeamByShortId } from "../../../../../../../../Store/Feed/Model/Event";
import { racingSportPlacesByScore } from "../../../../../../../../Store/Virtual/ScoreRacingSport/Model/RacingSportPlacesByScore";
import { placesTKeys } from "../../../../../../../../Store/Virtual/ScoreRacingSport/Model/PlacesTKeys";
import { getTeamNumber } from "../../../../../../../../Store/Virtual/ScoreRacingSport/Model/GetTeamNumber";
const ScoreRacingSport = memo(({ score, participants }) => {
  const [t] = useTranslation();

  if (!score) {
    return null;
  }

  return (
    <div className={classes.scoreRacing}>
      <div>
        {t(sportsbookui_betSlip_title_result)}

        {": "}
      </div>

      <div className={classes.scoreOutcome}>
        {
          racingSportPlacesByScore(score).map(([shortId], index) => (
            <div key={shortId} className={classes.scoreRacingResult}>
              <div className={classes.scoreRacingTitle}>
                {t(placesTKeys[index])}
              </div>

              <div className={classes.scoreRacingNumber}>
                {"#"}

                {getTeamNumber(shortId)}
              </div>

              <div className={classes.scoreRacingTeamName}>
                <BaseTeamName team={findTeamByShortId(participants, shortId)} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
});
ScoreRacingSport.displayName = "ScoreRacingSport";

export { ScoreRacingSport };

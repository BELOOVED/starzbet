import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportsbookui_betSlip_title_draw } from "@sb/translates/sportsbookui/CommonTKeys";
import { BaseTeamName } from "@sb/entity-translates";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./EventNameWithNumber.module.css";
import {
  getEventNameFromFullName,
  getEventNumberFromFullName,
} from "../../../../../../../../Store/Virtual/Common/Hooks/UseVirtualGameEventNameSelector";
import { virtualRacingSport } from "../../../../../../../../Store/Virtual/Common/Model/VirtualRacingSport";
import { isVirtualGame } from "../../../../../../../../Store/Feed/Model/Sport";

// @ts-ignore
const EventNameWithNumber = memo(({ eventFullName, sportId, participants }) => {
  const [t] = useTranslation();

  const eventNumber = getEventNumberFromFullName(eventFullName);
  const eventName = getEventNameFromFullName(eventFullName);

  if ([...virtualRacingSport, sportCodeToIdMap[ESportCode.kiron_racing_roulette]].includes(sportId)) {
    return (
      <div className={classes.virtualEventInfo}>
        <div className={classes.virtualEventName}>
          {eventName}
        </div>

        <div className={classes.eventNumber}>
          {"(ID "}

          {eventNumber}

          {")"}
        </div>
      </div>
    );
  }

  if (isVirtualGame(sportId)) {
    return (
      <div className={classes.virtualEventInfo}>
        <div className={classes.virtualEventName}>
          {eventName}
        </div>

        <div className={classes.eventNumber}>
          {"("}

          {t(sportsbookui_betSlip_title_draw)}

          {" "}

          {eventNumber}

          {")"}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.virtualEventInfo}>
      <div className={classes.virtualEventName}>
        <BaseTeamName team={participants[EParticipantType.team1]} />

        {" - "}

        <BaseTeamName team={participants[EParticipantType.team2]} />
      </div>

      <div className={classes.eventNumber}>
        {" (ID "}

        {eventNumber}

        {")"}
      </div>
    </div>
  );
});
EventNameWithNumber.displayName = "EventNameWithNumber";

export { EventNameWithNumber };

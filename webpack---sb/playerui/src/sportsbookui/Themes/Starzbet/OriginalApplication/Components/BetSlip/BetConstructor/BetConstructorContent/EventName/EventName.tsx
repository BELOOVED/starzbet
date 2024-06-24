import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportsbookui_betSlip_title_draw } from "@sb/translates/sportsbookui/CommonTKeys";
import { BaseTeamName } from "@sb/entity-translates";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./EventName.module.css";
import {
  NavLinkLocalized,
} from "../../../../../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { participantsByEventIdSelector, sportIdByEventIdSelector } from "../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import {
  useVirtualGameEventNameSelector,
  useVirtualGameEventNumberIdSelector,
} from "../../../../../../../../Store/Virtual/Common/Hooks/UseVirtualGameEventNameSelector";
import { virtualRacingSport } from "../../../../../../../../Store/Virtual/Common/Model/VirtualRacingSport";
import { isEsport, isVirtual, isVirtualGame } from "../../../../../../../../Store/Feed/Model/Sport";
import { scrollToTop } from "../../../../../../../../Utils/ScrollToTop";
import { SportIcon } from "../../../../SportIcon/SportIcon";
import { selectCommonPath, selectESportPath } from "../BetConstructorContentSelectors";
import { type TWithEventId, type TWithLive, type TWithSportId } from "../TBetConstructorContent";

const RegularEventName = memo<TWithEventId & TWithSportId & TWithLive>(
  ({ eventId, live, sportId }) => {
    const participants = useParamSelector(participantsByEventIdSelector, [eventId]);

    const path = isEsport(sportId)
      ? selectESportPath(live)
      : selectCommonPath(live);

    const params = { eventId };

    return (

      <NavLinkLocalized
        className={classes.eventLink}
        to={path}
        params={params}
        onClick={scrollToTop}
      >
        <BaseTeamName team={participants[EParticipantType.team1]} />

        {" - "}

        <BaseTeamName team={participants[EParticipantType.team2]} />
      </NavLinkLocalized>

    );
  },
);
RegularEventName.displayName = "RegularEventName";

const EventNameWithNumber = memo<TWithEventId & TWithSportId>((
  { eventId, sportId },
) => {
  const [t] = useTranslation();
  const eventName = useVirtualGameEventNameSelector(eventId);
  const eventNumber = useVirtualGameEventNumberIdSelector(eventId);
  const participants = useParamSelector(participantsByEventIdSelector, [eventId]);

  if ([...virtualRacingSport, sportCodeToIdMap[ESportCode.kiron_racing_roulette]].includes(sportId)) {
    return (
      <div className={classes.virtualEventInfo}>
        <div>
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
        <div>
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
      <div>
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

const EventName = memo<TWithEventId & TWithLive>(
  ({ eventId, live = false }) => {
    const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);

    return (
      <div className={classes.eventName}>
        <SportIcon id={sportId} color={"darkText"} className={classes.sportIcon} />

        {
          isVirtual(sportId)
            ? <EventNameWithNumber eventId={eventId} sportId={sportId} />
            : <RegularEventName eventId={eventId} live={live} sportId={sportId} />
        }
      </div>
    );
  },
);
EventName.displayName = "EventName";

export { EventName };

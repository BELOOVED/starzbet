import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_outrights } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./EventHeader.module.css";
import { ClassicArrowIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ClassicArrowIcon";
import { useGoBack } from "../../../../../../../common/Hooks/UseGoBack";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { TournamentName } from "../../../../../../Components/TournamentName/TournamentName";
import { unfakeOutrightTournamentId } from "../../../../../../Store/SportMenu/Model/SportMenu";
import { outrightByIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { EventFavIcon } from "../EventFavouriteButton/EventFavouriteButton";

interface IEventHeader {
  tournamentId: string;
  eventId: string;
}

const EventHeader = memo<IEventHeader>(({ tournamentId, eventId }) => {
  const [t] = useTranslation();

  const outright = useParamSelector(outrightByIdSelector, [eventId]);

  const goBack = useGoBack();

  return (
    <div className={classes.eventHeader}>
      <div onClick={goBack}>
        <ClassicArrowIcon />
      </div>

      <div className={classes.info}>
        <div className={classes.tournament}>
          <Ellipsis>
            <TournamentName
              id={unfakeOutrightTournamentId(tournamentId)}
            />

            {
              outright && (
                <>
                  {", "}

                  {t(sportsbookui_starzbet_title_outrights)}
                </>
              )
            }
          </Ellipsis>
        </div>
      </div>

      <div className={classes.buttons}>
        <EventFavIcon eventId={eventId} />
      </div>
    </div>
  );
});
EventHeader.displayName = "EventHeader";

export { EventHeader };

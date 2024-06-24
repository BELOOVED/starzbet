// @ts-nocheck
import { memo } from "react";
import { keyToComponent, useParamSelector } from "@sb/utils";
import classes from "./PreLiveOutrights.module.css";
import { outcomeIdsByOutrightIdAndTypeSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { fakeOutrightTournamentId } from "../../../../../../Store/SportMenu/Model/SportMenu";
import { fromRenderProps } from "../../../../../../Utils/FromRenderProps";
import { OutrightContainer } from "../../../../../../Components/OutrightContainer/OutrightContainer";
import { OutrightName } from "../../../../../../Components/OutrightName/OutrightName";
import { OutrightOutcome } from "../../../Components/OutcomeList/OutcomeList";
import { EventHeader } from "../../Components/EventHeader/EventHeader";
import { EventSuspended } from "../../Components/EventSuspended/EventSuspended";
import { OutrightOverall } from "../../Components/EventOverall/EventOverall";

const Content = memo(({
  id,
  type,
  tournamentId,
  startTime,
  sportId,
}) => {
  const outcomeIds = useParamSelector(outcomeIdsByOutrightIdAndTypeSelector(type), [id]);

  return (
    <div>
      <EventHeader
        tournamentId={fakeOutrightTournamentId(tournamentId)}
        eventId={id}
      />

      <OutrightOverall
        id={id}
        sportId={sportId}
        startTime={startTime}
      />

      <div className={classes.outcomes}>
        <div className={classes.name}>
          <OutrightName id={id} />
        </div>

        <div className={classes.container}>
          <div className={classes.box}>
            {outcomeIds.map(keyToComponent("id")(OutrightOutcome))}
          </div>
        </div>
      </div>
    </div>
  );
});
Content.displayName = "Content";

const PreLiveOutrights = memo(({ match: { params: { id } } }) => (
  <OutrightContainer id={id} empty={EventSuspended}>
    {fromRenderProps(Content)}
  </OutrightContainer>
));
PreLiveOutrights.displayName = "PreLiveOutrights";

export { PreLiveOutrights };

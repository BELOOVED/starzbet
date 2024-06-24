// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { keyToComponent, withProps } from "@sb/utils";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { sportsbookui_starzbet_marketTitle_ou_total } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { marketTypeTKeys } from "@sb/betting-core/SharedTKeys/MarketTypeTKeys";
import classes from "./TournamentTable.module.css";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { TournamentName } from "../../../../../../../Components/TournamentName/TournamentName";
import {
  useVirtualTournamentStartTimeSelector,
  useVirtualTournamentStatusSelector,
} from "../../../../../../../Store/Virtual/Common/Hooks/UseVirtualTournamentSelectors";
import { TournamentContainer } from "../../../../../../../Containers/TournamentContainer/TournamentContainer";
import { useMedia } from "../../../../../../../Hooks/UseMedia";
import { outcomeTitleByMarketType } from "../../../../../../../Store/Feed/Model/Outcome/OutcomeTitleMap";
import { getMarketTypeListBySportId } from "../../../../../../Onwin2/GetMarketTypeListBySportId";
import { EventStatus } from "../../../../Desktop/Components/Virtual/EventStatus/EventStatus";
import { DropdownIcon } from "../../../../Components/Icons/DropdownIcon/DropdownIcon";
import { EventSuspended } from "../../EventSuspended/EventSuspended";
import { EmptyStub } from "../../Empty/Empty";
import { SimplyEventRow } from "../Row/Row";

const map = {
  [EMarketGroup.ou]: sportsbookui_starzbet_marketTitle_ou_total,
  [EMarketGroup._12_score]: sportsbookui_starzbet_marketTitle_ou_total,
  [EMarketGroup.interval_ou]: sportsbookui_starzbet_marketTitle_ou_total,
  [EMarketGroup.interval_ou_team]: sportsbookui_starzbet_marketTitle_ou_total,
};

const Cell = memo(({ text }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.cell}>
      {t(text)}
    </div>
  );
});
Cell.displayName = "Cell";

const Tournament = memo(({
  sportId,
  nested = false,
}) => {
  const [t] = useTranslation();

  const marketCount = useMedia(
    ["(min-width: 700px)", "(min-width: 550px)"],
    [3, 2],
    1,
  );
  const types = getMarketTypeListBySportId(sportId).slice(0, marketCount);

  return (
    <div className={clsx(classes.markets, nested && classes.nested)}>
      {
        types.map((type) => (
          <div className={classes.market} key={type}>
            <div className={classes.marketName}>
              {t(marketTypeTKeys[type])}
            </div>

            <div className={classes.outcomeList}>
              {outcomeTitleByMarketType(type, map).map(keyToComponent("text")(Cell))}
            </div>
          </div>
        ))
      }
    </div>
  );
});
Tournament.displayName = "Tournament";

const TournamentTableExpandedContent = memo(({
  tournament: { id, sportId },
  expanded,
  toggle,
}) => {
  const startTime = useVirtualTournamentStartTimeSelector(id);
  const eventStatus = useVirtualTournamentStatusSelector(id);

  const className = clsx(
    classes.menu,
    expanded && classes.expanded,
  );

  return (
    <>
      <div className={className} onClick={toggle}>
        <div className={classes.tournamentNameInfo}>
          {startTime && <EventStatus status={eventStatus} startTime={startTime} />}

          <div className={classes.tournamentName}>
            <Ellipsis>
              <TournamentName id={id} />
            </Ellipsis>
          </div>
        </div>

        <DropdownIcon color={"darkText"} size={"m"} expanded={expanded} />
      </div>

      {expanded && <Tournament sportId={sportId} nested />}
    </>
  );
});
TournamentTableExpandedContent.displayName = "TournamentTableExpandedContent";

const SimplyTournamentTableContent = memo(({
  eventIds,
  tournament: { sportId },
}) => (
  <div>
    <Tournament sportId={sportId} />

    {
      eventIds.length === 0
        ? <EventSuspended />
        : eventIds.map(keyToComponent("eventId")(SimplyEventRow))
    }
  </div>
));
SimplyTournamentTableContent.displayName = "SimplyTournamentTableContent";

const SimplyTournamentContainer = withProps(TournamentContainer)({ contentView: SimplyTournamentTableContent });

const TournamentTableExpanded = withProps(TournamentContainer)({ contentView: TournamentTableExpandedContent });

const SimplyTournamentTable = memo(({ entries }) => {
  if (entries.length === 0) {
    return (
      <EmptyStub />
    );
  }

  return (
    entries.map(([tournamentId, eventIds]) => (
      <SimplyTournamentContainer
        key={tournamentId}
        id={tournamentId}
        eventIds={eventIds}
      />
    ))
  );
});
SimplyTournamentTable.displayName = "SimplyTournamentTable";

export { TournamentTableExpanded, SimplyTournamentTable };


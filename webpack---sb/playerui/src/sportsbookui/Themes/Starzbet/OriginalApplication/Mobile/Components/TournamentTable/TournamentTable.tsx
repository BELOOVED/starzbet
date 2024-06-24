import clsx from "clsx";
import { memo, useReducer } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_outrights } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { getNotNil, type TVoidFn, useParamSelector, not } from "@sb/utils";
import { type IFlatTournament } from "@sb/betting-core/Feed/Types";
import classes from "./TournamentTable.module.css";
import { When } from "../../../../../../../common/Components/When";
import { ArrowIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowIcon";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { CategoryName } from "../../../../../../Components/CategoryName/CategoryName";
import { TournamentName } from "../../../../../../Components/TournamentName/TournamentName";
import { TournamentContainer } from "../../../../../../Containers/TournamentContainer/TournamentContainer";
import { isFakeOutrightTournamentId, unfakeOutrightTournamentId } from "../../../../../../Store/SportMenu/Model/SportMenu";
import { FlagContainer } from "../../../../../../Components/Flag/Flag";
import { TournamentLink } from "../../../../../../Components/TournamentLink/TournamentLink";
import { scrollToTop } from "../../../../../../Utils/ScrollToTop";
import { outrightByIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { EventRow } from "../EventRow/EventRow";

interface ITournamentInfo {
  tournament: IFlatTournament;
  changeExpanded: TVoidFn;
  expanded: boolean;
  isOutright: boolean;
}

const TournamentInfo = memo<ITournamentInfo>(({
  tournament,
  changeExpanded,
  expanded,
  isOutright,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.container} onClick={changeExpanded}>
      <div className={clsx(classes.tournament, isOutright && classes["outright-tournament"])}>
        <TournamentLink
          tournamentId={tournament.id}
          className={classes.info}
          onClick={scrollToTop}
          isOutright={isOutright}
        >
          <div className={classes.categoryLogo}>
            <FlagContainer categoryId={tournament.categoryId} />
          </div>

          <Ellipsis>
            <CategoryName id={tournament.categoryId} />

            {", "}

            <TournamentName
              id={tournament.id}
            />

            <When condition={isOutright}>
              {", "}

              {t(sportsbookui_starzbet_title_outrights)}
            </When>
          </Ellipsis>
        </TournamentLink>
      </div>

      <div className={classes.expandCategory}>
        <ArrowIcon expanded={expanded} />
      </div>
    </div>

  );
});
TournamentInfo.displayName = "TournamentInfo";

interface ITournament extends IWithId {
  changeExpanded: TVoidFn;
  expanded: boolean;
  isOutright: boolean;
}

const Tournament = memo<ITournament>(({
  id,
  changeExpanded,
  expanded,
  isOutright,
}) => (
  <div className={clsx(classes.table, expanded && classes.tableGrey)}>
    {
      isFakeOutrightTournamentId(id)
        ? (
          <TournamentContainer
            id={unfakeOutrightTournamentId(id)}
            contentView={TournamentInfo}
            changeExpanded={changeExpanded}
            expanded={expanded}
            isOutright={isOutright}
          />
        )
        : (
          <TournamentContainer
            id={id}
            contentView={TournamentInfo}
            changeExpanded={changeExpanded}
            expanded={expanded}
            isOutright={isOutright}
          />
        )
    }
  </div>
));
Tournament.displayName = "Tournament";

interface ITournamentTable extends IWithId {
  entryIds: string[];
}

const TournamentTable = memo<ITournamentTable>(({ id, entryIds }) => {
  const [expanded, changeExpanded] = useReducer(not<boolean>, true);

  const isOutright = useParamSelector(outrightByIdSelector, [getNotNil(entryIds[0], ["TournamentTable"], "entryIds is empty")]);

  return (
    <div className={classes.mainContainer}>
      <Tournament
        id={id}
        changeExpanded={changeExpanded}
        expanded={expanded}
        isOutright={!!isOutright}
      />

      {
        expanded && (
          <div>
            {
              entryIds.map((eventId) => (
                <EventRow id={eventId} key={eventId} />
              ))
            }
          </div>
        )
      }
    </div>
  );
});
TournamentTable.displayName = "TournamentTable";

export { TournamentTable };

// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback, useReducer, useState } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_outrights } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { keyToComponent, useClickOutside, useParamSelector, not } from "@sb/utils";
import classes from "./TournamentTable.module.css";
import { When } from "../../../../../../../common/Components/When";
import { CollapseIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import { ArrowIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowIcon";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { CategoryName } from "../../../../../../Components/CategoryName/CategoryName";
import { TournamentName } from "../../../../../../Components/TournamentName/TournamentName";
import { TournamentContainer } from "../../../../../../Containers/TournamentContainer/TournamentContainer";
import { isFakeOutrightTournamentId, unfakeOutrightTournamentId } from "../../../../../../Store/SportMenu/Model/SportMenu";
import { FlagContainer } from "../../../../../../Components/Flag/Flag";
import { TournamentLink } from "../../../../../../Components/TournamentLink/TournamentLink";
import { scrollToTop } from "../../../../../../Utils/ScrollToTop";
import { getMarketTypeListBySportId } from "../../../../../../Store/Feed/Model/Market/Market";
import { PlainMarketName } from "../../../../../../Components/MarketName/MarketName";
import { StubMarketFilterProvider } from "../../../../../../Store/MarketFilter/MarketFilterProvider";
import { marketFilterTypeByTournamentMapSelector } from "../../../../../../Store/MarketFilter/Selectors/MarketFilterSelectors";
import {
  useMarketFilterChangeTournamentMapAction,
} from "../../../../../../Store/MarketFilter/Hooks/UseMarketFilterChangeTournamentMapAction";
import { outrightByIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { EventRow } from "../EventRow/EventRow";

const DropdownItem = memo(({
  currentType,
  type,
  sportId,
  setMarketType,
}) => {
  const clickHandler = useCallback((e: any) => setMarketType(e.currentTarget.dataset.type), []);

  return (
    <div
      className={clsx(classes.dropdownItem, type === currentType && classes.current)}
      data-type={type}
      onClick={clickHandler}
    >
      <PlainMarketName marketType={type} sportId={sportId} />
    </div>
  );
});
DropdownItem.displayName = "DropdownItem";

const SelectMarket = memo(({ sportId, marketType, setMarketType }) => {
  const [expanded, setExpanded] = useState(false);

  const closeHandler = () => setExpanded(false);

  const ref = useClickOutside(closeHandler);

  const list = getMarketTypeListBySportId(sportId);

  const dropdownAvailable = list.length > 1;

  const marketsLength = list.length === 1;

  const toggleHandler = (e: MouseEvent) => {
    if (marketsLength) {
      return;
    }
    e.stopPropagation();
    setExpanded(not);
  };

  return (
    <div
      className={clsx(expanded ? classes.expandedFilter : classes.filter)}
      ref={ref}
      onClick={toggleHandler}
    >
      <div className={classes.filterHandle}>
        <div className={clsx(classes.filterName, expanded && classes.activeFilterName)}>
          <Ellipsis>
            <PlainMarketName marketType={marketType} sportId={sportId} />
          </Ellipsis>
        </div>

        <div className={clsx(classes.arrow, marketsLength && classes.empty)}>
          <CollapseIcon expanded={expanded} />
        </div>
      </div>

      <When condition={dropdownAvailable && expanded}>
        <div className={classes.dropdown}>
          {list.map(keyToComponent("type", { currentType: marketType, sportId, setMarketType })(DropdownItem))}
        </div>
      </When>
    </div>
  );
});
SelectMarket.displayName = "SelectMarket";

const TournamentInfo = memo(({
  tournament,
  changeExpanded,
  expanded,
  isOutright,
}) => {
  const [t] = useTranslation();
  const marketType = useParamSelector(marketFilterTypeByTournamentMapSelector, [tournament.id, tournament.sportId]);

  const setMarketType = useMarketFilterChangeTournamentMapAction(tournament.id);

  return (
    <div className={classes.container} onClick={changeExpanded}>
      <div className={clsx(classes.tournament, isOutright && classes["outright-tournament"])}>
        <TournamentLink
          isOutright={isOutright}
          tournamentId={tournament.id}
          className={classes.info}
          onClick={scrollToTop}
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

      {
        expanded && !isOutright && (
          <StubMarketFilterProvider marketType={marketType}>
            <SelectMarket
              marketType={marketType}
              setMarketType={setMarketType}
              sportId={tournament.sportId}
            />
          </StubMarketFilterProvider>
        )
      }

      <div className={classes.expandCategory}>
        <ArrowIcon expanded={expanded} />
      </div>
    </div>

  );
});
TournamentInfo.displayName = "TournamentInfo";

const Tournament = memo(({
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

const TournamentTable = memo(({ id, entryIds }) => {
  const [expanded, changeExpanded] = useReducer(not<boolean>, true);

  const isOutright = useParamSelector(outrightByIdSelector, [entryIds[0]]);

  return (
    <div className={classes.mainContainer}>
      <Tournament
        id={id}
        changeExpanded={changeExpanded}
        expanded={expanded}
        isOutright={isOutright}
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

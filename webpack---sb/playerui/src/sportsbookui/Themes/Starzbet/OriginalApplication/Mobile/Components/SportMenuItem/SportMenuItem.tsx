import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_outrights } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./SportMenuItem.module.css";
import { ClassicArrowIconMobile } from "../../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ClassicArrowIcon";
import { outrightCountBySportIdSelector } from "../../../../../../Store/SportMenu/Selectors/OutrightCountBySportIdSelector";
import {
  outrightTournamentIdListByCategoryIdSelector,
} from "../../../../../../Store/SportMenu/Selectors/OutrightTournamentIdListByCategoryIdSelector";
import { sportMenuTournamentActiveSelector } from "../../../../../../Store/SportMenu/Selectors/SportMenuTournamentActiveSelector";
import { getSportTKeyById } from "../../../../../../Store/Feed/Model/Sport";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import {
  LiveSportMenuCategoryContainer,
  PreLiveSportMenuCategoryContainer,
} from "../../../../../../Containers/SportMenuCategoryContainer/SportMenuCategoryContainer";
import { FlagContainer } from "../../../../../../Components/Flag/Flag";
import { CategoryName } from "../../../../../../Components/CategoryName/CategoryName";
import { SportMenuTournamentContainer } from "../../../../../../Containers/SportMenuTournamentContainer/SportMenuTournamentContainer";
import { TournamentName } from "../../../../../../Components/TournamentName/TournamentName";
import {
  fakeOutrightTournamentId,
  type ICategoryProps,
  type ISportMenuItemProps,
  type ITournamentProps,
} from "../../../../../../Store/SportMenu/Model/SportMenu";
import { useSportMenuTournamentActions } from "../../../../../../Store/SportMenu/Hooks/UseSportMenuTournamentActions";
import { sizeLiveEventBySportIdSelector } from "../../../../../../Store/Feed/Selectors/LiveEventsSelector";
import { sizePreLiveEventBySportIdSelector } from "../../../../../../Store/Feed/Selectors/PreLiveEventsSelector";
import { SportIcon } from "../../../Components/SportIcon/SportIcon";
import { ChevronIcon } from "../../../Components/Icons/ChevronIcon/ChevronIcon";

const OutrightName = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      {", "}

      {t(sportsbookui_starzbet_title_outrights)}
    </>
  );
});
OutrightName.displayName = "OutrightName";

const Tournament = memo<ITournamentProps>(({
  active,
  toggleActive,
  id,
  extraName = null,
}) => (
  <div className={clsx(classes.tournament, active && classes.tournamentChecked)} onClick={toggleActive}>
    <div className={classes.tournamentName}>
      <TournamentName id={id} />

      {extraName}
    </div>

    <div className={classes.arrow}>
      <ClassicArrowIconMobile />
    </div>
  </div>
));
Tournament.displayName = "Tournament";

const OutrightTournament = memo<IWithId>(({ id }) => {
  const active = useParamSelector(sportMenuTournamentActiveSelector, [fakeOutrightTournamentId(id)]);

  const toggleActive = useSportMenuTournamentActions(fakeOutrightTournamentId(id), active);

  return (
    <Tournament
      id={id}
      active={active}
      toggleActive={toggleActive}
      extraName={<OutrightName />}
    />
  );
});
OutrightTournament.displayName = "OutrightTournament";

const Category = memo<ICategoryProps>(({
  active,
  toggleActive,
  categoryId,
  tournamentIdList,
  noOutrights,
}) => {
  const outrightTournamentIdList = useParamSelector(outrightTournamentIdListByCategoryIdSelector, [categoryId]);

  return (
    <div className={clsx(classes.categoryItem, active && classes.active)}>
      <div className={classes.inner} onClick={toggleActive}>
        <div className={classes.flag}>
          <FlagContainer categoryId={categoryId} />
        </div>

        <div className={classes.categoryName}>
          <CategoryName id={categoryId} />
        </div>

        <ChevronIcon expanded={active} color={"darkText"} />
      </div>

      {
        active && (
          <div className={classes.tournamentList}>
            {
              tournamentIdList.map((tournamentId) => (
                <SportMenuTournamentContainer
                  key={tournamentId}
                  tournamentId={tournamentId}
                  child={Tournament}
                />
              ))
            }

            {!noOutrights ? outrightTournamentIdList.map((id) => <OutrightTournament id={id} key={id} />) : null}
          </div>
        )
      }
    </div>
  );
});
Category.displayName = "Category";

const SportMenuItem = memo<ISportMenuItemProps>(({
  active,
  toggleActive,
  sportId,
  categoryIdList,
  isLive,
}) => {
  const [t] = useTranslation();
  const selector = isLive ? sizeLiveEventBySportIdSelector : sizePreLiveEventBySportIdSelector;
  const count = useParamSelector(selector, [sportId]);
  const outrightCount = useParamSelector(outrightCountBySportIdSelector, [sportId]);

  const itemClass = clsx(
    classes.sportMenuItem,
    active && classes.active,
  );

  return (
    <div className={itemClass}>
      <div className={classes.inner} onClick={toggleActive}>
        <SportIcon id={sportId} isSidebar={true} />

        <div className={classes.name}>
          <Ellipsis>
            {t(getSportTKeyById(sportId))}
          </Ellipsis>
        </div>

        <div className={classes.tournamentCount}>
          {`${count + outrightCount}`}
        </div>

        <ChevronIcon expanded={active} color={"darkText"} />
      </div>

      {
        active && (
          <div className={classes.subMenuWrapper}>
            {
              categoryIdList.map((categoryId) => (isLive
                ? (
                  <LiveSportMenuCategoryContainer
                    key={categoryId}
                    categoryId={categoryId}
                    child={Category}
                  />
                )
                : (
                  <PreLiveSportMenuCategoryContainer
                    key={categoryId}
                    categoryId={categoryId}
                    child={Category}
                  />
                )
              ))
            }
          </div>
        )
      }
    </div>
  );
});
SportMenuItem.displayName = "SportMenuItem";

export { SportMenuItem };

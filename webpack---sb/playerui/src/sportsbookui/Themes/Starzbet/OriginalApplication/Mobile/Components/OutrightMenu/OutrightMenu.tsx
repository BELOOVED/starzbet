import clsx from "clsx";
import { memo, useReducer } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_outrightMenu_title_outrights,
  sportsbookui_starzbet_title_outrights,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { not } from "@sb/utils/Not";
import { deprecatedGetNotNil, useAction, useParamSelector } from "@sb/utils";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { useRouteMatch } from "@sb/react-router-compat";
import classes from "./OutrightMenu.module.css";
import { ClassicArrowIconMobile } from "../../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ClassicArrowIcon";
import { useLocalizedPathToRoute } from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPathToRoute";
import { getLocalizedRouteParams } from "../../../../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedRouteProps";
import { countOutrightsSelector, feedTreeByTournamentIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { sportIdListByOutrightsSelector } from "../../../../../../Store/Feed/Selectors/SportIdListByOutrightsSelector";
import { getSportTKeyById } from "../../../../../../Store/Feed/Model/Sport";
import {
  outrightTournamentIdListByBySportIdSelector,
} from "../../../../../../Store/Feed/Selectors/OutrightTournamentIdListByBySportIdSelector";
import { TournamentName } from "../../../../../../Components/TournamentName/TournamentName";
import { setDisabledSportMenuAction, sportMenuRemoveAllTournamentIdAction } from "../../../../../../Store/SportMenu/SportMenuActions";
import { ResetedNavLink } from "../../../../../../Components/ResetedLink/ResetedLink";
import { fakeOutrightTournamentSlug } from "../../../../../../Store/SportMenu/Model/SportMenu";
import { getRouteParamsDecode, routeMap } from "../../../../../../RouteMap/RouteMap";
import { ESportPeriod } from "../../../../../../Store/SportMenu/Model/SportPeriod";
import { SportIcon } from "../../../Components/SportIcon/SportIcon";
import { ChevronIcon } from "../../../Components/Icons/ChevronIcon/ChevronIcon";

interface IOutrightSportProps {
  sportId: string;
}

interface IOutrightTournamentProps {
  tournamentId: string;
}

const createPath = (tree: ReturnType<typeof feedTreeByTournamentIdSelector>) => {
  const { tournament, category, sport } = deprecatedGetNotNil(tree);

  const rawTournamentSlug = tournament.slug;

  const path = `${sportIdToCodeMap[sport.id]}/${category.slug}/${fakeOutrightTournamentSlug(rawTournamentSlug)}`;

  return getRouteParamsDecode(
    routeMap.preLive.selection,
    {
      period: ESportPeriod.ALL,
      path,
    },
  );
};

const OutrightTournament = memo<IOutrightTournamentProps>(({ tournamentId }) => {
  const [t] = useTranslation();

  const tree = useParamSelector(feedTreeByTournamentIdSelector, [tournamentId]);

  const path = createPath(tree);

  const route = useLocalizedPathToRoute(...getLocalizedRouteParams(path));
  const active = useRouteMatch(route);

  const disableMenu = useAction(setDisabledSportMenuAction);

  const resetMenu = useAction(sportMenuRemoveAllTournamentIdAction);

  const onClick = () => {
    if (active) {
      return;
    }

    resetMenu();
    disableMenu(true);
  };

  return (
    <ResetedNavLink
      className={classes["outright-tournament"]}
      activeClassName={classes.active}
      {...path}
      onClick={onClick}
    >
      <Ellipsis>
        <TournamentName id={tournamentId} />

        {", "}

        {t(sportsbookui_starzbet_title_outrights)}
      </Ellipsis>

      <div className={classes.arrow}>
        <ClassicArrowIconMobile />
      </div>
    </ResetedNavLink>
  );
});
OutrightTournament.displayName = "OutrightTournament";

const OutrightSport = memo<IOutrightSportProps>(({ sportId }) => {
  const [t] = useTranslation();

  const [expanded, toggle] = useReducer(not<boolean>, false);

  const tournamentIdList = useParamSelector(outrightTournamentIdListByBySportIdSelector, [sportId]);

  return (
    <div className={classes["outright-sport"]}>
      <div className={clsx(classes.outrightSportInner, expanded && classes.active)} onClick={toggle}>
        <SportIcon id={sportId} isSidebar={true} />

        <Ellipsis className={classes["sport-name"]}>
          {t(getSportTKeyById(sportId))}
        </Ellipsis>

        <ChevronIcon expanded={expanded} color={"darkText"} />
      </div>

      <div className={classes.list}>
        {
          expanded && (
            tournamentIdList.map((tournamentId) => (
              <OutrightTournament
                key={tournamentId}
                tournamentId={tournamentId}
              />
            ))
          )
        }
      </div>
    </div>
  );
});
OutrightSport.displayName = "OutrightSport";

const OutrightsSports = memo(() => {
  const sportIdList = useSelector(sportIdListByOutrightsSelector);

  return sportIdList.map(
    (sportId) => (
      <OutrightSport sportId={sportId} key={sportId} />
    ),
  );
});
OutrightsSports.displayName = "OutrightsSports";

const OutrightMenu = memo(() => {
  const [t] = useTranslation();

  const count = useSelector(countOutrightsSelector);

  const [expanded, toggle] = useReducer(not<boolean>, false);

  if (count === 0) {
    return null;
  }

  return (
    <div className={clsx(classes["outright-menu"], expanded && classes["menu-active"])}>
      <div className={classes["menu-head"]} onClick={toggle}>
        <Ellipsis className={classes["menu-title"]}>
          {t(sportsbookui_starzbet_outrightMenu_title_outrights)}
        </Ellipsis>

        <div className={classes.count}>
          {count}
        </div>

        <ChevronIcon expanded={expanded} color={"darkText"} />
      </div>

      {
        expanded && (
          <OutrightsSports />
        )
      }
    </div>
  );
});
OutrightMenu.displayName = "OutrightMenu";

export { OutrightMenu };

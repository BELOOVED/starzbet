import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { isEmpty, useParamSelector, withProps } from "@sb/utils";
import { type TMatch } from "@sb/react-router-compat";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_empty_thereAreNoTournamentForTheSelectedParameter,
  sportsbookui_starzbet_search_tab_events,
  sportsbookui_starzbet_search_tab_tournaments,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./Search.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Empty } from "../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { ClassicArrowIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ClassicArrowIcon";
import { eventCountByTournamentIdSelector } from "../../../../../Store/Feed/Selectors/EventCountByTournamentIdSelector";
import { categoryByIdSelector, tournamentByIdSelector } from "../../../../../Store/Feed/Selectors/FeedSelectors";
import {
  groupEventsByTournamentId,
  isBaseSportEvent,
  isEsportEvent,
  sortEventIdsByStartTimeAndName,
} from "../../../../../Store/Feed/Model/Event";
import {
  liveESportSearchEventsEntriesPerSportSelectorFactory,
  liveSportSearchEventsEntriesPerSportSelectorFactory,
  preLiveESportSearchEventsEntriesPerSportSelectorFactory,
  preLiveSportSearchEventsEntriesPerSportSelectorFactory,
} from "../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import {
  liveEsportEventIdListBySearchTextSelectorFactory,
  liveEsportTournamentIdListBySearchTextSelectorFactory,
  liveEventIdListBySearchTextSelectorFactory,
  liveTournamentIdListBySearchTextSelectorFactory,
  preLiveEsportEventIdListBySearchTextSelectorFactory,
  preLiveEsportTournamentIdListBySearchTextSelectorFactory,
  preLiveEventIdListBySearchTextSelectorFactory,
  preLiveTournamentIdListBySearchTextSelectorFactory,
} from "../../../../../Store/Feed/Selectors/SearchSelectors";
import { getRouteParamsDecode, routeMap } from "../../../../../RouteMap/RouteMap";
import { ESportPeriod } from "../../../../../Store/SportMenu/Model/SportPeriod";
import { ResetedLink } from "../../../../../Components/ResetedLink/ResetedLink";
import { CategoryName } from "../../../../../Components/CategoryName/CategoryName";
import { TournamentName } from "../../../../../Components/TournamentName/TournamentName";
import {
  fakeOutrightTournamentSlug,
  isFakeOutrightTournamentId,
  unfakeOutrightTournamentId,
} from "../../../../../Store/SportMenu/Model/SportMenu";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { SportIcon } from "../../Components/SportIcon/SportIcon";
import {
  EventsVirtualContainer as MobileEventsVirtualContainer,
} from "../../Mobile/Components/EventsVirtualContainer/EventsVirtualContainer";
import { ESportPage } from "../../Desktop/Components/NavMenu/NavMenu";
import { EventsVirtualContainer } from "../../Desktop/Components/EventsVirtualContainer/EventsVirtualContainer";

const selectorDeps = [sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const eventsCountSelectors = {
  [ESportPage.live]: liveEventIdListBySearchTextSelectorFactory,
  [ESportPage.prelive]: preLiveEventIdListBySearchTextSelectorFactory,
  [ESportPage.e_live]: liveEsportEventIdListBySearchTextSelectorFactory,
  [ESportPage.e_prelive]: preLiveEsportEventIdListBySearchTextSelectorFactory,
};

const eventsSelectors = {
  [ESportPage.live]: liveSportSearchEventsEntriesPerSportSelectorFactory,
  [ESportPage.prelive]: preLiveSportSearchEventsEntriesPerSportSelectorFactory,
  [ESportPage.e_live]: liveESportSearchEventsEntriesPerSportSelectorFactory,
  [ESportPage.e_prelive]: preLiveESportSearchEventsEntriesPerSportSelectorFactory,
};

const tournamentSelectors = {
  [ESportPage.live]: liveTournamentIdListBySearchTextSelectorFactory,
  [ESportPage.prelive]: preLiveTournamentIdListBySearchTextSelectorFactory,
  [ESportPage.e_live]: liveEsportTournamentIdListBySearchTextSelectorFactory,
  [ESportPage.e_prelive]: preLiveEsportTournamentIdListBySearchTextSelectorFactory,
};

enum ESearchTab {
  events,
  tornaments,
}

interface ISearch {
  match: TMatch;
  type: ESportPage;
}

interface ITournament {
  tournamentId: string;
  isESport: boolean;
  isLive: boolean;
}

interface IList extends Omit<ITournament, "tournamentId"> {
  list: string[];
}

interface IEventList {
  isESport: boolean;
  searchText: string;
  type: ESportPage;
}

interface ITotal {
  tournamentId: string;
}

const TotalEvents = memo<ITotal>(({ tournamentId }) => {
  const totalEvents = useParamSelector(eventCountByTournamentIdSelector, [tournamentId]);

  return (
    <div className={classes.totalEvents}>
      {`+${totalEvents}`}
    </div>
  );
});
TotalEvents.displayName = "TotalEvents";

const EventList = memo<IEventList>(({ type, isESport, searchText }) => {
  const deps = [searchText, (isESport ? isEsportEvent : isBaseSportEvent), ...selectorDeps];

  if (IS_MOBILE_CLIENT_SIDE) {
    return (
      <MobileEventsVirtualContainer
        selectorFactory={eventsSelectors[type]}
        deps={deps}
      />
    );
  }

  return (
    <EventsVirtualContainer
      selectorFactory={eventsSelectors[type]}
      deps={deps}
    />
  );
});
EventList.displayName = "EventList";

const Tournament = memo<ITournament>(({ tournamentId, isESport, isLive }) => {
  const isOutright = isFakeOutrightTournamentId(tournamentId);
  const id = isOutright ? unfakeOutrightTournamentId(tournamentId) : tournamentId;

  const tournament = useParamSelector(tournamentByIdSelector, [id]);

  const category = useParamSelector(categoryByIdSelector, [tournament.categoryId]);

  const path = isLive
    ? getRouteParamsDecode(
      (isESport ? routeMap.esport.live.selection : routeMap.live.selection),
      {
        path: isOutright ? `${sportIdToCodeMap[tournament.sportId]}/${category.slug}/${fakeOutrightTournamentSlug(tournament.slug)}` : `${sportIdToCodeMap[tournament.sportId]}/${category.slug}/${tournament.slug}`,
      },
    )
    : getRouteParamsDecode(
      (isESport ? routeMap.esport.preLive.selection : routeMap.preLive.selection),
      {
        period: ESportPeriod.ALL,
        path: isOutright ? `${sportIdToCodeMap[tournament.sportId]}/${category.slug}/${fakeOutrightTournamentSlug(tournament.slug)}` : `${sportIdToCodeMap[tournament.sportId]}/${category.slug}/${tournament.slug}`,
      },
    );

  return (
    <ResetedLink {...path} className={classes.tournamentItem}>
      <div className={classes.left}>
        <div className={classes.icon}>
          <SportIcon id={tournament.sportId} />
        </div>

        <div className={classes.tournamentInfo}>
          <Ellipsis>
            <CategoryName id={tournament.categoryId} />

            {", "}

            <TournamentName id={tournament.id} />
          </Ellipsis>
        </div>
      </div>

      <div className={classes.right}>
        <TotalEvents tournamentId={tournamentId} />

        <ClassicArrowIcon />
      </div>
    </ResetedLink>
  );
});
Tournament.displayName = "Tournament";

const TournamentList = memo<IList>(({
  isESport,
  list,
  isLive,
}) => {
  if (isEmpty(list)) {
    return <Empty messageTKey={sportsbookui_starzbet_empty_thereAreNoTournamentForTheSelectedParameter} />;
  }

  return (
    <div className={classes.list}>
      {
        list.map((el) => (
          <Tournament
            tournamentId={el}
            key={el}
            isESport={isESport}
            isLive={isLive}
          />
        ))
      }
    </div>
  );
});
TournamentList.displayName = "TournamentList";

const Search = memo<ISearch>(({ match, type }) => {
  const searchText = match.params?.searchText || "";

  const tournamentList = useParamSelector(tournamentSelectors[type], [searchText]);
  const eventsList = useParamSelector(eventsCountSelectors[type], [searchText]);

  const eventsLength = eventsList.length;
  const tournamentLength = tournamentList.length;

  const [t] = useTranslation();

  const [tab, setTab] = useState(ESearchTab.events);

  useEffect(
    () => {
      if (!eventsLength && tab === ESearchTab.events && tournamentLength) {
        setTab(ESearchTab.tornaments);
      }

      if (!tournamentLength && tab === ESearchTab.tornaments && eventsLength) {
        setTab(ESearchTab.events);
      }
    },
    [eventsLength, tournamentLength],
  );

  const isEvents = tab === ESearchTab.events;

  const goToEvents = () => setTab(ESearchTab.events);
  const goToTournament = () => setTab(ESearchTab.tornaments);

  const isLive = type === ESportPage.e_live || type === ESportPage.live;
  const isESport = type === ESportPage.e_prelive || type === ESportPage.e_live;

  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        <div className={clsx(classes.tab, isEvents && classes.active)} onClick={goToEvents}>
          <Ellipsis>{t(sportsbookui_starzbet_search_tab_events)}</Ellipsis>

          <span className={classes.count}>{eventsLength}</span>
        </div>

        <div className={clsx(classes.tab, !isEvents && classes.active)} onClick={goToTournament}>
          <Ellipsis>{t(sportsbookui_starzbet_search_tab_tournaments)}</Ellipsis>

          <span className={classes.count}>{tournamentLength}</span>
        </div>
      </div>

      {
        isEvents
          ? <EventList isESport={isESport} type={type} searchText={searchText} />
          : (
            <TournamentList
              isESport={isESport}
              isLive={isLive}
              list={tournamentList}
            />
          )
      }
    </div>
  );
});
Search.displayName = "Search";

const LiveSearch = withProps(Search)({ type: ESportPage.live });
const ELiveSearch = withProps(Search)({ type: ESportPage.e_live });
const PreLiveSearch = withProps(Search)({ type: ESportPage.prelive });
const EPreLiveSearch = withProps(Search)({ type: ESportPage.e_prelive });

export {
  PreLiveSearch,
  ELiveSearch,
  LiveSearch,
  EPreLiveSearch,
};

import type { IFlatCategory, IFlatSport, IFlatTournament } from "@sb/betting-core/Feed/Types";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { getRouteParamsDecode, routeMap } from "../../../RouteMap/RouteMap";
import { fakeOutrightTournamentSlug } from "../../SportMenu/Model/SportMenu";
import { sportPeriodEnum } from "../../SportMenu/Model/SportPeriod";

interface ITree {
  tournament: IFlatTournament;
  category: IFlatCategory;
  sport: IFlatSport;
}

const createPath = (tree: ITree, isOutright: boolean) => {
  const rawTournamentSlug = tree.tournament.slug;

  const tournamentSlug = isOutright ? fakeOutrightTournamentSlug(rawTournamentSlug) : rawTournamentSlug;

  return `${sportIdToCodeMap[tree.sport.id]}/${tree.category.slug}/${tournamentSlug}`;
};

const list = [
  {
    path: routeMap.live.root,
    getRouteParams: (path: string) => getRouteParamsDecode(
      routeMap.live.selection,
      {
        path,
      },
    ),
  },
  {
    path: routeMap.preLive.root,
    getRouteParams: (path: string) => getRouteParamsDecode(
      routeMap.preLive.selection,
      {
        period: sportPeriodEnum.all,
        path,
      },
    ),
  },
  {
    path: routeMap.esport.live.root,
    getRouteParams: (path: string) => getRouteParamsDecode(
      routeMap.esport.live.selection,
      {
        path,
      },
    ),
  },
  {
    path: routeMap.esport.preLive.root,
    getRouteParams: (path: string) => getRouteParamsDecode(
      routeMap.esport.preLive.selection,
      {
        period: sportPeriodEnum.all,
        path,
      },
    ),
  },
];

export { createPath, list, type ITree };

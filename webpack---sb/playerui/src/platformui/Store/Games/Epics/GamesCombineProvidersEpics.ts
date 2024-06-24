import { combineEpics } from "redux-observable";
import { routerEpic } from "@sb/router";
import { extractExport } from "@sb/utils";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { combineProvidersPathByGamePageMap } from "../../../Utils/GetGamesViewParams";
import { gameManagerPages, type TGameManagerPage } from "../Model/Games";

const platformCombineProvidersPageEpicFactory = (page: TGameManagerPage) =>
  routerEpic({
    name: `platform ${page} CombineProvidersPage`,
    match: getMatch({ path: combineProvidersPathByGamePageMap[page], exact: true }),
    onStart: () => import("./GamesCombineProviderRouteEpic")
      .then(extractExport("gamesCombineProviderRouteEpic"))
      .then((epic) => epic(page)),
  });

const gamesCombineProvidersEpics = combineEpics(
  ...gameManagerPages.map(platformCombineProvidersPageEpicFactory),
);

const groupProvidersPageEpicFactory = (page: TGameManagerPage) => routerEpic({
  name: `groupProviders${page}`,
  match: getMatch(combineProvidersPathByGamePageMap[page]),
  onStart: () => import("./GroupProvidersRouteEpic")
    .then(extractExport("groupProvidersEpicFactory"))
    .then((epic) => epic(page)),
});

const groupProvidersPageEpics = combineEpics(
  ...gameManagerPages.map(groupProvidersPageEpicFactory),
);

export { gamesCombineProvidersEpics, groupProvidersPageEpics };


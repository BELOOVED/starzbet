import { type TRootReducer } from "../../../../common/Store/Root/TRootReducer";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { extractIds } from "../../../../common/Utils/IDUtils";
import { addUniq } from "../../Games/Utils/GameUtils";
import {
  type cmsGamesByIdsReceivedAction,
  type cmsGamesByLabelIdsReceivedAction,
  type labelsReceivedAction,
} from "../CMSAction";
import {
  cmsGamesMapItemSelector,
  notNilCmsGamesSelector,
  notNilCmsLandingBlockContentSelector,
} from "../Selectors/LandingSelectors/CMSLandingSelectors";

const landingGamesByLabelIdsReducer: TRootReducer<typeof cmsGamesByLabelIdsReceivedAction> = (
  state,
  {
    payload: {
      games,
      pageInfo,
      id,
      index,
    },
  },
) => {
  const content = notNilCmsLandingBlockContentSelector(state);
  const gamesByIndex = cmsGamesMapItemSelector(state, index, "landingGamesByGameIdsReducer");

  return {
    ...state,
    CMS: {
      ...state.CMS,
      content: {
        ...content,
        cmsGames: {
          ...content.cmsGames,
          gamesMap: {
            ...content.cmsGames?.gamesMap,
            [index]: {
              ...gamesByIndex,
              loaded: {
                gameIds: [...new Set([...gamesByIndex.loaded.gameIds, ...extractIds(games)])],
                pageInfo,
              },
            },
          },
        },
      },
    },
    landing: {
      ...state.landing,
      games: {
        ...state.landing.games,
        labelIds: {
          ...state.landing.games.labelIds,
          [id]: extractIds(games),
        },
        pageInfo,
      },
    },
    games: {
      ...state.games,
      games: addUniq(state.games.games, games),
    },
  } as TMixAppState;
  //todo a type that is difficult to fix because of Themes
};

const landingGamesByGameIdsReducer: TRootReducer<typeof cmsGamesByIdsReceivedAction> = (
  state,
  { payload: { games, index, pageInfo } },
) => {
  const content = notNilCmsLandingBlockContentSelector(state);
  const gamesByIndex = cmsGamesMapItemSelector(state, index, "landingGamesByGameIdsReducer");
  const cmsGames = notNilCmsGamesSelector(state);

  return {
    ...state,
    CMS: {
      ...state.CMS,
      content: {
        ...content,
        cmsGames: {
          ...content.cmsGames,
          gamesMap: {
            ...cmsGames.gamesMap,
            [index]: {
              ...cmsGames.gamesMap[index],
              loaded: {
                gameIds: [...new Set([...gamesByIndex.loaded.gameIds, ...extractIds(games)])],
                pageInfo,
              },
            },
          },
        },
      },
    },
    landing: {
      ...state.landing,
      games: {
        ...state.landing.games,
        gamesIds: [
          ...new Set([...state.landing.games.gamesIds, ...extractIds(games)]),
        ],
      },
    },
    games: {
      ...state.games,
      games: addUniq(state.games.games, games),
    },
  } as TMixAppState;
  //todo a type that is difficult to fix because of Themes
};

const landingLabelsReducer: TRootReducer<typeof labelsReceivedAction> = (
  state,
  { payload: { labels } },
) => {
  const content = notNilCmsLandingBlockContentSelector(state);
  const cmsGames = notNilCmsGamesSelector(state);

  return {
    ...state,
    CMS: {
      ...state.CMS,
      content: {
        ...content,
        cmsGames: {
          ...content.cmsGames,
          gamesMap: Object.keys(cmsGames.gamesMap).reduce(
            (acc, key) => {
              const numberKey = Number(key);

              const val = acc[numberKey];

              if (!val || !val.labelId) {
                return acc;
              }

              acc[numberKey] = {
                ...val,
                title: labels
                  .find(
                    (label) => label.id === val.labelId,
                  )?.name,
              };

              return acc;
            },
            cmsGames.gamesMap,
          ),
        },
      },
    },
    landing: {
      ...state.landing,
      labels: labels,
    },
  } as TMixAppState;
  //todo a type that is difficult to fix because of Themes;
};
export { landingLabelsReducer, landingGamesByLabelIdsReducer, landingGamesByGameIdsReducer };

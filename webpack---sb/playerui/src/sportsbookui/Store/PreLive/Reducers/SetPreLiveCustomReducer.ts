import { type TReducer } from "@sb/utils";
import { categoriesSelector, tournamentsSelector } from "../../Feed/Selectors/FeedSelectors";
import { type TAppState } from "../../InitialState";
import { preLiveCustomSelector } from "../Selectors/PreLiveSelectors";
import { type setPreLiveCustomAction } from "../PreLiveActions";

const categoriesBySportIdSelector = (sportId: string) => (state: TAppState) => {
  const categories = categoriesSelector(state);

  return Object.keys(categories).filter((categoryId) => categories[categoryId].sportId === sportId);
};

const tournamentsByCategoryIdSelector = (categoryId: string) => (state: TAppState) => {
  const tournaments = tournamentsSelector(state);

  return Object.keys(tournaments).filter((tournamentId) => tournaments[tournamentId].categoryId === categoryId);
};

const addTournament = (state: TAppState, id: string) => {
  const custom = preLiveCustomSelector(state);

  return {
    ...state,
    preLive: {
      ...state.preLive,
      custom: {
        ...custom,
        tournaments: {
          ...custom.tournaments,
          [id]: true,
        },
      },
    },
  };
};

const removeTournament = (state: TAppState, id: string) => {
  const custom = preLiveCustomSelector(state);

  const tournaments = {
    ...custom.tournaments,
  };

  if (tournaments[id]) {
    delete tournaments[id];
  }

  return {
    ...state,
    preLive: {
      ...state.preLive,
      custom: {
        ...custom,
        tournaments,
      },
    },
  };
};

const addCategory = (state: TAppState, id: string) => {
  const custom = preLiveCustomSelector(state);

  return tournamentsByCategoryIdSelector(id)(state).reduce(
    addTournament,
    {
      ...state,
      preLive: {
        ...state.preLive,
        custom: {
          ...custom,
          categories: {
            ...custom.categories,
            [id]: true,
          },
        },
      },
    },
  );
};

const removeCategory = (state: TAppState, id: string) => {
  const custom = preLiveCustomSelector(state);

  const categories = {
    ...custom.categories,
  };

  delete categories[id];

  return tournamentsByCategoryIdSelector(id)(state).reduce(
    removeTournament,
    {
      ...state,
      preLive: {
        ...state.preLive,
        custom: {
          ...custom,
          categories,
        },
      },
    },
  );
};

const addSport = (state: TAppState, id: string) => {
  const custom = preLiveCustomSelector(state);

  return categoriesBySportIdSelector(id)(state).reduce(
    addCategory,
    {
      ...state,
      preLive: {
        ...state.preLive,
        custom: {
          ...custom,
          sports: {
            ...custom.sports,
            [id]: true,
          },
        },
      },
    },
  );
};

const removeSport = (state: TAppState, id: string) => {
  const custom = preLiveCustomSelector(state);

  const sports = { ...custom.sports };

  delete sports[id];

  return categoriesBySportIdSelector(id)(state).reduce(
    removeCategory,
    {
      ...state,
      preLive: {
        ...state.preLive,
        custom: {
          ...custom,
          sports,
        },
      },
    },
  );
};

const handler = {
  sports: {
    add: addSport,
    remove: removeSport,
  },
  categories: {
    add: addCategory,
    remove: removeCategory,
  },
  tournaments: {
    add: addTournament,
    remove: removeTournament,
  },
};

const setPreLiveCustomReducer: TReducer<TAppState, typeof setPreLiveCustomAction> = (state, { payload: { entity, id } }) => {
  const method = state.preLive.custom[entity][id] ? "remove" : "add";

  return handler[entity][method](state, id);
};

export { setPreLiveCustomReducer };

import { type TLocalizedRouteParams } from "../../../common/Client/Core/Services/RouterService/Model/RoutesTypes";

type TSelectedMap = Record<string, Record<string, string[]>>;

interface IWithPreLive {
  preLive: {
    sportId: string | null;
    favourites: string[];
    rootRoute: TLocalizedRouteParams<string> | null;
    selectedMap: TSelectedMap;
    pinnedEvents: string[];
    custom: {
      sports: Record<string, boolean>;
      categories: Record<string, boolean>;
      tournaments: Record<string, boolean>;
    };
  };
}

enum ECustoms {
  SPORTS = "sports",
  CATEGORIES = "categories",
  TOURNAMENTS = "tournaments"
}

const preLiveState: IWithPreLive = {
  preLive: {
    sportId: null,
    favourites: [],
    rootRoute: null,
    selectedMap: {},
    pinnedEvents: [],
    custom: {
      sports: {},
      categories: {},
      tournaments: {},
    },
  },
};

export {
  preLiveState,
  type IWithPreLive,
  ECustoms,
  type TSelectedMap,
};

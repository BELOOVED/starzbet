import { type EGamePage } from "@sb/betting-core/EGamePage";
import { createMemoSelector } from "@sb/utils";
import { includesString } from "../../../../sportsbookui/Utils/IncludesString";
import { gameProviderName } from "../../../../common/Store/Provider/ProviderModel";
import { type TWithGamesState } from "../GamesInitialState";
import { providersWithGameCountByPageSelector, providersWithGamesByPageSelector } from "./GamesSelectors";

const searchTextSelector = (state: TWithGamesState, page: EGamePage, searchText: string | undefined) => searchText;

const topProvidersByPageSelector = createMemoSelector(
  [providersWithGamesByPageSelector],
  (providers) => providers.slice(0, 4),
);

const topProvidersWithGameCountByPageSelector = createMemoSelector(
  [providersWithGameCountByPageSelector],
  (providers) => providers.slice(0, 4),
);

const prioritizedProvidersByPageSelector = createMemoSelector(
  [providersWithGameCountByPageSelector, searchTextSelector],
  (providers, searchText) => {
    if (searchText === undefined) {
      return providers;
    }

    return providers.filter((it) => includesString(gameProviderName[it.provider], searchText));
  },
  { expensive: true },
);

const prioritizedProvidersByPageWithGamesSelector = createMemoSelector(
  [prioritizedProvidersByPageSelector],
  (providers) => providers.filter((provider) => provider.gamesCount > 0),
);

export {
  topProvidersByPageSelector,
  prioritizedProvidersByPageSelector,
  topProvidersWithGameCountByPageSelector,
  prioritizedProvidersByPageWithGamesSelector,
};


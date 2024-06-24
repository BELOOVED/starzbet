import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { isNotEmpty, useAction, useParamSelector, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { platformui_starzbet_casino_button_loadMore } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { platformui_casino_search_empty_thereAreNoGamesForTheSelectedParameter } from "@sb/translates/platformui/CommonTKeys";
import classes from "./CasinoSearch.module.css";
import { When } from "../../../../../../common/Components/When";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { Empty } from "../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { NativeHorizontalScroll } from "../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { gameProviderName, gameProviderTabs } from "../../../../../../common/Store/Provider/ProviderModel";
import {
  isLoadMorePossibleForSearchSelector,
  searchAdditionalGamesLoadingStartedSelector,
  searchGamesLoadingStartedSelector,
} from "../../../../../Store/Games/Selectors/GamesSelectors";
import {
  isEmptyGameIdsByGamePageMap,
  providerPathByGamePageMap,
  searchGameIdsByGamePageMap,
  searchTextPathByGamePageMap,
} from "../../../../../Utils/GetGamesViewParams";
import { loadMoreSearchGamesAction } from "../../../../../Store/Games/Actions/GamesActions";
import { type IWithGamePage } from "../../../../../Store/Games/Model/Games";
import { type IGameProviderWithCount } from "../../../../../Store/Games/GamesModels";
import { NavLinkToTop } from "../../../../../Components/NavLink/NavLinkToTop";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { prioritizedProvidersByPageSelector } from "../../../../../Store/Games/Selectors/PrioritizedProvidersSelectors";
import { smoothScrollToTop } from "../../../../../Utils/ScrollToTop";
import { ShuffledGameButton } from "../../../Components/ShuffledGameButton/ShuffledGameButton";
import { GameSearch } from "../../Components/GameSearch/GameSearch";
import { StaticGameList } from "../../Components/GameLayout/Games/Search/StaticGameList";

interface IProvidersProps extends IWithGamePage {
  providers: IGameProviderWithCount[];
}

const Providers = memo<IProvidersProps>(({ page, providers }) => (
  <NativeHorizontalScroll>
    <div className={classes.searchProviders}>
      {
        providers.map(({ provider }) => {
          const params = { provider: gameProviderTabs[provider] };

          return (
            <NavLinkToTop
              to={providerPathByGamePageMap[page]}
              params={params}
              className={classes.searchProvider}
              activeClassName={classes.searchProviderActive}
              key={provider}
            >
              <Ellipsis className={classes.searchProviderName}>
                {gameProviderName[provider]}
              </Ellipsis>
            </NavLinkToTop>

          );
        })
      }
    </div>
  </NativeHorizontalScroll>
));
Providers.displayName = "Providers";

const SearchGameList = memo<IWithGamePage>(({ page }) => {
  const [t] = useTranslation();

  const gamesSelector = searchGameIdsByGamePageMap[page];

  const gameIds = useSelector(gamesSelector);

  const additionalLoadingStarted = useSelector(searchAdditionalGamesLoadingStartedSelector);

  const handleLoadMoreClick = useAction(loadMoreSearchGamesAction);

  const isLoadMorePossible = useParamSelector(isLoadMorePossibleForSearchSelector, [page]);

  return (
    <>
      <StaticGameList gameIds={gameIds} page={page} />

      {additionalLoadingStarted ? <Loader /> : null}

      {
        isLoadMorePossible
          ? (
            <Button
              className={classes.button}
              onClick={handleLoadMoreClick}
              disabled={additionalLoadingStarted}
              colorScheme={"blue-gradient"}
            >
              {t(platformui_starzbet_casino_button_loadMore)}
            </Button>
          )
          : null
      }
    </>
  );
});
SearchGameList.displayName = "SearchGameList";

const BaseCasinoSearch = memo<IWithGamePage>(({ page }) => {
  smoothScrollToTop();
  const loading = useSelector(searchGamesLoadingStartedSelector);

  const searchMatch = useRouteMatch<{ searchText: string; }>(searchTextPathByGamePageMap[page]);

  const searchText = searchMatch ? searchMatch.params.searchText : "";
  const [text, setText] = useState(searchText);
  const providersWithCount = useParamSelector(prioritizedProvidersByPageSelector, [page, text]);

  const isEmpty = useSelector(isEmptyGameIdsByGamePageMap[page]);

  const empty = searchText.length < 3 && isEmpty;

  return (
    <div className={classes.search}>
      <GameSearch page={page} text={text} setText={setText} />

      {
        isNotEmpty(providersWithCount)
          ? (
            <Providers page={page} providers={providersWithCount} />)
          : null
      }

      <When condition={!!searchText}>
        <SearchGameList page={page} />
      </When>

      {
        loading
          ? <Loader />
          : (
            <When condition={empty}>
              <Empty messageTKey={platformui_casino_search_empty_thereAreNoGamesForTheSelectedParameter} />
            </When>
          )
      }

      <div className={classes.buttonContainer}>
        <ShuffledGameButton page={page} />
      </div>
    </div>
  );
});
BaseCasinoSearch.displayName = "BaseCasinoSearch";

const CasinoSearch = withProps(BaseCasinoSearch)({ page: EGamePage.CASINO });

const LiveCasinoSearch = withProps(BaseCasinoSearch)({ page: EGamePage.LIVE_CASINO });

const GamesSearch = withProps(BaseCasinoSearch)({ page: EGamePage.GAMES });

export { CasinoSearch, LiveCasinoSearch, GamesSearch };

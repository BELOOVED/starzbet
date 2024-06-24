import { type CSSProperties, memo } from "react";
import { type RouteComponentProps } from "react-router-dom";
import { useActionWithBind, useParamSelector } from "@sb/utils";
import classes from "./Games.module.css";
import { Loader } from "../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { Logger } from "../../../../../../../common/Utils/Logger";
import { tabsToGameProvider, type TGameProviderEnum } from "../../../../../../../common/Store/Provider/ProviderModel";
import { type IWithGamePage } from "../../../../../../Store/Games/Model/Games";
import {
  isLoadMorePossibleForProviderSelector,
  isNilCombineProvidersSelector,
  notNilCombineProvidersSelector,
  providerGamesAdditionalLoadingStartedSelector,
  providerGamesLoadingSucceededSelector,
  providersGamesLayoutSelector,
} from "../../../../../../Store/Games/Selectors/GamesSelectors";
import { concatIdForLoadingSymbol } from "../../../../../../Store/Games/GamesUtils";
import { loadMoreGamesForProvider } from "../../../../../../Store/Games/Actions/GamesActions";
import { GameLoadMoreButton } from "../../../../Components/Games/GameLoadMoreButton/GameLoadMoreButton";
import { GamesRedirect } from "../../../../Desktop/Pages/GamesPage/GamesRedirect";
import { ProviderName } from "../../../../Components/ProviderName/ProviderName";
import { getGamesContainerHeight } from "../../../../Desktop/Components/GameLayout/GameHooks";
import { PositionedGame } from "../Game/Game";
import { useGameWidth } from "./UseGameWidth";

interface IProviderGamesBaseProps extends IWithGamePage {
  provider: TGameProviderEnum;
  withShowAll?: boolean;
}

const ProviderGamesBase = memo<IProviderGamesBaseProps>(({ page, provider, withShowAll }) => {
  const layout = useParamSelector(providersGamesLayoutSelector, [page, provider]);

  const isLoadMorePossible = useParamSelector(isLoadMorePossibleForProviderSelector, [page, provider]);
  const additionalLoadingStarted =
    useParamSelector(providerGamesAdditionalLoadingStartedSelector, [concatIdForLoadingSymbol(provider, page)]);

  const handleLoadMoreClick = useActionWithBind(loadMoreGamesForProvider, page, provider);

  const gameWidth = useGameWidth();
  const height = getGamesContainerHeight(layout, gameWidth);

  const style: CSSProperties = { height };

  return (
    <>
      <ProviderName provider={provider} page={page} withShowAll={withShowAll && isLoadMorePossible} />

      <div className={classes.games} style={style}>
        {layout.map((props) => <PositionedGame page={page} {...props} key={props.id} />)}
      </div>

      {additionalLoadingStarted && <Loader />}

      {
        isLoadMorePossible &&
        <GameLoadMoreButton onClick={handleLoadMoreClick} disabled={additionalLoadingStarted} />
      }
    </>
  );
});
ProviderGamesBase.displayName = "ProviderGamesBase";

const ProviderGamesWithLoading = memo<IProviderGamesBaseProps>(({ page, provider, withShowAll }) => {
  const loadingSucceeded = useParamSelector(providerGamesLoadingSucceededSelector, [concatIdForLoadingSymbol(provider, page)]);

  if (!loadingSucceeded) {
    return <Loader />;
  }

  return (
    <ProviderGamesBase page={page} provider={provider} withShowAll={withShowAll} />
  );
});
ProviderGamesWithLoading.displayName = "ProviderGamesWithLoading";

const CombineProviderGamesWithLoading = memo<IWithGamePage>(({ page }) => {
  const providers = useParamSelector(notNilCombineProvidersSelector, [page]);

  return (
    <div>
      {
        providers.map((provider) => (
          <div className={classes.labelGamesTruncated} key={provider}>
            <ProviderGamesWithLoading
              provider={provider}
              page={page}
              withShowAll
            />
          </div>
        ))
      }
    </div>
  );
});
CombineProviderGamesWithLoading.displayName = "CombineProviderGamesWithLoading";

interface IProviderGamesProps extends IWithGamePage, RouteComponentProps<{
  provider: TGameProviderEnum;
}> {
}

const ProviderGames = memo<IProviderGamesProps>(({ page, match }) => {
  const provider = tabsToGameProvider[match.params.provider];

  if (!provider) {
    Logger.warn.app("[ProviderGameList] unknown provider: ", match.params.provider);

    return <GamesRedirect page={page} />;
  }

  return <ProviderGamesWithLoading page={page} provider={provider} />;
});
ProviderGames.displayName = "ProviderGames";

const CombineProviderGames = memo<IWithGamePage>(({ page }) => {
  const isNil = useParamSelector(isNilCombineProvidersSelector, [page]);
  if (isNil) {
    return <GamesRedirect page={page} />;
  }

  return <CombineProviderGamesWithLoading page={page} />;
});
CombineProviderGames.displayName = "CombineProviderGames";

export { ProviderGames, CombineProviderGames };

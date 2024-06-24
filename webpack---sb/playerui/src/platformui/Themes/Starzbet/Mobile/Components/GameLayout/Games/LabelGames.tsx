import { type CSSProperties, memo } from "react";
import { type RouteComponentProps } from "react-router-dom";
import { isEmpty, useActionWithBind, useParamSelector } from "@sb/utils";
import classes from "./Games.module.css";
import { Loader } from "../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { type IWithGamePage } from "../../../../../../Store/Games/Model/Games";
import {
  isLoadMorePossibleForLabelSelector,
  labelGamesAdditionalLoadingStartedSelector,
  labelGamesLayoutSelector,
  labelGamesLoadingSucceededSelector,
} from "../../../../../../Store/Games/Selectors/GamesSelectors";
import { concatIdForLoadingSymbol } from "../../../../../../Store/Games/GamesUtils";
import { loadMoreGamesForLabel } from "../../../../../../Store/Games/Actions/GamesActions";
import { GameLoadMoreButton } from "../../../../Components/Games/GameLoadMoreButton/GameLoadMoreButton";
import { NoGamesAvailable } from "../../../../Components/NoGamesAvailable/NoAvalibleGames";
import { getGamesContainerHeight } from "../../../../Desktop/Components/GameLayout/GameHooks";
import { PositionedGame } from "../Game/Game";
import { useGameWidth } from "./UseGameWidth";

interface ILabelBaseProps extends IWithGamePage {
  labelId: string;
}

const LabelGamesBase = memo<ILabelBaseProps>(({ page, labelId }) => {
  const layout = useParamSelector(labelGamesLayoutSelector, [page, labelId]);
  const isLoadMorePossible = useParamSelector(isLoadMorePossibleForLabelSelector, [page, labelId]);
  const additionalLoadingStarted =
    useParamSelector(labelGamesAdditionalLoadingStartedSelector, [concatIdForLoadingSymbol(labelId, page)]);

  const handleLoadMoreClick = useActionWithBind(loadMoreGamesForLabel, page, labelId);
  const gameWidth = useGameWidth();
  const height = getGamesContainerHeight(layout, gameWidth);

  const style: CSSProperties = { height };

  return (
    <>
      <div className={classes.games} style={style}>
        {layout.map((props) => <PositionedGame page={page} {...props} key={props.id} />)}
      </div>

      {additionalLoadingStarted && <Loader />}

      {!additionalLoadingStarted && isEmpty(layout) ? <NoGamesAvailable /> : null}

      {
        isLoadMorePossible &&
        <GameLoadMoreButton onClick={handleLoadMoreClick} disabled={additionalLoadingStarted} />
      }
    </>
  );
});
LabelGamesBase.displayName = "LabelGamesBase";

interface ILabelGamesProps extends IWithGamePage, RouteComponentProps<{ labelId: string; }> {
}

const LabelGames = memo<ILabelGamesProps>(({ match: { params: { labelId } }, page }) => {
  const loadingSucceeded = useParamSelector(labelGamesLoadingSucceededSelector, [concatIdForLoadingSymbol(labelId, page)]);

  if (!loadingSucceeded) {
    return <Loader />;
  }

  return (
    <LabelGamesBase page={page} labelId={labelId} />
  );
});
LabelGames.displayName = "LabelGames";

export { LabelGames };

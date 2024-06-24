import { memo } from "react";
import { type ShortLayout, useParamSelector } from "@sb/utils";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import classes from "./Game.module.css";
import { assertNotNilGameByIdSelector, isFavEnabledForPageSelector } from "../../../../../../Store/Games/Selectors/GamesSelectors";
import { gameView, type TGameView } from "../../../../../../Utils/GetGamesViewParams";
import { getImageSizeByGridSize, type IWithGamePage } from "../../../../../../Store/Games/Model/Games";
import { LazyGameImage } from "../../../../../../Components/LazyImage/LazyProgressiveImage";
import { type TInfoParam } from "../../../../../../Store/Games/GamesUtils";
import { DgaGame } from "../../../../Desktop/Components/GameLayout/DgaGame/DgaGame";
import { GameOverlay } from "../../../../Components/GameOverlay/GameOverlay";
import { GameBottomInfo } from "../../../../Components/GameInfoBottom/GameBottomInfo";
import {
  getGameIMGHeight,
  getGameIMGWidth,
  getStylePositionedGameContainer,
  X_MARGIN_SUM_IN_ONE_GAME_CONTAINER,
} from "../../../../Desktop/Components/GameLayout/GameHooks";
import { useGameWidth } from "../Games/UseGameWidth";

interface IBaseGameProps extends TGameView {
  imageSize: EPlatform_ImageSize;
  game: TPlatform_Game_Fragment;
  isFavEnabled: boolean;
  gameHeight: number;
  gameWidth: number;
}

const BaseGame = memo<IBaseGameProps>(({
  imageSize,
  game,
  gameHeight,
  gameWidth,
  ...rest
}) => {
  const param: TInfoParam = imageSize === EPlatform_ImageSize.size2 ? { width: gameWidth } : { height: gameHeight };

  return (
    <div className={classes.gameContainer}>
      <div className={classes.item}>
        <div className={classes.inner}>
          <DgaGame id={game.externalId} isMobile withDga={game.provider === EProviderCode.PRAGMATIC_PLAY}>
            <LazyGameImage
              size={imageSize}
              previewImages={game.previewImages}
              param={param}
              className={classes.img}
              marginSum={X_MARGIN_SUM_IN_ONE_GAME_CONTAINER}
            />
          </DgaGame>

          <GameOverlay
            id={game.id}
            gameName={game.name}
            isDemoAvailable={game.isDemoAvailable}
            {...rest}
          />
        </div>
      </div>

      <GameBottomInfo name={game.name} providerCode={game.provider} size={imageSize} />
    </div>
  );
});
BaseGame.displayName = "BaseGame";

interface IPositionedGameProps extends IWithGamePage, ShortLayout {
}

const PositionedGame = memo<IPositionedGameProps>(({
  page,
  i,
  x,
  y,
  w,
  h,
}) => {
  const game = useParamSelector(assertNotNilGameByIdSelector, [i]);
  const isFavEnabled = useParamSelector(isFavEnabledForPageSelector, [page]);

  const option = gameView[page];
  const imgSize = getImageSizeByGridSize(w, h);

  const gameContainerWidth = useGameWidth();

  const style = getStylePositionedGameContainer({
    x,
    y,
    w,
    h,
    gameContainerWidth,
  });

  return (
    <div className={classes.positioned} style={style}>
      <BaseGame
        gameHeight={getGameIMGHeight(style.height, getImageSizeByGridSize(w, h))}
        gameWidth={getGameIMGWidth(style.width)}
        {...option}
        game={game}
        isFavEnabled={isFavEnabled}
        imageSize={imgSize}
      />
    </div>
  );
});
PositionedGame.displayName = "PositionedGame";

export { PositionedGame };


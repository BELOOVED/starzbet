/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import { type CSSProperties, memo } from "react";
import { useSelector } from "react-redux";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./BaseGame.module.css";
import { isMobileSelector } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { type TGameView } from "../../../../../../Utils/GetGamesViewParams";
import { LazyGameImage } from "../../../../../../Components/LazyImage/LazyProgressiveImage";
import { type TInfoParam } from "../../../../../../Store/Games/GamesUtils";
import { getXMarginSumInOneGameContainer } from "../../../../../Baywin/Desktop/Components/GameLayout/GameHooks";
import { GameBottomInfo } from "../../../../Components/GameInfoBottom/GameBottomInfo";
import { GameOverlay } from "../../../../Components/GameOverlay/GameOverlay";
import { DgaGame } from "../DgaGame/DgaGame";

interface IBaseGameProps extends TGameView {
  game: TPlatform_Game_Fragment;
  imageSize: EPlatform_ImageSize;
  className?: string;
  isSecondView?: boolean;
  isFavEnabled: boolean;
  wrapperStyles?: CSSProperties;
  containerClassName?: string;
  gameHeight: number;
  gameWidth: number;
}

const BaseGame = memo<IBaseGameProps>(({
  imageSize,
  game,
  className,
  wrapperStyles,
  containerClassName,
  gameHeight,
  gameWidth,
  ...rest
}) => {
  const param: TInfoParam = imageSize === EPlatform_ImageSize.size2 ? { width: gameWidth } : { height: gameHeight };
  const isMobile = useSelector(isMobileSelector);

  return (
    <div className={clsx(classes.gameContainer, containerClassName)} style={wrapperStyles}>
      <div className={clsx(classes.item, className)}>
        <div className={classes.inner}>
          <DgaGame id={game.externalId} withDga={game.provider === EProviderCode.PRAGMATIC_PLAY}>
            <div
              className={clsx(classes.background, imageSize === EPlatform_ImageSize.size4 && classes.backgroundSize4)}
              style={param}
            >
              <LazyGameImage
                size={imageSize}
                previewImages={game.previewImages}
                param={param}
                className={classes.img}
                marginSum={getXMarginSumInOneGameContainer(isMobile)}
              />
            </div>
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

export { BaseGame };

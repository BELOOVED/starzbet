/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import { memo } from "react";
import { type TNullable } from "@sb/utils";
import { type EPlatform_ImageSize } from "@sb/graphql-client";
import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import noimage from "../../../../../Assets-Optimized/Images/noimage.png";
import classes from "./Search.module.css";
import { gameProviderName, isGameProvider } from "../../../../../../../../common/Store/Provider/ProviderModel";
import { type TGameView } from "../../../../../../../Utils/GetGamesViewParams";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { TranslateRecord } from "../../../../../../../Components/TranslateRecord/TranslateRecord";
import { LazyGameImage } from "../../../../../../../Components/LazyImage/LazyProgressiveImage";
import { GameOverlay } from "./GameOverlay/GameOverlay";

interface IGameImageProps {
  info: TNullable<{ src: string; alt: string; }>;
}

const GameImage = memo<IGameImageProps>(
  ({ info }) => info
    ? (
      <img
        className={classes.background}
        src={info.src}
        alt={info.alt}
        loading={"lazy"}
        width={"60px"}
        height={"60px"}
      />
    )
    : (
      <img
        className={classes.background}
        src={noimage}
        alt={"noimage"}
        loading={"lazy"}
        width={"60px"}
        height={"60px"}
      />
    ),
);
GameImage.displayName = "GameImage";

interface IBaseGameProps extends TGameView {
  game: TPlatform_Game_Fragment;
  imageSize: EPlatform_ImageSize;
  className?: string;
  isSecondView?: boolean;
}

const param = { height: 60 };

const BaseGame = memo<IBaseGameProps>(({
  imageSize,
  game,
  className,
  ...rest
}) => (
  <div className={classes.gameContainer}>
    <div className={clsx(classes.item, className)}>
      <div className={classes.inner}>
        <LazyGameImage
          marginSum={0}
          size={imageSize}
          previewImages={game.previewImages}
          param={param}
          className={classes.gameImg}
        />

        <GameOverlay
          id={game.id}
          gameName={game.name}
          isDemoAvailable={game.isDemoAvailable}
          {...rest}
        />
      </div>
    </div>

    <div className={classes.gameBottomInfo}>
      <Ellipsis className={classes.gameName}>
        <TranslateRecord record={game.name} />
      </Ellipsis>

      {
        isGameProvider(game.provider)
          ? (
            <Ellipsis className={classes.providerName}>
              {gameProviderName[game.provider]}
            </Ellipsis>
          )
          : null
      }
    </div>
  </div>
));
BaseGame.displayName = "BaseGame";

export { BaseGame };

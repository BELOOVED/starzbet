import clsx from "clsx";
import { type JSX, memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_gameInfoDrawer_demo } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotVoid, type TVoidFn, useActionWithBind, useClickOutside, useParamSelector, withStopPropagation } from "@sb/utils";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { loggedSelector } from "@sb/auth";
import classes from "./GameOverlay.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { FavIcon } from "../../../../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/FavIcon/FavIcon";
import { When } from "../../../../../../../../../common/Components/When";
import { useLocalizedPushPath } from "../../../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { type TGameView } from "../../../../../../../../Utils/GetGamesViewParams";
import { useOpenDemoGame, useOpenGame } from "../../../../../../../../Hooks/UseOpenGame";
import { routeMap } from "../../../../../../../../RouteMap/RouteMap";
import { PlayIcon } from "../../../../../../Components/Icons/PlayIcon/PlayIcon";

const Favorite = memo<IWithId & IWithClassName & TGameView>(({
  currentSelector,
  id,
  toggleFavActionCreator,
  className,
}) => {
  const current = useParamSelector(currentSelector, [id]);

  const toggleFavourite = useActionWithBind(toggleFavActionCreator, id);

  return (
    <button className={classes.favButton} onClick={toggleFavourite}>
      <FavIcon
        width={24}
        height={24}
        active={isNotVoid(current)}
        className={className}
        onClick={withStopPropagation(toggleFavourite)}
      />
    </button>
  );
});
Favorite.displayName = "Favorite";

interface IOverlay {
  DemoButton: JSX.Element | null;
  onPlay: TVoidFn;
  isVisibleOnClick?: boolean;
}

const Overlay = memo<IOverlay>(({
  DemoButton,
  isVisibleOnClick = IS_MOBILE_CLIENT_SIDE,
  onPlay,
}) => {
  const [isVisible, setIsVisible] = useState(!isVisibleOnClick);
  const ref = useClickOutside<HTMLDivElement>(() => isVisibleOnClick ? setIsVisible(false) : void 0);

  const onClick = isVisibleOnClick ? () => setIsVisible(true) : () => void 0;

  return (
    <div className={classes.gameOverlay} onClick={onClick} ref={ref}>
      <div className={classes.border} />

      <div className={classes.overlay} />

      <div className={clsx(classes.buttons, !DemoButton && classes.buttonPlayWithoutDemo)}>
        {
          isVisible
            ? (
              <>
                <button className={classes.buttonPlay} onClick={onPlay}>
                  <PlayIcon color={"active"} size={"m"} />
                </button>

                <div>
                  {DemoButton}
                </div>
              </>
            )
            : null
        }
      </div>
    </div>
  );
});
Overlay.displayName = "Overlay";

interface IGameOverlay extends IWithId {
  gameName: TTranslateRecord_Fragment[];
  isDemoAvailable: boolean;
}

const GameOverlay = memo<IGameOverlay>(({
  id,
  isDemoAvailable,
}) => {
  const [t] = useTranslation();

  const openGame = useOpenGame(id);

  const handleDemoClick = useOpenDemoGame(id);

  const isLogged = useSelector(loggedSelector);

  const openLogin = useLocalizedPushPath(routeMap.loginRoute);

  const handleClick = useCallback(
    () => {
      if (isLogged) {
        openGame();
      } else {
        openLogin();
      }
    },
    [isLogged],
  );

  const DemoButton = (
    <When condition={isDemoAvailable ?? false}>
      <button className={classes.buttonDemoPlay} onClick={handleDemoClick}>
        <span className={classes.buttonDemoPlayContent}>
          {t(platformui_starzbet_gameInfoDrawer_demo)}
        </span>
      </button>
    </When>
  );

  return (
    <Overlay
      onPlay={handleClick}
      DemoButton={DemoButton}
    />
  );
});
GameOverlay.displayName = "GameOverlay";

export {
  GameOverlay,
};

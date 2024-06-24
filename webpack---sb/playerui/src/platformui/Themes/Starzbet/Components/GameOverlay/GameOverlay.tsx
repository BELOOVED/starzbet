import clsx from "clsx";
import { memo, useCallback, useState, type JSX } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_gameInfoDrawer_demoPlay } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotVoid, type TVoidFn, useActionWithBind, useClickOutside, useParamSelector, withStopPropagation } from "@sb/utils";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { loggedSelector } from "@sb/auth";
import classes from "./GameOverlay.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../common/Components/When";
import { FavIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/FavIcon/FavIcon";
import { useModalOpenAction } from "../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../common/Store/Modal/Model/EModal";
import { useLocalizedPushPath } from "../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { useOpenDemoGame, useOpenGame } from "../../../../Hooks/UseOpenGame";
import { type TGameView } from "../../../../Utils/GetGamesViewParams";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { Button } from "../../Desktop/Components/Button/Button";
import { PlayIcon } from "../Icons/PlayIcon/PlayIcon";

const Favorite = memo<IWithId & IWithClassName & TGameView>(({
  currentSelector,
  id,
  toggleFavActionCreator,
  className,
}) => {
  const current = useParamSelector(currentSelector, [id]);

  const toggleFavourite = useActionWithBind(toggleFavActionCreator, id);

  return (
    <Button className={classes.favButton} onClick={toggleFavourite}>
      <FavIcon
        width={18}
        height={18}
        active={isNotVoid(current)}
        className={className}
        onClick={withStopPropagation(toggleFavourite)}
      />
    </Button>
  );
});
Favorite.displayName = "Favorite";

interface IOverlay {
  Fav: JSX.Element | null;
  DemoButton: JSX.Element | null;
  onPlay: TVoidFn;
  isVisibleOnClick?: boolean;
}

const Overlay = memo<IOverlay>(({
  Fav,
  DemoButton,
  isVisibleOnClick = IS_MOBILE_CLIENT_SIDE,
  onPlay,
}) => {
  const [isVisible, setIsVisible] = useState(!isVisibleOnClick);
  const ref = useClickOutside<HTMLDivElement>(() => isVisibleOnClick ? setIsVisible(false) : void 0);

  const onClick = isVisibleOnClick ? () => setIsVisible(true) : () => void 0;

  return (
    <div className={clsx(classes.gameOverlay, isVisible && classes.gameOverlayVisible)} onClick={onClick} ref={ref}>
      {
        isVisible
          ? (
            <>
              <div>
                {Fav}
              </div>

              <Button className={classes.buttonPlay} onClick={onPlay}>
                <PlayIcon color={"white"} size={"l"} />
              </Button>

              <div>
                {DemoButton}
              </div>
            </>
          )
          : null
      }
    </div>
  );
});
Overlay.displayName = "Overlay";

interface IGameOverlay extends IWithId, TGameView {
  gameName: TTranslateRecord_Fragment[];
  isFavEnabled: boolean;
  isDemoAvailable: boolean;
}

const GameOverlay = memo<IGameOverlay>(({
  currentSelector,
  toggleFavActionCreator,
  id,
  isFavEnabled,
  isDemoAvailable,
}) => {
  const [t] = useTranslation();

  const openGame = useOpenGame(id);

  const handleDemoClick = useOpenDemoGame(id);

  const isLogged = useSelector(loggedSelector);

  const openLoginModal = useModalOpenAction(EModal.auth);
  const goToLogin = useLocalizedPushPath(routeMap.loginRoute);

  const handleClick = useCallback(
    () => {
      if (isLogged) {
        openGame();
      } else if (IS_MOBILE_CLIENT_SIDE) {
        goToLogin();
      } else {
        openLoginModal();
      }
    },
    [isLogged],
  );

  const Fav = isFavEnabled
    ? (
      <Favorite
        id={id}
        currentSelector={currentSelector}
        toggleFavActionCreator={toggleFavActionCreator}
      />
    )
    : null;

  const DemoButton = (
    <When condition={isDemoAvailable ?? false}>
      <Button className={classes.buttonDemoPlay} onClick={handleDemoClick}>
        <span className={classes.buttonDemoPlayContent}>
          {t(platformui_starzbet_gameInfoDrawer_demoPlay)}
        </span>
      </Button>
    </When>
  );

  return (
    <Overlay
      Fav={Fav}
      onPlay={handleClick}
      DemoButton={DemoButton}
    />
  );
});
GameOverlay.displayName = "GameOverlay";

export {
  GameOverlay,
};

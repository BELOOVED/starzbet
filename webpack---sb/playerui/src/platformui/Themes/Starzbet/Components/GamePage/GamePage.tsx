import clsx from "clsx";
import { memo, useEffect } from "react";
import { useParamSelector } from "@sb/utils";
import classes from "./GamePage.module.css";
import { useLogin } from "../../../../../common/Hooks/UseAuth";
import { gameLinkByGameIdSelector, isGameOpenLoginModalSelector } from "../../../../Store/Games/Selectors/GamesSelectors";
import { type EExternalGameId } from "../../../../Store/Games/GamesModels";
import { routeMap } from "../../../../RouteMap/RouteMap";

interface IFrameProps extends IWithClassName {
  url: string;
}

const IFrame = memo<IFrameProps>(({ url, className }) => (
  <div className={clsx(classes.iframeContainer, className)}>
    <iframe
      title={"game"}
      src={url}
      frameBorder={"0"}
      width={"100%"}
      height={"100%"}
      scrolling={"no"}
      referrerPolicy={"no-referrer"}
    />
  </div>
));
IFrame.displayName = "IFrame";

interface IGamePageProps {
  gameId: EExternalGameId;
  containerClassName?: string;
  iframeClassName?: string;
}

const GamePage = memo<IGamePageProps>(({ gameId, containerClassName, iframeClassName }) => {
  const gameLink = useParamSelector(gameLinkByGameIdSelector, [gameId]);
  const isOpenLoginModal = useParamSelector(isGameOpenLoginModalSelector, [gameId]);

  const login = useLogin({ goToRoute: routeMap.root });

  useEffect(
    () => {
      if (isOpenLoginModal) {
        login();
      }
    },
    [isOpenLoginModal],
  );

  return (
    <div className={clsx(gameLink && classes.wrapper)}>
      <div className={containerClassName}>
        {gameLink ? <IFrame url={gameLink} className={iframeClassName} /> : null}
      </div>
    </div>
  );
});
GamePage.displayName = "GamePage";

export { GamePage };

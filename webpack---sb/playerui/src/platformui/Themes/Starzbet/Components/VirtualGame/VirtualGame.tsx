import clsx from "clsx";
import { memo, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { not } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_title_fullScreen } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./VirtualGame.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { RedirectLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { When } from "../../../../../common/Components/When";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { CloseIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon";
import { useLogin } from "../../../../../common/Hooks/UseAuth";
import { playGameLinkLoadedSelector, playGameStateSelectors } from "../../../../Store/PlayGame/PlayGameSelectors";
import {
  isVirtualGameOpenLoginModalSelector,
  virtualGameNameSelector,
} from "../../../../Store/VirtualGame/Selectors/VirtualGameSelectors";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { TranslateRecord } from "../../../../Components/TranslateRecord/TranslateRecord";
import { FullScreenIcon } from "../Icons/FullScreenIcon/FullScreenIcon";

const BaseGameFrame = memo(() => {
  const link = useSelector(playGameStateSelectors.link);

  if (!link) {
    return null;
  }

  return (
    <iframe
      className={classes.iframe}
      src={link}
      referrerPolicy={"no-referrer"}
      title={"game frame"}
      allow={"autoplay; encrypted-media; fullscreen;"}
    />
  );
});
BaseGameFrame.displayName = "BaseGameFrame";

const VirtualGame = memo(() => {
  const [t] = useTranslation();
  const [fullScreenMode, toggleFullScreen] = useReducer(not<boolean>, false);

  const loaded = useSelector(playGameLinkLoadedSelector);
  const shouldOpenModal = useSelector(isVirtualGameOpenLoginModalSelector);
  const gameName = useSelector(virtualGameNameSelector);

  const login = useLogin({ goToRoute: routeMap.root });

  useEffect(
    () => {
      if (shouldOpenModal) {
        login();
      }
    },
    [shouldOpenModal],
  );

  return (
    <div className={clsx(classes.container, fullScreenMode && classes.fullScreen)}>
      <div className={classes.fullScreenControls} onClick={toggleFullScreen}>
        {
          fullScreenMode
            ? (
              <>
                <TranslateRecord record={gameName} />

                <CloseIcon className={classes.icon} />
              </>
            )
            : (
              <>
                {t(platformui_starzbet_title_fullScreen)}

                <FullScreenIcon className={clsx(classes.icon, classes.fullScreenIcon)} />
              </>
            )
        }
      </div>

      <When condition={!loaded}>
        <div className={classes.spinContainer}>
          <Loader />
        </div>
      </When>

      {IS_MOBILE_CLIENT_SIDE && shouldOpenModal ? <RedirectLocalized to={routeMap.loginRoute} /> : null}

      {loaded && !shouldOpenModal ? <BaseGameFrame /> : null}
    </div>
  );
});
VirtualGame.displayName = "VirtualGame";

export { VirtualGame };

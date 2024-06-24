// @ts-nocheck
import classes from "./FullScreenMenu.module.css";
import { useLockBodyScroll } from "../../../../../../../common/Hooks/UseLockBodyScroll";
import { CloseDefaultIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { PageTitle } from "../../../../../../../common/Themes/Starzbet/Components/PageTitle/PageTitle";
import { useLocalizedPushPath } from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { SoccerIcon } from "../../../Components/SportIcon/SoccerIcon/SoccerIcon";

const FullScreenMenu = ({ children, closePath, title }) => {
  const closeHandler = useLocalizedPushPath(closePath);

  useLockBodyScroll();

  return (
    <div className={classes.fullScreenMenu}>
      <div className={classes.title}>
        <PageTitle
          path={routeMap.root}
          tKey={title}
          icon={SoccerIcon}
          className={classes.icon}
        />

        <CloseDefaultIcon className={classes.close} onClick={closeHandler} size={"s"} />
      </div>

      {children}
    </div>
  );
};
FullScreenMenu.displayName = "FullScreenMenu";

export { FullScreenMenu };

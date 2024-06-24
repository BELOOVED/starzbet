// @ts-nocheck
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { withProps } from "@sb/utils";
import {
  sportsbookui_starzbet_button_goBack,
  sportsbookui_starzbet_empty_thereAreNoEventsForTheSelectedParameter,
  sportsbookui_starzbet_eventSuspended_sorryThisEventIsNoLongerAvailable,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./Empty.module.css";
import { LoaderImg } from "../../../../../../../common/Themes/Starzbet/Components/LoaderImg/LoaderImg";
import { useGoBack } from "../../../../../../../common/Hooks/UseGoBack";
import { routeMap } from "../../../../../../RouteMap/RouteMap";

const SuspendMessage = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.emptyContainer}>
      <LoaderImg className={classes.icon} />

      <div className={classes.empty}>
        {t(sportsbookui_starzbet_eventSuspended_sorryThisEventIsNoLongerAvailable)}
      </div>
    </div>
  );
});
SuspendMessage.displayName = "SuspendMessage";

interface IEmpty {
  text: string;
  flag?: boolean;
}

/**
 * @deprecated
 * use javascript/packages/playerui/src/common/Themes/Starzbet/Components/Empty/Empty.tsx instead
 */
const Empty = memo<IEmpty>(({ text, flag }) => {
  const [t] = useTranslation();
  const goBack = useGoBack(routeMap.preLive.root);

  return (
    <div className={classes.emptyContainer}>
      <LoaderImg className={classes.icon} />

      <div className={classes.empty}>
        {t(text)}
      </div>

      {!flag && <div className={classes.goBackButton} onClick={goBack}>{t(sportsbookui_starzbet_button_goBack)}</div>}
    </div>
  );
});
Empty.displayName = "Empty";

const EmptyStub = withProps(Empty)({ text: sportsbookui_starzbet_empty_thereAreNoEventsForTheSelectedParameter });

export {
  Empty,
  EmptyStub,
  SuspendMessage,
};

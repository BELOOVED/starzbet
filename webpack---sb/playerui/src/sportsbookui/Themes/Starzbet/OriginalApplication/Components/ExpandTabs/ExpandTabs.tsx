import { memo } from "react";
import { type TVoidFn, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_marketsWithFilters_button_collapseAll,
  sportsbookui_starzbet_marketsWithFilters_button_expandAll,
  sportsbookui_starzbet_marketsWithFilters_totalMarkets,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./ExpandTabs.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { When } from "../../../../../../common/Components/When";
import { type IWithEventId } from "../../../../../../common/IWith";
import { eventTotalOutcomesByIdSelector } from "../../../../../Store/Feed/Selectors/FeedSelectors";

const toggleAll = (close: boolean) => (prev: Record<number, boolean>) => (
  Object.keys(prev).reduce((acc, index) => ({ ...acc, [index]: !close }), {})
);

interface IExpandTabsProps extends IWithEventId {
  setTabs: TVoidFn;
}

const ExpandTabs = memo<IExpandTabsProps>(({ setTabs, eventId }) => {
  const close = () => setTabs(toggleAll(true));
  const open = () => setTabs(toggleAll(false));

  const totalOutcomes = useParamSelector(eventTotalOutcomesByIdSelector, [eventId]);

  const [t] = useTranslation();

  return (
    <div className={classes.controls}>
      <When condition={!IS_MOBILE_CLIENT_SIDE}>
        <div>
          <span>{`${t(sportsbookui_starzbet_marketsWithFilters_totalMarkets)}:`}</span>

          <span className={classes.totalOutcomes}>{totalOutcomes}</span>
        </div>
      </When>

      <div className={classes.expandTabs}>
        <Button colorScheme={"secondary-grey"} onClick={close}>
          <span>{t(sportsbookui_starzbet_marketsWithFilters_button_collapseAll)}</span>
        </Button>

        <Button colorScheme={"blue-gradient"} onClick={open}>
          <span>{t(sportsbookui_starzbet_marketsWithFilters_button_expandAll)}</span>
        </Button>
      </div>
    </div>

  );
});
ExpandTabs.displayName = "ExpandTabs";

export { ExpandTabs };

import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betConstructor_tab_single,
  sportsbookui_starzbet_betConstructor_title_multi,
  sportsbookui_starzbet_betConstructor_title_system,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BetSlipSecondLineTabs.module.css";
import { availableBetGroupSelector } from "../../../../../../../Store/BetSlip/Selectors/AvailableBetGroupSelector";
import { useBetSlipChangeBetGroupAction } from "../../../../../../../Store/BetSlip/Hooks/UseBetSlipChangeBetGroupAction";
import { EBetGroup } from "../../../../../../../Store/BetSlip/Model/BetGroup";
import { betGroupSelector } from "../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";

const betGroupTKeys = {
  [EBetGroup.single]: sportsbookui_starzbet_betConstructor_tab_single,
  [EBetGroup.multi]: sportsbookui_starzbet_betConstructor_title_multi,
  [EBetGroup.system]: sportsbookui_starzbet_betConstructor_title_system,
};

const BetGroupTabs = memo(() => {
  const availableBetGroup = useSelector(availableBetGroupSelector);
  const handleChange = useBetSlipChangeBetGroupAction();
  const [t] = useTranslation();
  const activeGroup = useSelector(betGroupSelector);
  const onClick = (group: EBetGroup) => () => handleChange(group);

  return (
    <div className={classes.secondLineTabs}>
      {
        Object.values(EBetGroup).map((group) => (
          <button
            data-tab={group}
            key={group}
            className={clsx(classes.tab, activeGroup === group && classes.active)}
            disabled={!availableBetGroup.includes(group)}
            onClick={onClick(group)}
          >
            <Ellipsis>{t(betGroupTKeys[group])}</Ellipsis>
          </button>
        ))
      }
    </div>
  );
});
BetGroupTabs.displayName = "BetGroupTabs";

export { BetGroupTabs };

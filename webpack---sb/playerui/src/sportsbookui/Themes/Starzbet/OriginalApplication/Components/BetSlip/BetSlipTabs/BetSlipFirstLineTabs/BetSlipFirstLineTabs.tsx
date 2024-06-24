import clsx from "clsx";
import { createElement, memo, type MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betSlip_tab_betSlip,
  sportsbookui_starzbet_betSlip_tab_myBets,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { loggedSelector } from "@sb/auth";
import { type TVoidFn, useAction, voidFn } from "@sb/utils";
import classes from "./BetSlipTabs.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { CloseIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { betSlipTabEnum } from "../../../../../../../Store/BetSlip/Model/BetSlipTab";
import { betSlipCompleteSelector, betSlipTabSelector } from "../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { useBetSlipChangeTabAction } from "../../../../../../../Store/BetSlip/Hooks/UseBetSlipChangeTabAction";
import { betSlipCompletePlaceBetAction } from "../../../../../../../Store/BetSlip/BetSlipActions";
import { useBetSlipFinishCompleteAction } from "../../../../../../../Store/BetSlip/Hooks/UseBetSlipFinishCompleteAction";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { CouponIcon } from "../../../Icons/CouponIcon/CouponIcon";
import { CheckedDocIcon } from "../../../Icons/CheckedDocIcon/CheckedDocIcon";

const tabs = [betSlipTabEnum.betConstructor, betSlipTabEnum.myBets];

const keys = {
  [betSlipTabEnum.betConstructor]: sportsbookui_starzbet_betSlip_tab_betSlip,
  [betSlipTabEnum.myBets]: sportsbookui_starzbet_betSlip_tab_myBets,
};

const icons = {
  [betSlipTabEnum.betConstructor]: CouponIcon,
  [betSlipTabEnum.myBets]: CheckedDocIcon,
};

type TBetSlipFirstLineTabsProps = {
  closeButtonHandler?: TVoidFn;
}
const BetSlipFirstLineTabs = memo<TBetSlipFirstLineTabsProps>(
  ({ closeButtonHandler = voidFn }) => {
    const activeTab = useSelector(betSlipTabSelector);
    const [t] = useTranslation();
    const complete = useSelector(betSlipCompleteSelector);
    const reUseAction = useAction(betSlipCompletePlaceBetAction);
    const handleTab = useBetSlipChangeTabAction();
    const handler = useBetSlipFinishCompleteAction();
    const logged = useSelector(loggedSelector);

    const newHandleTab: MouseEventHandler<HTMLButtonElement> = (e) => {
      handleTab(e);
      reUseAction(false);
      handler();
    };

    const tabHandler = complete ? newHandleTab : handleTab;
    const renderTab = (tab: keyof typeof betSlipTabEnum) => {
      const active = activeTab === tab;
      const tabClass = clsx(classes.tab, active && classes.active);

      return (
        <button
          data-tab={tab}
          className={tabClass}
          onClick={tabHandler}
          key={tab}
        >
          {createElement(icons[tab], { orangeGradient: active })}

          <Ellipsis className={classes.tabTitle}>{t(keys[tab])}</Ellipsis>
        </button>
      );
    };

    return (
      <div className={clsx(classes.firstLineTabs, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
        {(logged ? tabs : tabs.slice(0, 1)).map(renderTab)}

        {
          IS_MOBILE_CLIENT_SIDE
            ? (
              <button className={classes.closeButton} onClick={closeButtonHandler}>
                <CloseIcon width={8} height={8} />
              </button>
            )
            : null
        }
      </div>
    );
  },
);
BetSlipFirstLineTabs.displayName = "BetSlipFirstLineTabs";

export { BetSlipFirstLineTabs };

import clsx from "clsx";
import { memo, type MouseEventHandler, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { type TVoidFn, useParamSelector } from "@sb/utils";
import {
  sportsbookui_starzbet_betSlip_cashout_autoCashOut,
  sportsbookui_starzbet_editCashOut_partialCashOut,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./EditCashOut.module.css";
import { cashOutForBetByIdSelector } from "../../../../../../../../../../Store/CashOut/CashOutSelectors";
import { betByIdSelector } from "../../../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { Ellipsis } from "../../../../../../../../../../Components/Ellipsis/Ellipsis";
import { AutoCashOutForm } from "./AutoCashOutForm/AutoCashOutForm";

enum ETabs {
  auto = "auto",
  partial = "partial",
}

const isETab = (value: string): value is ETabs => value in ETabs;

const tabNameMap: Record<ETabs, string> = {
  [ETabs.auto]: sportsbookui_starzbet_betSlip_cashout_autoCashOut,
  [ETabs.partial]: sportsbookui_starzbet_editCashOut_partialCashOut,
};

const useActiveTab = (): [ETabs, MouseEventHandler<HTMLDivElement>] => {
  const [activeTab, setActiveTab] = useState(ETabs.auto);

  const handleTab: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const value = e.currentTarget.dataset.key;

      if (!isETab(value)) {
        throw new Error(`[EditCashOut Tabs Tab useActiveTab], unexpected tab value: ${value}`);
      }

      return setActiveTab(value);
    },
    [setActiveTab],
  );

  return [activeTab, handleTab];
};

const Tab = ({
  children,
  dataKey,
  active,
  onClick,
}) => (
  <div
    data-key={dataKey}
    className={clsx(classes.tab, active && classes.active)}
    onClick={onClick}
  >
    {children}
  </div>
);
Tab.displayName = "Tab";

interface ITabsProps {
  activeTab: ETabs;
  handleTab: TVoidFn;
}

const Tabs = memo<ITabsProps>(({ activeTab, handleTab }) => {
  const [t] = useTranslation();

  const renderTab = useCallback(
    (key: ETabs) => (
      <Tab
        dataKey={key}
        key={key}
        active={activeTab === key}
        onClick={handleTab}
      >
        <Ellipsis>
          {t(tabNameMap[key])}
        </Ellipsis>
      </Tab>
    ),
    [activeTab, handleTab, t],
  );

  return (
    <div className={classes.tabs}>
      {Object.values(ETabs).map(renderTab)}
    </div>
  );
});
Tabs.displayName = "Tabs";

interface IEditCashOutProps {
  betId: string;
}

const EditCashOut = memo<IEditCashOutProps>(({ betId }) => {
  const [activeTab, handleTab] = useActiveTab();

  const cashOut = useParamSelector(cashOutForBetByIdSelector, [betId]);

  const bet = useSelector(betByIdSelector(betId));

  return (
    <div className={classes.editCashOut}>
      <Tabs activeTab={activeTab} handleTab={handleTab} />

      <AutoCashOutForm
        // @ts-ignore
        cashOut={cashOut}
        betId={betId}
        autoCashOut={bet?.autoCashOut}
        auto={activeTab === ETabs.auto}
      />
    </div>
  );
});
EditCashOut.displayName = "EditCashOut";

export { EditCashOut };

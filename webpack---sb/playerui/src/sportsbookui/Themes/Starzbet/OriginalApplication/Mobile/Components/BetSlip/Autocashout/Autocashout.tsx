// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import {
  sportsbookui_starzbet_betSlip_cashout_autoCashOut,
  sportsbookui_starzbet_editCashOut_partialCashOut,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./Autocashout.module.css";
import { modalSelector } from "../../../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { modalCloseAction } from "../../../../../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../../../../../common/Store/Modal/Model/EModal";
import { cashOutForBetByIdSelector } from "../../../../../../../Store/CashOut/CashOutSelectors";
import { betByIdSelector } from "../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import {
  AutoCashOutForm,
} from "../../../../Components/BetSlip/Bet/BetFromFS/BetFooter/CashOutBlock/EditCashOut/AutoCashOutForm/AutoCashOutForm";

const tabs = {
  auto: "auto",
  partial: "partial",
};

const tabKeys = Object.keys(tabs);

const tabName = {
  [tabs.auto]: sportsbookui_starzbet_betSlip_cashout_autoCashOut,
  [tabs.partial]: sportsbookui_starzbet_editCashOut_partialCashOut,
};

const useActiveTab = () => {
  const [activeTab, setActiveTab] = useState(tabs.auto);

  const handleTab = useCallback(
    (e: any) => setActiveTab(e.currentTarget.dataset.key),
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

const Tabs = memo(({ activeTab, handleTab }) => {
  const [t] = useTranslation();

  const renderTab = useCallback(
    (key: any) => (
      <Tab
        dataKey={key}
        key={key}
        active={activeTab === key}
        onClick={handleTab}
      >
        {t(tabName[key])}
      </Tab>
    ),
    [activeTab, handleTab, t],
  );

  return (
    <div className={classes.tabs}>
      {tabKeys.map(renderTab)}
    </div>
  );
});
Tabs.displayName = "Tabs";

const Autocashout = memo(() => {
  const modal = useSelector(modalSelector);

  const dispatch = useDispatch();

  const closeHandler = useCallback(
    () => {
      dispatch(modalCloseAction(EModal.autoCashout));
    },
    [dispatch],
  );

  const [activeTab, handleTab] = useActiveTab();

  const { betId } = modal.autoCashout;

  const cashOut = useParamSelector(cashOutForBetByIdSelector, [betId]);

  const { autoCashOut } = useSelector(betByIdSelector(betId));

  if (!cashOut) {
    closeHandler();

    return null;
  }

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={classes.modalWrapper}>
      <div className={classes.overlay} onClick={closeHandler} />

      {/* eslint-disable-next-line rulesdir/jsx-element-max-length */}
      <div className={classes.modal}>
        <Tabs activeTab={activeTab} handleTab={handleTab} />

        <AutoCashOutForm
          cashOut={cashOut}
          betId={betId}
          autoCashOut={autoCashOut}
          auto={activeTab === tabs.auto}
        />
      </div>
    </div>
  );
});
Autocashout.displayName = "Autocashout";

export { Autocashout };

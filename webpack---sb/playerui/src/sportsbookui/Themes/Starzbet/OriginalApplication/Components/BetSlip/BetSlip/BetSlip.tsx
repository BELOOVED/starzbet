import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useAction, usePersistCallback } from "@sb/utils";
import classes from "./BetSlip.module.css";
import { BaseModalComponent } from "../../../../../../../common/Components/BaseModalComponent/BaseModalComponent";
import { useModalCloseAction } from "../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { betSlipTabEnum } from "../../../../../../Store/BetSlip/Model/BetSlipTab";
import { betSlipTabSelector } from "../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { cancelEditBetAction } from "../../../../../../Store/MyBets/MyBetsActions";
import { BetConstructor } from "../BetConstructor/BetConstructor";
import { MyBets } from "../MyBets/MyBets";
import { BetSlipFirstLineTabs } from "../BetSlipTabs/BetSlipFirstLineTabs/BetSlipFirstLineTabs";

const views = {
  [betSlipTabEnum.betConstructor]: BetConstructor,
  [betSlipTabEnum.myBets]: MyBets,
};

const BetsSlipContent = memo(() => {
  const activeTab: keyof typeof betSlipTabEnum = useSelector(betSlipTabSelector);

  return createElement(views[activeTab]);
});
BetsSlipContent.displayName = "BetsSlipContent";

const BetSlip = memo(() => (
  <div className={classes.betSlip}>
    <BetSlipFirstLineTabs />

    <BetsSlipContent />
  </div>
));
BetSlip.displayName = "BetSlip";

const BetSlipModal = memo(() => {
  const hideModal = useModalCloseAction(EModal.betSlip);
  const cancelEdit = useAction(cancelEditBetAction);

  const closeButtonHandler = usePersistCallback(() => {
    hideModal();
    cancelEdit();
  });

  return (
    <BaseModalComponent
      blur
      overlayBackground={"transparent"}
    >
      <div className={classes.betSlipMobile}>
        <BetSlipFirstLineTabs closeButtonHandler={closeButtonHandler} />

        <BetsSlipContent />
      </div>
    </BaseModalComponent>
  );
});
BetSlipModal.displayName = "BetSlipModal";

export { BetSlip, BetSlipModal };

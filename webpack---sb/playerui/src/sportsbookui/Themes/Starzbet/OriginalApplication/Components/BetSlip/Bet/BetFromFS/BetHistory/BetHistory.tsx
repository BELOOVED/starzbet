import { memo, useCallback } from "react";
import { sportsbookui_starzbet_betSlip_button_betHistory } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction } from "@sb/utils";
import classes from "./BetHistory.module.css";
import { Button } from "../../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { modalOpenAction } from "../../../../../../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../../../../../../common/Store/Modal/Model/EModal";
import { cashOutHistoryByContractSelector } from "../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import type { TBetContract } from "../../../../../../../../Store/MyBets/Model/TBet";

const BetHistoryBase = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();
  const openModal = useAction(modalOpenAction);
  const openBetHistory = useCallback(() => openModal(EModal.betHistory, { betId: id }), [id]);

  return (
    <div className={classes.betHistoryWrapper}>
      <Button
        colorScheme={"blue-gradient"}
        onClick={openBetHistory}
        capitalize
        wide
      >
        <Ellipsis>
          {t(sportsbookui_starzbet_betSlip_button_betHistory)}
        </Ellipsis>
      </Button>
    </div>
  );
});
BetHistoryBase.displayName = "BetHistoryBase";

interface IBetHistoryProps extends IWithId {
  betStatesCount: number;
  contract: TBetContract;
}

const BetHistory = memo<IBetHistoryProps>(({ id, betStatesCount, contract }) => {
  const cashOutHistory = cashOutHistoryByContractSelector(contract);

  if (betStatesCount === 0 && cashOutHistory.length === 0) {
    return null;
  }

  return <BetHistoryBase id={id} />;
});
BetHistory.displayName = "BetHistory";

export { BetHistory };

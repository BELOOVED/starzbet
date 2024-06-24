import { memo } from "react";
import { useSelector } from "react-redux";
import { type IMoney } from "@sb/utils";
import { When } from "../../../../../../../../../common/Components/When";
import { editableBetSelector, editingByBetIdSelector } from "../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { cashOutMoneyMapSelector } from "../../../../../../../../Store/CashOut/CashOutSelectors";
import { SaveChanges } from "../../../../../Mobile/Components/BetSlip/SaveChanges/SaveChanges";
import { CashOutBlock } from "./CashOutBlock/CashOutBlock";

interface IBetFooterProps extends IWithId {
  isDropDown: boolean;
  cashOutAt: number | null;
  totalPayout: IMoney;
}

const BetFooter = memo<IBetFooterProps>(({
  id,
  isDropDown,
  cashOutAt,
  totalPayout,
}) => {
  const editableBet = useSelector(editableBetSelector);
  const editing = useSelector(editingByBetIdSelector(id));
  const cashOutMoneyMap = useSelector(cashOutMoneyMapSelector);

  return (
    <>
      <When condition={!editing && isDropDown}>
        <CashOutBlock
          betId={id}
          cashOutAt={cashOutAt}
          payout={totalPayout}
          cashOut={cashOutMoneyMap[id]}
        />
      </When>

      <SaveChanges
        hasError={!!editableBet?.lastSaveError}
        editing={editing}
        disable={!editableBet?.changed}
      />
    </>
  );
});
BetFooter.displayName = "BetFooter";

export { BetFooter };

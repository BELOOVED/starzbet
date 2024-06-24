// @ts-nocheck
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { oddBoostByEditBetPicksSelector, selectOddBoostByBetId } from "../../Store/OddsBoost/OddsBoostSelectors";

const BoostByBet = ({ betId, children }) => {
  const boost = useParamSelector(selectOddBoostByBetId, [betId]);

  return boost ? children(boost) : null;
};
BoostByBet.displayName = "BoostByBet";

const BoostByCurrentPicks = ({ children }) => {
  const boost = useSelector(oddBoostByEditBetPicksSelector);

  return boost ? children(boost) : null;
};
BoostByCurrentPicks.displayName = "BoostByCurrentPicks";

const BetOddsBoost = ({
  betId,
  isEditing,
  children,
}) => {
  if (isEditing) {
    return (
      <BoostByCurrentPicks>
        {children}
      </BoostByCurrentPicks>
    );
  }

  return (
    <BoostByBet betId={betId}>
      {children}
    </BoostByBet>
  );
};
BetOddsBoost.displayName = "BetOddsBoost";

export { BetOddsBoost };

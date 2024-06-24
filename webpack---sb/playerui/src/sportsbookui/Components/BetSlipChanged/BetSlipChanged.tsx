// @ts-nocheck
import { useSelector } from "react-redux";
import { betSlipChangedSelector } from "../../Store/BetSlip/Selectors/BetSlipChangedSelector";
import { betSlipPlacingSelector } from "../../Store/BetSlip/Selectors/BetSlipSelectors";

const BetSlipChanged = ({ children }) => {
  const changed = useSelector(betSlipChangedSelector);
  const placing = useSelector(betSlipPlacingSelector);

  if (!changed || placing) {
    return null;
  }

  return (
    children
  );
};
BetSlipChanged.displayName = "BetSlipChanged";

export { BetSlipChanged };

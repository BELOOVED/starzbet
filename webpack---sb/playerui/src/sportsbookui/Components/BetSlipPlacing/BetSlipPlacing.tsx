// @ts-nocheck
import { useSelector } from "react-redux";
import { betSlipPlacingSelector } from "../../Store/BetSlip/Selectors/BetSlipSelectors";

const BetSlipPlacing = ({ children }) => {
  const placing = useSelector(betSlipPlacingSelector);

  return (
    children(placing)
  );
};
BetSlipPlacing.displayName = "BetSlipPlacing";

export { BetSlipPlacing };

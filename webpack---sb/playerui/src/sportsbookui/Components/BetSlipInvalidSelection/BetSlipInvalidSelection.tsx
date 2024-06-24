// @ts-nocheck
import { useSelector } from "react-redux";
import { betSlipPlacingSelector } from "../../Store/BetSlip/Selectors/BetSlipSelectors";
import { betSlipInvalidSelectionSelector } from "../../Store/BetSlip/Selectors/BetSlipInvalidSelectionSelector";

const BetSlipInvalidSelection = ({ children }) => {
  const invalid = useSelector(betSlipInvalidSelectionSelector);
  const placing = useSelector(betSlipPlacingSelector);

  if (!invalid || placing) {
    return null;
  }

  return (
    children
  );
};
BetSlipInvalidSelection.displayName = "BetSlipInvalidSelection";

export { BetSlipInvalidSelection };

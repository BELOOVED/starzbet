// @ts-nocheck
import { useSelector } from "react-redux";
import { betSlipInvalidBankerCountSelector } from "../../Store/BetSlip/Selectors/BetSlipInvalidBankerSelector";

const BetSlipInvalidBankerCount = ({ children }) => {
  const invalid = useSelector(betSlipInvalidBankerCountSelector);

  return invalid
    ? children
    : null;
};
BetSlipInvalidBankerCount.displayName = "BetSlipInvalidBankerCount";

export { BetSlipInvalidBankerCount };

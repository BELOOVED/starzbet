import { useSelector } from "react-redux";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { inputBetByActiveBetGroupSelector } from "../Selectors/BetSlipSelectors";
import { currentBetHashViewSelector } from "../Selectors/ViewSelectors/BetSlipViewSelectors";
import { useBetSlipChangeBetAction } from "./UseBetSlipChangeBetAction";

const useStakeInputForGroupParams = () => {
  const input = useSelector(inputBetByActiveBetGroupSelector);
  const currency = useSelector(playerCurrencySelector);
  const hash = useSelector(currentBetHashViewSelector);

  const changeHandle = useBetSlipChangeBetAction(hash, null);

  return {
    input,
    currency,
    changeHandle,
  };
};

export { useStakeInputForGroupParams };

import type { ECurrencyCode } from "@sb/utils";
import { platformConfigSystemCurrencySelector } from "../../Config/Selectors/ConfigSelectors";
import { type IWithConfigState } from "../../Config/ConfigInitialState";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { isNotNilPlayerProfileSelector, profileSelectors } from "./ProfileSelectors";
import { mainBalanceOrNullSelector } from "./MainBalanceOrNullSelector";

const playerCurrencySelector = (state: IWithPlayerState & IWithConfigState):ECurrencyCode => {
  const byWallet = mainBalanceOrNullSelector(state);

  if (byWallet) {
    return byWallet.currency;
  }

  if (isNotNilPlayerProfileSelector(state)) {
    //when platform player loaded
    return profileSelectors.currency(state);
  }

  return platformConfigSystemCurrencySelector(state);
};

export { playerCurrencySelector };

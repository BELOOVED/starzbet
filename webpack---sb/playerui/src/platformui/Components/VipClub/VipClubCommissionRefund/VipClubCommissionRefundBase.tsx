import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { EVipClubCommissionRefundState } from "../../../Store/VipClub/VipClubModels";
import { vipClubCommissionRefundStateSelector } from "../../../Store/VipClub/Selectors/VipClubCommissionRefundSelectors";

interface IVipClubCommissionRefundBaseProps {
  Full: ComponentType;
  Loader: ComponentType;
  Empty: ComponentType;
}

const VipClubCommissionRefundBase = memo<IVipClubCommissionRefundBaseProps>(({ Full, Loader, Empty }) => {
  const state = useSelector(vipClubCommissionRefundStateSelector);

  const stateToComponentMap: Record<EVipClubCommissionRefundState, ComponentType> = {
    [EVipClubCommissionRefundState.loading]: Loader,
    [EVipClubCommissionRefundState.noCommission]: Empty,
    [EVipClubCommissionRefundState.full]: Full,
  };

  return createElement(stateToComponentMap[state]);
});
VipClubCommissionRefundBase.displayName = "VipClubCommissionRefundBase";

export { VipClubCommissionRefundBase };

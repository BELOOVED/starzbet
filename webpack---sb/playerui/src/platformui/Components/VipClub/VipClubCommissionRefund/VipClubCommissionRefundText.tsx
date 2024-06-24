import { useSelector } from "react-redux";
import { type ComponentType, createElement, Fragment, memo } from "react";
import { withProps } from "@sb/utils";
import { vipClubDoCommissionRefundStateSelector } from "../../../Store/VipClub/Selectors/VipClubCommissionRefundSelectors";
import { EVipClubDoCommissionRefundState } from "../../../Store/VipClub/VipClubModels";

interface IVipClubCommissionRefundTextProps extends IWithClassName {
  Loading: ComponentType;
  Success: ComponentType;
  Failed: ComponentType;
  Calculations: ComponentType;
}

const VipClubCommissionRefundText = memo<IVipClubCommissionRefundTextProps>(({
  className,
  Loading,
  Success,
  Failed,
  Calculations,
}) => {
  const state = useSelector(vipClubDoCommissionRefundStateSelector);

  const stateToComponentMap: Record<EVipClubDoCommissionRefundState, ComponentType> = {
    [EVipClubDoCommissionRefundState.loading]: Loading,
    [EVipClubDoCommissionRefundState.success]: Success,
    [EVipClubDoCommissionRefundState.failed]: Failed,
    [EVipClubDoCommissionRefundState.availableForRefund]: Calculations,
    [EVipClubDoCommissionRefundState.notAvailableForRefund]: Calculations,
  };

  const Component = className ? withProps("div")({ className }) : Fragment;

  return (
    <Component>
      {createElement(stateToComponentMap[state])}
    </Component>
  );
});
VipClubCommissionRefundText.displayName = "VipClubCommissionRefundText";

export { VipClubCommissionRefundText };

import { useSelector } from "react-redux";
import { type ButtonHTMLAttributes, type ComponentType, createElement, memo, type PropsWithChildren } from "react";
import { useAction, useActionWithBind } from "@sb/utils";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { vipClubCommissionRefundAction } from "../../../Store/VipClub/VipClubActions";
import { VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL } from "../../../Store/VipClub/VipClubVariables";
import { vipClubDoCommissionRefundStateSelector } from "../../../Store/VipClub/Selectors/VipClubCommissionRefundSelectors";
import { EVipClubDoCommissionRefundState } from "../../../Store/VipClub/VipClubModels";

interface ICommonButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled"> {
  loading?: boolean;
}

interface IButtonProps {
  CommonButton: ComponentType<PropsWithChildren<ICommonButtonProps>>;
  ButtonText: ComponentType;
}

interface IWithState {
  state: EVipClubDoCommissionRefundState;
}

const DoRefundButton = memo<IButtonProps & IWithState>(({ CommonButton, ButtonText, state }) => {
  const doRefund = useAction(vipClubCommissionRefundAction);

  return (
    <CommonButton onClick={doRefund} data-state={state}>
      <ButtonText />
    </CommonButton>
  );
});
DoRefundButton.displayName = "DoRefundButton";

const LoadingButton = memo<IButtonProps & IWithState>(({ CommonButton, ButtonText, state }) => (
  <CommonButton loading data-state={state}>
    <ButtonText />
  </CommonButton>
));
LoadingButton.displayName = "LoadingButton";

const DisabledButton = memo<IButtonProps & IWithState>(({ CommonButton, ButtonText, state }) => (
  <CommonButton disabled data-state={state}>
    <ButtonText />
  </CommonButton>
));
DisabledButton.displayName = "DisabledButton";

const OkButton = memo<IButtonProps & IWithState>(({ CommonButton, ButtonText, state }) => {
  const removeCallManagerSymbol = useActionWithBind(callManagerRemoveSymbolAction, VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL);

  return (
    <CommonButton onClick={removeCallManagerSymbol} data-state={state}>
      <ButtonText />
    </CommonButton>
  );
});
OkButton.displayName = "OkButton";

const STATE_TO_COMPONENT_MAP: Record<EVipClubDoCommissionRefundState, ComponentType<IButtonProps & IWithState>> = {
  [EVipClubDoCommissionRefundState.availableForRefund]: DoRefundButton,
  [EVipClubDoCommissionRefundState.loading]: LoadingButton,
  [EVipClubDoCommissionRefundState.notAvailableForRefund]: DisabledButton,
  [EVipClubDoCommissionRefundState.failed]: OkButton,
  [EVipClubDoCommissionRefundState.success]: OkButton,
};

const VipClubCommissionRefundButtonBase = memo<IButtonProps>(({ CommonButton, ButtonText }) => {
  const state = useSelector(vipClubDoCommissionRefundStateSelector);

  return createElement(STATE_TO_COMPONENT_MAP[state], { CommonButton, ButtonText, state });
});
VipClubCommissionRefundButtonBase.displayName = "VipClubCommissionRefundButtonBase";

export { VipClubCommissionRefundButtonBase };

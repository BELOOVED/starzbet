import { type ComponentType, createElement, memo } from "react";
import { useParamSelector } from "@sb/utils";
import { type IWithDisabled } from "../../../../common/IWith";
import { vipClubBonusCardButtonStateSelector } from "../../../Store/VipClub/Selectors/VipClubBonusSelectors";
import { EVipClubBonusCardButtonState } from "../../../Store/VipClub/VipClubModels";

type TVipClubBonusCardButtonProps = IWithId & IWithDisabled;

type TVipClubBonusCardButton = ComponentType<TVipClubBonusCardButtonProps>

interface IVipClubBonusCardButtonProps extends IWithId, IWithClassName {
  CashbackButton: TVipClubBonusCardButton;
  ClaimButton: TVipClubBonusCardButton;
  ShowClaimRulesButton: TVipClubBonusCardButton;
}

const VipClubBonusCardButton = memo<IVipClubBonusCardButtonProps>(({
  id,
  className,
  CashbackButton,
  ClaimButton,
  ShowClaimRulesButton,
}) => {
  const state = useParamSelector(vipClubBonusCardButtonStateSelector, [id]);

  const BUTTON_STATE_TO_COMPONENT_MAP: Record<EVipClubBonusCardButtonState, TVipClubBonusCardButton> = {
    [EVipClubBonusCardButtonState.cashback]: CashbackButton,
    [EVipClubBonusCardButtonState.disabled]: ClaimButton,
    [EVipClubBonusCardButtonState.showClaimRules]: ShowClaimRulesButton,
    [EVipClubBonusCardButtonState.claim]: ClaimButton,
  };

  const disabled = state === EVipClubBonusCardButtonState.disabled;

  return (
    <div className={className}>
      {createElement(BUTTON_STATE_TO_COMPONENT_MAP[state], { id, disabled })}
    </div>
  );
});
VipClubBonusCardButton.displayName = "VipClubBonusCardButton";

export { VipClubBonusCardButton, type TVipClubBonusCardButtonProps };

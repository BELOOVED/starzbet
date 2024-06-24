import { type ComponentType, createElement, type PropsWithChildren } from "react";
import { type TVoidFn, useActionWithBind, useParamSelector } from "@sb/utils";
import { claimBonusAction } from "../../Store/Bonuses/BonusesActions";
import { availableBonusInfoCommonSelector } from "../../Store/Bonuses/Selectors/BonusesSelectors";
import { claimBonusStartedSelector } from "../../Store/Bonuses/Selectors/BonusCallManagerSelectors";

interface IButtonProps {
  onClick?: TVoidFn;
  loading?: boolean;
  disabled?: boolean;
}

const createClaimAvailableBonusButton = <Props extends IButtonProps>(
  Button: ComponentType<Props>,
): ComponentType<IWithId & PropsWithChildren<Omit<Props, "loading" | "onClick">>> => ({
    id,
    children,
    disabled,
    ...rest
  }) => {
    const claimBonus = useActionWithBind(claimBonusAction, id);
    const pendingClaim = useParamSelector(claimBonusStartedSelector, [id]);

    const { isAvailableForClaim } = useParamSelector(availableBonusInfoCommonSelector, [id]);

    const props = {
      loading: pendingClaim,
      disabled: disabled || !isAvailableForClaim || pendingClaim,
      onClick: claimBonus,
      ...rest,
    } as unknown as Props;

    return createElement(Button, props, children);
  };

export { createClaimAvailableBonusButton };

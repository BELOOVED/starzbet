import { type FC, type ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { type Selector } from "reselect";
import { useParamSelector, withProps } from "@sb/utils";
import { lockedOutcomeSelector } from "../../Store/Feed/Selectors/LockedOutcomeSelector";
import { betSlipPlacingSelector, conflictedPickByOutcomeIdSelector } from "../../Store/BetSlip/Selectors/BetSlipSelectors";
import { disableBetSlipPickSelector } from "../../Store/BetSlip/Hooks/UseDisableBetSlipPickSelector";
import { livePickByOutcomeIdSelector } from "../../Store/Feed/Selectors/LivePickByOutcomeIdSelector";
import { betSlipConflictedWithBonusErrorPickSelector } from "../../Store/BetSlip/Selectors/BetSlipConflictedWithBonusErrorPickSelector";
import { type TMixAppState } from "../../Store/CreateMixInitialState";

interface IBasePickStateProps {
  outcomeId: string;
  conflictedSelector: Selector<TMixAppState, boolean, [outcomeId: string]>;
  children: (conflicted: boolean, locked: boolean, live: boolean, disable: boolean) => ReactElement;
}

const BasePickState: FC<IBasePickStateProps> = ({
  outcomeId,
  children,
  conflictedSelector,
}) => {
  const conflicted = useParamSelector(conflictedSelector, [outcomeId]);
  const locked = useParamSelector(lockedOutcomeSelector, [outcomeId]);
  const disable = useParamSelector(disableBetSlipPickSelector, [outcomeId]);
  const live = useParamSelector(livePickByOutcomeIdSelector, [outcomeId]);
  const placing = useSelector(betSlipPlacingSelector);

  const currentRender = children(conflicted, locked, live, disable);
  const prevRender = useRef(currentRender);

  useEffect(
    () => {
      if (!placing) {
        prevRender.current = currentRender;
      }
    },
    [placing, currentRender],
  );

  return (
    placing
      ? prevRender.current
      : currentRender
  );
};
BasePickState.displayName = "BasePickState";

const PickState = withProps(BasePickState)({ conflictedSelector: conflictedPickByOutcomeIdSelector });
const PickStateWithBonus = withProps(BasePickState)({ conflictedSelector: betSlipConflictedWithBonusErrorPickSelector });

export { PickState, PickStateWithBonus };

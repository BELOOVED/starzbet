import { type ComponentType, createElement, type Dispatch, type FC, type PropsWithChildren, type SetStateAction } from "react";
import { useSelector } from "react-redux";
import { isNotNil } from "@sb/utils";
import { betSlipCompleteSelector, countPicksSelector } from "../../Store/BetSlip/Selectors/BetSlipSelectors";

type TWithSetIsCashOuted = {
  setIsCashOuted?: Dispatch<SetStateAction<boolean>>;
}

type TBetSlipContentProps = PropsWithChildren<{
  completed?: ComponentType | null;
  empty: ComponentType<TWithSetIsCashOuted>;
} & TWithSetIsCashOuted>

const BetSlipContent: FC<TBetSlipContentProps> = ({
  empty,
  completed = null,
  children,
  setIsCashOuted,
}) => {
  const count = useSelector(countPicksSelector);
  const complete: boolean = useSelector(betSlipCompleteSelector);

  if (isNotNil(completed) && complete) {
    return createElement(completed);
  }

  if (complete) {
    return null;
  }

  return count === 0
    ? createElement(empty, { setIsCashOuted })
    : <>{children}</>;
};
BetSlipContent.displayName = "BetSlipContent";

export { BetSlipContent };

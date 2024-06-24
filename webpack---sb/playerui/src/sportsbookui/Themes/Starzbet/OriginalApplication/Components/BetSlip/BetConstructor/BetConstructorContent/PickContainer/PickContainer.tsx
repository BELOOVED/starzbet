import clsx from "clsx";
import { type ReactNode } from "react";
import classes from "./PickContainer.module.css";
import { PickStateWithBonus } from "../../../../../../../../Components/PickState/PickState";
import { type TWithOutcomeId } from "../TBetConstructorContent";

type TWithChildren = {
  children: (live: boolean, disable: boolean) => ReactNode;
}
const PickContainer = ({
  outcomeId,
  children,
}: TWithChildren & TWithOutcomeId) => (
  <PickStateWithBonus outcomeId={outcomeId}>
    {
      (conflicted, locked: boolean, live: boolean, disable: boolean) => {
        const className = clsx(
          classes.pickContainer,
          conflicted && classes.conflicted,
          disable && classes.disable,
          locked && classes.locked,
        );

        return (
          <div className={className}>
            {children(live, disable)}
          </div>
        );
      }
    }
  </PickStateWithBonus>
);
PickContainer.displayName = "PickContainer";

export { PickContainer };

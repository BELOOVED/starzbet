import { memo, type ReactNode } from "react";
import { type TVoidFn } from "@sb/utils";
import classes from "./BetSlipToggle.module.css";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { BetConstructorCheckbox } from "../../BetConstructor/BetConstructorCheckbox/BetConstructorCheckbox";

interface IBetSlipToggleProps {
  onChange: TVoidFn;
  checked: boolean;
  label: ReactNode;
  postfix?: ReactNode;
}

const BetSlipToggle = memo<IBetSlipToggleProps>((
  {
    onChange,
    label,
    postfix,
    checked,
  },
) => (
  <div className={classes.bonusToggle}>
    <div className={classes.input} onClick={onChange}>
      <BetConstructorCheckbox checked={checked} />

      <Ellipsis className={classes.label}>
        {label}
      </Ellipsis>
    </div>

    <Ellipsis className={classes.postfix}>
      {postfix}
    </Ellipsis>
  </div>
));
BetSlipToggle.displayName = "BetSlipToggle";

export { BetSlipToggle };

import clsx from "clsx";
import { memo } from "react";
import { type Selector } from "react-redux";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import { type TNil } from "@sb/utils";
import classes from "./Counter.module.css";
import { SelectorCounter } from "../../../../../common/Components/SelectorCounter/SelectorCounter";
import { type TPlatformAppState } from "../../../../Store/PlatformInitialState";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";

interface ICounterProps extends IWithClassName, IWithQaAttribute {
  selector: Selector<TPlatformAppState, number | TNil>;
}

const Counter = memo<ICounterProps>(({ selector, className, qaAttribute }) => (
  <SelectorCounter selector={selector}>
    {
      (counter) => (
        <div className={clsx(classes.counter, className)} {...qaAttr(qaAttribute)}>
          <Ellipsis className={classes.counterText}>{counter}</Ellipsis>
        </div>
      )
    }
  </SelectorCounter>
));
Counter.displayName = "Counter";

export { Counter };

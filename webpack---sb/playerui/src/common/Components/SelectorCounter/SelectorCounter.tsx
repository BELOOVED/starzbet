import { type FC, type ReactNode } from "react";
import { type Selector, useSelector } from "react-redux";
import { isNil, type TNil } from "@sb/utils";
import { type TPlatformAppState } from "../../../platformui/Store/PlatformInitialState";

interface ISelectorCounterProps {
  selector: Selector<TPlatformAppState, number | TNil>;
  children: (counter: number) => ReactNode;
}

const SelectorCounter: FC<ISelectorCounterProps> = ({ children, selector }) => {
  const counter = useSelector(selector);

  return (isNil(counter) || counter === 0)
    ? null
    : <>{children(counter)}</>;
};
SelectorCounter.displayName = "SelectorCounter";

export { SelectorCounter };

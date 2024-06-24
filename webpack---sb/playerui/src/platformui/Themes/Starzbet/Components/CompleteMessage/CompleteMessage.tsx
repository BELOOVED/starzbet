import { memo, type ReactNode } from "react";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./CompleteMessage.module.css";
import { CheckIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/CheckIcon/CheckIcon";

interface ICompleteMessageProps extends IWithQaAttribute {
  reason: ReactNode;
}

const CompleteMessage = memo<ICompleteMessageProps>(({ reason, qaAttribute }) => (
  <div className={classes.existingLimit}>
    <CheckIcon color={"green"} className={classes.icon} />

    <div {...qaAttr(qaAttribute)}>{reason}</div>
  </div>
));
CompleteMessage.displayName = "CompleteMessage";

export { CompleteMessage };

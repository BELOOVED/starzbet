import { memo, type ReactNode } from "react";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./WarningCard.module.css";

interface IWarningCardProps {
  text: ReactNode;
}

const WarningCard = memo<IWarningCardProps>(({ text }) => (
  <div className={classes.warningCard}>
    <div className={classes.errorImage} />

    <div className={classes.warningText} {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitMessage)}>
      {text}
    </div>
  </div>
));
WarningCard.displayName = "WarningCard";

export { WarningCard };

import clsx from "clsx";
import { memo } from "react";
import classes from "./BonusTemplate.module.css";
import {
  BonusTemplate as BonusTemplateBase,
  type IBonusTemplateProps,
} from "../../../../../Components/BonusTemplate/BonusTemplate";

/**
 * BonusTemplate for starzBet theme with enhanced styles
 */
const BonusTemplate = memo<IBonusTemplateProps>(({ className, ...props }) => (
  <BonusTemplateBase {...props} className={clsx(className, classes.bonusTemplate)} />
));
BonusTemplate.displayName = "BonusTemplate";

export { BonusTemplate };

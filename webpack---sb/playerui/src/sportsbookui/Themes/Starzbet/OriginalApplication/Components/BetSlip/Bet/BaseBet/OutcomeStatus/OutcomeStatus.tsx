import { memo } from "react";
import { type EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { useTranslation } from "@sb/translator";
import classes from "./OutcomeStatus.module.css";
import { pickResultTKeys } from "../../../../../../../../Store/MyBets/Model/PickResult";

interface IOutcomeStatusProps {
  result: EOutcomeResult | string | null; // string | null for TSportsbook_OutrightPick_Fragment, maybe incorrect
}

const OutcomeStatus = memo<IOutcomeStatusProps>(({ result }) => {
  const [t] = useTranslation();

  return (
    <div className={`${classes.pickStatus} ${classes[result]}`}>
      <div className={classes.statusText}>
        {t(pickResultTKeys[result])}
      </div>
    </div>
  );
});
OutcomeStatus.displayName = "OutcomeStatus";

export { OutcomeStatus };

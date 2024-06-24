// @ts-nocheck
import { memo } from "react";
import { useTranslation, type TTFuncParameters } from "@sb/translator";
import {
  sportsbookui_starzbet_betSlip_warning_title_multipleOptionsAreRestrictedForTheHighlightedSelections,
  sportsbookui_starzbet_betSlip_warning_title_theNumberOfSelectionsIsIncorrect,
  sportsbookui_starzbet_betSlip_warning_title_theOddsMarketsOrAvailabilityOfYourBetHasChanged,
  sportsbookui_starzbet_betSlip_warning_title_tooManySelectionsNominatedAsBankers,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./Warnings.module.css";
import { BetSlipError } from "../../../../../../../../Components/BetSlipError/BetSlipError";
import { PicksAreExceeded } from "../../../../../../../../Components/PicksAreExceeded/PicksAreExceeded";
import { BetSlipChanged } from "../../../../../../../../Components/BetSlipChanged/BetSlipChanged";
import { BetSlipInvalidSelection } from "../../../../../../../../Components/BetSlipInvalidSelection/BetSlipInvalidSelection";
import { BetSlipInvalidBankerCount } from "../../../../../../../../Components/BetSlipInvalidBankerCount/BetSlipInvalidBankerCount";
import { BetSlipConflictedWithBonus } from "../../../../../../../../Components/BetSlipConflicted/BetSlipConflictedWithBonus";
import { WarningIcon } from "../../../../Icons/WarningIcon/WarningIcon";
import { ErrorIcon } from "../../../../Icons/ErrorIcon/ErrorIcon";

const conflictedTKey: TTFuncParameters =
  [sportsbookui_starzbet_betSlip_warning_title_multipleOptionsAreRestrictedForTheHighlightedSelections];

const PickConflicted = memo(() => {
  const [t] = useTranslation();

  return (
    <BetSlipConflictedWithBonus
      conflictedTKey={conflictedTKey}
    >
      {
        (tKey) => (
          <div className={classes.conflicted}>
            <ErrorIcon size={"m"} className={classes.icon} />

            {t(...tKey)}
          </div>
        )
      }
    </BetSlipConflictedWithBonus>
  );
});
PickConflicted.displayName = "PickConflicted";

const Warnings = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <BetSlipError>
        {
          (error) => (
            <div className={classes.error}>
              <ErrorIcon className={classes.icon} size={"m"} />

              {error}
            </div>
          )
        }
      </BetSlipError>

      <PicksAreExceeded>
        {(text) => (<div className={classes.limit}>{text}</div>)}
      </PicksAreExceeded>

      <PickConflicted />

      <BetSlipChanged>
        <div className={classes.changed}>
          <WarningIcon className={classes.icon} size={"m"} />

          {t(sportsbookui_starzbet_betSlip_warning_title_theOddsMarketsOrAvailabilityOfYourBetHasChanged)}
        </div>
      </BetSlipChanged>

      <BetSlipInvalidSelection>
        <div className={classes.changed}>
          {t(sportsbookui_starzbet_betSlip_warning_title_theNumberOfSelectionsIsIncorrect)}
        </div>
      </BetSlipInvalidSelection>

      <BetSlipInvalidBankerCount>
        <div className={classes.error}>
          <ErrorIcon size={"m"} className={classes.icon} />

          {t(sportsbookui_starzbet_betSlip_warning_title_tooManySelectionsNominatedAsBankers)}
        </div>
      </BetSlipInvalidBankerCount>
    </>
  );
});
Warnings.displayName = "Warnings";

export { Warnings };

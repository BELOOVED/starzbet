import { memo } from "react";
import { TimeBuilder, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { useCountdown } from "../../../Hooks/UseCountdown";
import { type EVipClubBonusType } from "../../../Store/VipClub/VipClubModels";
import {
  availableBonusHasLimitInvalidatedMatchResultsSelector,
} from "../../../Store/Bonuses/Selectors/AvailableBonusValidationMatchResultsSelector";
import {
  vipClubBonusAvailableForSelector,
  vipClubBonusWillBeAvailableInSelector,
} from "../../../Store/VipClub/Selectors/VipClubBonusSelectors";

const ONE_SECOND_IN_MS = 1000;

interface IVipClubBonusCardCountDownProps extends IWithClassName, IWithId {
  type: EVipClubBonusType;
  extraClassName?: string;
  availableForTKey: string;
  willBeAvailableInTKey: string;
  warningVar?: string;
  validationVar?: string;
}

const msToReadableString = (ms: number) => {
  const days = Math.floor(ms / TimeBuilder.days(1).time);
  const daysMS = TimeBuilder.days(days).time;
  const hours = Math.floor((ms - daysMS) / TimeBuilder.hours(1).time);
  const hoursMS = TimeBuilder.hours(hours).time;
  const minutes = Math.floor((ms - daysMS - hoursMS) / TimeBuilder.minutes(1).time);
  const minutesMS = TimeBuilder.minutes(minutes).time;
  const seconds = Math.floor((ms - daysMS - hoursMS - minutesMS) / TimeBuilder.seconds(1).time);

  return `${days !== 0 ? days + "d " : ""}${hours}h ${minutes}m${days === 0 ? " " + seconds + "s" : ""}`;
};

const DEFAULT_WARNING_VAR = "var(--warning)";
const DEFAULT_VALIDATION_VAR = "var(--validation)";

const VipClubBonusCardCountDown = memo<IVipClubBonusCardCountDownProps>(({
  type,
  id,
  className,
  extraClassName,
  willBeAvailableInTKey,
  availableForTKey,
  warningVar,
  validationVar,
}) => {
  const hasSomeLimitValidationMatchResult = useParamSelector(availableBonusHasLimitInvalidatedMatchResultsSelector, [id]);
  const time = useParamSelector(
    hasSomeLimitValidationMatchResult ? vipClubBonusWillBeAvailableInSelector : vipClubBonusAvailableForSelector,
    [type],
  );
  const [t] = useTranslation();
  const [ms] = useCountdown(time, ONE_SECOND_IN_MS);

  //common variables
  const style = {
    color: hasSomeLimitValidationMatchResult
      ? (warningVar ?? DEFAULT_WARNING_VAR)
      : (validationVar ?? DEFAULT_VALIDATION_VAR),
  };

  return ms > 0
    ? (
      <span className={className} {...qaAttr(PlayerUIQaAttributes.VipClubPage.BonusCard_CountDown)}>
        <span>
          {t(hasSomeLimitValidationMatchResult ? willBeAvailableInTKey : availableForTKey)}

          {": "}
        </span>

        <span className={extraClassName} style={style}>{msToReadableString(ms)}</span>
      </span>
    )
    : null;
});
VipClubBonusCardCountDown.displayName = "VipClubBonusCardCountDown";

export { VipClubBonusCardCountDown };

import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_depositLimitOptions_noLimit, platformui_selfExclusionPeriod_indefinitely } from "@sb/translates/platformui/CommonTKeys";
import { type ISelectOption } from "../../../common/Components/Field/SelectModel";
import {
  ESelfProtectionInterval,
  isNoLimit,
  type TNoLimit,
  type TSelfProtectionInterval,
} from "../../Store/SelfProtection/Model/SelfProtectionInterval";
import { useFormatDuration } from "../../Store/SelfProtection/Hooks/UseFormatDuration";

interface IPeriodProps {
  value: TSelfProtectionInterval;
}

const Period = memo<IPeriodProps>(({ value }) => {
  const period = useFormatDuration(value);

  return period;
});
Period.displayName = "Period";

const PeriodLimitOption = memo<ISelectOption<ESelfProtectionInterval | TNoLimit>>(({ value }) => {
  const [t] = useTranslation();

  if (value === ESelfProtectionInterval.INDEFINITELY) {
    return t(platformui_selfExclusionPeriod_indefinitely);
  }

  if (isNoLimit(value)) {
    return t(platformui_depositLimitOptions_noLimit);
  }

  return (
    <Period value={value} />
  );
});
PeriodLimitOption.displayName = "PeriodLimitOption";

export { PeriodLimitOption };

import { memo } from "react";
import { platformui_realityChecks_noCheck } from "@sb/translates/platformui/CommonTKeys";
import { useTranslation } from "@sb/translator";
import { useParamSelector } from "@sb/utils";
import type { TPlatform_RealityCheckByTimeBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import { useFormatDuration } from "../../Store/SelfProtection/Hooks/UseFormatDuration";
import { currentBagSelector } from "../../Store/SelfProtection/Selectors/SelfProtectionSelectors";

const RealityChecksCurrentPeriod = memo(() => {
  const [t] = useTranslation();

  const currentBag = useParamSelector(
    currentBagSelector.type<TPlatform_RealityCheckByTimeBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.realityCheckByTimeBag],
  );

  const periodDuration = useFormatDuration(currentBag?.period);

  return (
    <>
      {
        currentBag
          ? periodDuration
          : t(platformui_realityChecks_noCheck)
      }
    </>
  );
});
RealityChecksCurrentPeriod.displayName = "RealityChecksCurrentPeriod";

export { RealityChecksCurrentPeriod };

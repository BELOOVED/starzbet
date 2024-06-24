import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_claim_claim,
  platformui_starzbet_bonus_claim_placeholder,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./EligibilityRules.module.css";
import { RuleLayout } from "./RuleLayout/RuleLayout";

const ClaimRulePlaceholder = memo(() => {
  const [t] = useTranslation();

  return (
    <RuleLayout
      checked={false}
      title={t(platformui_starzbet_bonus_claim_claim)}
    >
      <div className={classes.placeholder}>
        {t(platformui_starzbet_bonus_claim_placeholder)}
      </div>
    </RuleLayout>
  );
});
ClaimRulePlaceholder.displayName = "ClaimRulePlaceholder";

export { ClaimRulePlaceholder };

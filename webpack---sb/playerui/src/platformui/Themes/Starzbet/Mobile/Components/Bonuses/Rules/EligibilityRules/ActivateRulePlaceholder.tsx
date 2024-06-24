import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_activation_activate,
  platformui_starzbet_bonus_activation_placeholder,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./EligibilityRules.module.css";
import { RuleLayout } from "./RuleLayout/RuleLayout";

const ActivateRulePlaceholder = memo(() => {
  const [t] = useTranslation();

  return (
    <RuleLayout
      checked={false}
      title={t(platformui_starzbet_bonus_activation_activate)}
    >
      <div className={classes.placeholder}>
        {t(platformui_starzbet_bonus_activation_placeholder)}
      </div>
    </RuleLayout>
  );
});
ActivateRulePlaceholder.displayName = "ActivateRulePlaceholder";

export { ActivateRulePlaceholder };

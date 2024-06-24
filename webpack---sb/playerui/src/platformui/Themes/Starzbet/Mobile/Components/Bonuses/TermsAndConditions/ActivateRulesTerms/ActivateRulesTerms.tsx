import { memo } from "react";
import { isNil, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_terms_claimRules } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import {
  depositRuleNoteFromActivateRulesSelector,
  productRuleNoteFromActivateRulesSelector,
} from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import { BonusTemplate } from "../../../../../Components/Bonuses/BonusTemplate/BonusTemplate";
import { InnerTermsCollapse } from "../InnerTermsCollapse/InnerTermsCollapse";

const ActivateRulesTerms = memo(() => {
  const [t] = useTranslation();
  const { bonusId, forAvailable } = useBonusItemContext();

  const depositRuleNote = useParamSelector(depositRuleNoteFromActivateRulesSelector, [bonusId, forAvailable]);
  const productRuleNote = useParamSelector(productRuleNoteFromActivateRulesSelector, [bonusId, forAvailable]);

  if (isNil(depositRuleNote) && isNil(productRuleNote)) {
    return null;
  }

  return (
    <InnerTermsCollapse title={t(platformui_starzbet_bonus_terms_claimRules)}>
      <BonusTemplate note={depositRuleNote} bonusId={bonusId} forAvailable={forAvailable} />

      <BonusTemplate note={productRuleNote} bonusId={bonusId} forAvailable={forAvailable} />
    </InnerTermsCollapse>
  );
});
ActivateRulesTerms.displayName = "ActivateRulesTerms";

export { ActivateRulesTerms };

import { memo } from "react";
import { isNil, useParamSelector } from "@sb/utils";
import { platformui_starzbet_bonus_terms_claimRules } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import {
  depositRuleNoteFromClaimRulesSelector,
  productRuleNoteFromClaimRulesSelector,
} from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import { BonusTemplate } from "../../../../../Components/Bonuses/BonusTemplate/BonusTemplate";
import { InnerTermsCollapse } from "../InnerTermsCollapse/InnerTermsCollapse";

const ClaimRulesTerms = memo(() => {
  const [t] = useTranslation();
  const { bonusId, forAvailable } = useBonusItemContext();

  const depositRuleNote = useParamSelector(depositRuleNoteFromClaimRulesSelector, [bonusId, forAvailable]);
  const productRuleNote = useParamSelector(productRuleNoteFromClaimRulesSelector, [bonusId, forAvailable]);

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
ClaimRulesTerms.displayName = "ClaimRulesTerms";

export { ClaimRulesTerms };

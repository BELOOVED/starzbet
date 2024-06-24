import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_howTheOfferWorks } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import { bonusRulesSelector } from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import { BonusTemplate } from "../../../../../Components/Bonuses/BonusTemplate/BonusTemplate";
import { InnerTermsCollapse } from "../InnerTermsCollapse/InnerTermsCollapse";

const HowTheOfferWorksTerms = memo(() => {
  const [t] = useTranslation();

  const { bonusId, forAvailable } = useBonusItemContext();
  const bonusRules = useParamSelector(bonusRulesSelector, [bonusId, forAvailable]);

  if (!bonusRules) {
    return null;
  }

  return (
    <InnerTermsCollapse title={t(platformui_starzbet_bonus_howTheOfferWorks)}>
      <BonusTemplate note={bonusRules} bonusId={bonusId} forAvailable={forAvailable} />
    </InnerTermsCollapse>
  );
});
HowTheOfferWorksTerms.displayName = "HowTheOfferWorksTerms";

export { HowTheOfferWorksTerms };

import { memo } from "react";
import { platformui_starzbet_bonus_terms_fullTermsAndConditions } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { isVoid, useParamSelector } from "@sb/utils";
import { bonusTermsSelector } from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { BonusTemplate } from "../../../../../Components/Bonuses/BonusTemplate/BonusTemplate";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import { InnerTermsCollapse } from "../InnerTermsCollapse/InnerTermsCollapse";

const FullTerms = memo(() => {
  const [t] = useTranslation();

  const { bonusId, forAvailable } = useBonusItemContext();
  const terms = useParamSelector(bonusTermsSelector, [bonusId, forAvailable]);

  if (isVoid(terms)) {
    return null;
  }

  return (
    <InnerTermsCollapse title={t(platformui_starzbet_bonus_terms_fullTermsAndConditions)}>
      <BonusTemplate note={terms} bonusId={bonusId} forAvailable={forAvailable} />
    </InnerTermsCollapse>
  );
});
FullTerms.displayName = "FullTerms";

export { FullTerms };

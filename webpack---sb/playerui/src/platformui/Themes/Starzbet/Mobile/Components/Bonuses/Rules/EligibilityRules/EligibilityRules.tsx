import { type FC, memo, type PropsWithChildren } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_howTheOfferWorks } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import { bonusRulesSelector } from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import { BonusTemplate } from "../../../../../Components/Bonuses/BonusTemplate/BonusTemplate";
import { Collapse } from "../../Collapse/Collapse";
import { DepositRule } from "./DepositRule/DepositRule";
import { EligibilityProductRules } from "./EligibilityProductRules/EligibilityProductRules";
import { ClaimRulePlaceholder } from "./ClaimRulePlaceholder";
import { ActivateRulePlaceholder } from "./ActivateRulePlaceholder";

const HowTheOfferWorksRule = memo(() => {
  const [t] = useTranslation();

  const { bonusId, forAvailable } = useBonusItemContext();
  const bonusRules = useParamSelector(bonusRulesSelector, [bonusId, forAvailable]);

  if (!bonusRules) {
    return null;
  }

  return (
    <Collapse title={t(platformui_starzbet_bonus_howTheOfferWorks)}>
      <BonusTemplate note={bonusRules} bonusId={bonusId} forAvailable={forAvailable} />
    </Collapse>
  );
});
HowTheOfferWorksRule.displayName = "HowTheOfferWorksRule";

const EligibilityRules: FC<PropsWithChildren> = ({ children }) => (
  <>
    <HowTheOfferWorksRule />

    <DepositRule />

    <EligibilityProductRules />

    {children}
  </>
);
EligibilityRules.displayName = "EligibilityRules";

const ClaimRules = memo(() => (
  <EligibilityRules>
    <ClaimRulePlaceholder />
  </EligibilityRules>
));
ClaimRules.displayName = "ClaimRules";

const ActivateRules = memo(() => (
  <EligibilityRules>
    <ActivateRulePlaceholder />
  </EligibilityRules>
));
ActivateRules.displayName = "ActivateRules";

export { ClaimRules, ActivateRules };

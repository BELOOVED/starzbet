import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_deposit_deposit,
  platformui_starzbet_bonus_deposit_note_placeholder,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { depositRuleCommonSelector } from "../../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { useBonusItemContext } from "../../../../../../Components/Bonuses/BonusItemContext";
import { BonusTemplate } from "../../../../../../Components/Bonuses/BonusTemplate/BonusTemplate";
import { RuleLayout } from "../RuleLayout/RuleLayout";

const DepositRule = memo(() => {
  const [t] = useTranslation();

  const { bonusId, forAvailable } = useBonusItemContext();
  const { depositRule, progressNode } = useParamSelector(depositRuleCommonSelector, [bonusId, forAvailable]);

  if (!depositRule) {
    return null;
  }

  return (
    <RuleLayout
      checked={progressNode ? progressNode.isSatisfiedByPlayer : false}
      title={t(platformui_starzbet_bonus_deposit_deposit)}
    >
      {
        depositRule.note
          ? <BonusTemplate note={depositRule.note} bonusId={bonusId} forAvailable={forAvailable} />
          : t(platformui_starzbet_bonus_deposit_note_placeholder)
      }
    </RuleLayout>
  );
});
DepositRule.displayName = "DepositRule";

export { DepositRule };


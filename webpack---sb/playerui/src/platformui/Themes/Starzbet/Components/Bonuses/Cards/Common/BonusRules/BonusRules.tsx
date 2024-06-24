import { memo } from "react";
import { platformui_starzbet_bonus_howTheOfferWorks } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type TNullable } from "@sb/utils";
import classes from "./BonusRules.module.css";
import { useBonusItemContext } from "../../../BonusItemContext";
import { BonusTemplate } from "../../../BonusTemplate/BonusTemplate";

interface IBonusRulesBaseProps {
    bonusRules: TNullable<TTranslateRecord_Fragment[]>;
    bonusId: string;
    forAvailable: boolean;
}

const BonusRulesBase = memo<IBonusRulesBaseProps>(({ bonusRules, bonusId, forAvailable }) => {
  const [t] = useTranslation();

  if (!bonusRules) {
    return null;
  }

  return (
    <div className={classes.bonusRules}>
      <div className={classes.bonusRulesTitle}>
        {t(platformui_starzbet_bonus_howTheOfferWorks)}
      </div>

      <BonusTemplate note={bonusRules} bonusId={bonusId} forAvailable={forAvailable} />
    </div>
  );
});
BonusRulesBase.displayName = "BonusRulesBase";

interface IBonusRulesProps {
    bonusRules: TNullable<TTranslateRecord_Fragment[]>;
}

const BonusRules = memo<IBonusRulesProps>(({ bonusRules }) => {
  const { bonusId, forAvailable } = useBonusItemContext();

  return <BonusRulesBase bonusId={bonusId} forAvailable={forAvailable} bonusRules={bonusRules} />;
});
BonusRules.displayName = "BonusRules";

export { BonusRules, BonusRulesBase };

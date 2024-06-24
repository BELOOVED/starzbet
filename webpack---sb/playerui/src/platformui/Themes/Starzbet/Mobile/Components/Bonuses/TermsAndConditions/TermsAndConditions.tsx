import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_terms_termsAndConditions,
  platformui_starzbet_bonus_terms_termsAndConditionsApply,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TVoidFn } from "@sb/utils";
import classes from "./TermsAndConditions.module.css";
import { type IModalCreatorComponentProps, ModalCreator } from "../../ModalCreator/ModalCreator";
import { HowTheOfferWorksTerms } from "./HowTheOfferWorksTerms/HowTheOfferWorksTerms";
import { FullTerms } from "./FullTerms/FullTerms";
import { ClaimRulesTerms } from "./ClaimRulesTerms/ClaimRulesTerms";
import { ActivateRulesTerms } from "./ActivateRulesTerms/ActivateRulesTerms";
import { RewardTerms } from "./RewardTerms/RewardTerms";

const TermsAndConditionsBase = memo<IModalCreatorComponentProps>(({ closeButton }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.termsModal}>
      <div className={classes.header}>
        <span>{t(platformui_starzbet_bonus_terms_termsAndConditions)}</span>

        {closeButton}
      </div>

      <div className={classes.termsCollapseBody}>
        <HowTheOfferWorksTerms />

        <ClaimRulesTerms />

        <ActivateRulesTerms />

        <RewardTerms />

        <FullTerms />
      </div>
    </div>
  );
});
TermsAndConditionsBase.displayName = "TermsAndConditionsBase";

const TermsAndConditions = memo(() => {
  const [t] = useTranslation();

  return (
    <ModalCreator
      component={TermsAndConditionsBase}
      childrenContainerClassName={classes.childrenContainer}
    >
      {
        (toggleModal: TVoidFn) => (
          <span onClick={toggleModal} className={classes.tcApply}>
            {t(platformui_starzbet_bonus_terms_termsAndConditionsApply)}
          </span>
        )
      }
    </ModalCreator>
  );
});
TermsAndConditions.displayName = "TermsAndConditions";

export { TermsAndConditions };

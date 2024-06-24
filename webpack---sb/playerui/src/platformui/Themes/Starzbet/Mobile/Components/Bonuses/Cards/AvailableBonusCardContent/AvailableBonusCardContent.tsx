import { memo, useCallback, useState } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_availableBonusInfo_claim,
  platformui_starzbet_bonus_status_seeMore,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TVoidFn, useActionWithBind, useParamSelector } from "@sb/utils";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { availableBonusInfoCommonSelector } from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { detailedAvailableBonusRequestedAction } from "../../../../../../../Store/Bonuses/BonusesActions";
import {
  HelpSucceedBonusButton,
} from "../../../../../Components/Bonuses/HelpSucceedBonusButton/HelpSucceedBonusButton";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import {
  ClaimAvailableBonusButton,
} from "../../../../../Components/Bonuses/ClaimAvailableBonusButton/ClaimAvailableBonusButton";
import { ClaimRules } from "../../Rules/EligibilityRules/EligibilityRules";
import { TermsAndConditions } from "../../TermsAndConditions/TermsAndConditions";

const ExpandedContent = memo(() => {
  const [t] = useTranslation();

  const { bonusId } = useBonusItemContext();

  const {
    isAvailableForClaim,
    helperButtonFor,
  } = useParamSelector(availableBonusInfoCommonSelector, [bonusId]);

  return (
    <>
      <ClaimRules />

      <TermsAndConditions />

      <HelpSucceedBonusButton buttonFor={helperButtonFor} />

      {
        isAvailableForClaim && (
          <ClaimAvailableBonusButton colorScheme={"orange-gradient"} id={bonusId}>
            {t(platformui_starzbet_bonus_availableBonusInfo_claim)}
          </ClaimAvailableBonusButton>
        )
      }
    </>
  );
});
ExpandedContent.displayName = "ExpandedContent";

interface ISeeMoreButtonProps {
  onClick: TVoidFn;
}

const SeeMoreButton = memo<ISeeMoreButtonProps>(({ onClick }) => {
  const [t] = useTranslation();

  return (
    <Button onClick={onClick} colorScheme={"secondary-orange"}>
      {t(platformui_starzbet_bonus_status_seeMore)}
    </Button>
  );
});
SeeMoreButton.displayName = "SeeMoreButton";

const AvailableBonusCardContent = memo(() => {
  const { bonusId } = useBonusItemContext();
  const [expanded, setExpanded] = useState(false);
  const requestDetailedAvailableBonus = useActionWithBind(detailedAvailableBonusRequestedAction, bonusId);

  const handleExpand = useCallback(
    () => {
      setExpanded(true);
      requestDetailedAvailableBonus();
    },
    [requestDetailedAvailableBonus],
  );

  return expanded
    ? <ExpandedContent />
    : <SeeMoreButton onClick={handleExpand} />;
});
AvailableBonusCardContent.displayName = "AvailableBonusCardContent";

export { AvailableBonusCardContent };

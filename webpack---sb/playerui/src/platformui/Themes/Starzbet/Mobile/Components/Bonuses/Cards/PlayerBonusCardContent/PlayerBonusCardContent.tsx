import { memo, useCallback, useState } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_playerBonusInfo_activate,
  platformui_starzbet_bonus_status_seeMore,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TVoidFn, useActionWithBind, useParamSelector } from "@sb/utils";
import { EPlatform_PlayerBonusStatusEnum } from "@sb/graphql-client";
import classes from "./PlayerBonusCardContent.module.css";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import {
  playerBonusByIdNotNilSelectors,
  playerBonusHelperButtonForSelector,
  playerBonusIsAvailableForActivateSelector,
  productRulesCommonSelector,
} from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { activateBonusAction } from "../../../../../../../Store/Bonuses/BonusesActions";
import { activateBonusStartedSelector } from "../../../../../../../Store/Bonuses/Selectors/BonusCallManagerSelectors";
import {
  HelpSucceedBonusButton,
} from "../../../../../Components/Bonuses/HelpSucceedBonusButton/HelpSucceedBonusButton";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import {
  ProductRulesWithTabs,
  RemainingWager,
} from "../../../../../Components/Bonuses/ProductRulesWithTabs/ProductRulesWithTabs";
import { ActivateRules } from "../../Rules/EligibilityRules/EligibilityRules";
import { TermsAndConditions } from "../../TermsAndConditions/TermsAndConditions";
import { ProgressionDetails } from "../../ProgressionDetails/ProgressionDetails";

const ClaimedExpandedContent = memo(() => {
  const [t] = useTranslation();

  const { bonusId } = useBonusItemContext();

  const isAvailableForActivate = useParamSelector(playerBonusIsAvailableForActivateSelector, [bonusId]);
  const helperButtonFor = useParamSelector(playerBonusHelperButtonForSelector, [bonusId]);

  const activateBonus = useActionWithBind(activateBonusAction, bonusId);
  const pendingActivation = useParamSelector(activateBonusStartedSelector, [bonusId]);

  return (
    <>
      <ActivateRules />

      <TermsAndConditions />

      <HelpSucceedBonusButton buttonFor={helperButtonFor} />

      {
        isAvailableForActivate
          ? (
            <Button
              onClick={activateBonus}
              disabled={pendingActivation}
              colorScheme={"orange-gradient"}
              loading={pendingActivation}
            >
              {t(platformui_starzbet_bonus_playerBonusInfo_activate)}
            </Button>
          )
          : null
      }
    </>
  );
});
ClaimedExpandedContent.displayName = "ClaimedExpandedContent";

const ActiveExpandedContent = memo(() => {
  const { bonusId } = useBonusItemContext();
  const { wagering, freeBet } = useParamSelector(productRulesCommonSelector, [bonusId, false]);

  const helperButtonFor = useParamSelector(playerBonusHelperButtonForSelector, [bonusId]);

  return (
    <>
      <div className={classes.lightWrapper}>
        {
          wagering
            ? <ProductRulesWithTabs productRules={wagering.productRules} remainingWager={RemainingWager} />
            : null
        }

        {freeBet ? <ProductRulesWithTabs productRules={freeBet.productRules} /> : null}

        <ProgressionDetails playerBonusId={bonusId} />
      </div>

      <TermsAndConditions />

      <HelpSucceedBonusButton buttonFor={helperButtonFor} />
    </>
  );
});
ActiveExpandedContent.displayName = "ActiveExpandedContent";

const ExpandedContent = memo(() => {
  const { bonusId } = useBonusItemContext();

  const status = useParamSelector(playerBonusByIdNotNilSelectors.status, [bonusId]);

  if (status === EPlatform_PlayerBonusStatusEnum.claimed) {
    return <ClaimedExpandedContent />;
  }

  if (status === EPlatform_PlayerBonusStatusEnum.inProgress) {
    return <ActiveExpandedContent />;
  }

  throw new Error("[PlayerBonusCardContent] ExpandedContent incorrect player bonus status");
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

const PlayerBonusCardContent = memo(() => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = useCallback(() => setExpanded(true), []);

  return expanded
    ? <ExpandedContent />
    : <SeeMoreButton onClick={handleExpand} />;
});
PlayerBonusCardContent.displayName = "PlayerBonusCardContent";

export { PlayerBonusCardContent };

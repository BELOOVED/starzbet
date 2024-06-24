import { memo, useCallback, useState } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_status_seeMore } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TVoidFn } from "@sb/utils";
import classes from "./HistoryBonusCardContent.module.css";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import {
  HistoryCashbackGiven,
  HistoryWagerProgress,
} from "../../../../../Components/Bonuses/RuleProgress/HistoryWagerProgress";
import { TermsAndConditions } from "../../TermsAndConditions/TermsAndConditions";

const ExpandedContent = memo(() => {
  const { bonusId } = useBonusItemContext();

  return (
    <>
      <HistoryWagerProgress id={bonusId} className={classes.lightWrapper} />

      <HistoryCashbackGiven id={bonusId} className={classes.lightWrapper} />

      <TermsAndConditions />
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

const HistoryBonusCardContent = memo(() => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = useCallback(() => setExpanded(true), []);

  return expanded
    ? <ExpandedContent />
    : <SeeMoreButton onClick={handleExpand} />;
});
HistoryBonusCardContent.displayName = "HistoryBonusCardContent";

export { HistoryBonusCardContent };

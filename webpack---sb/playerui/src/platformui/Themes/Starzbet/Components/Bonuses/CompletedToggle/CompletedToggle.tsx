import { type ChangeEvent, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAction } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_all,
  platformui_starzbet_bonus_completed,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { platformBonusesSelectors } from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { changeBonusShowCompletedFilterAction } from "../../../../../Store/Bonuses/BonusesActions";
import { Toggle } from "../../Toggle/Toggle";

const CompletedToggle = memo<IWithClassName>(({ className }) => {
  const [t] = useTranslation();
  const showOnlyCompleted = useSelector(platformBonusesSelectors.showOnlyCompleted);

  const setFilterValue = useAction(changeBonusShowCompletedFilterAction);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.checked), []);

  const title = showOnlyCompleted
    ? t(platformui_starzbet_bonus_completed)
    : t(platformui_starzbet_bonus_all);

  return (
    <Toggle onChange={onChange} checked={showOnlyCompleted} className={className}>
      {title}
    </Toggle>
  );
});
CompletedToggle.displayName = "CompletedToggle";

export { CompletedToggle };

import clsx from "clsx";
import values from "lodash/fp/values";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useAction } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_sortBy } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./BonusSortSelect.module.css";
import { Select } from "../../../../../../common/Themes/Starzbet/Components/Select/Select";
import { type ISelectOption, type TSelectOnChange } from "../../../../../../common/Components/Field/SelectModel";
import { changeBonusSortFilterAction } from "../../../../../Store/Bonuses/BonusesActions";
import { EBonusSortFilter } from "../../../../../Store/Bonuses/Model/Enums/EBonusSortFilter";
import { platformBonusesSelectors } from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { BONUS_SORT_FILTER_TRANSLATE_MAP } from "../../../Model/Bonus/BonusMaps";

const Option = memo<ISelectOption<EBonusSortFilter>>((option) => {
  const [t] = useTranslation();

  return (
    <div className={classes.option}>
      {t(BONUS_SORT_FILTER_TRANSLATE_MAP[option.value])}
    </div>
  );
});
Option.displayName = "Option";

const options = values(EBonusSortFilter).map((it) => ({ value: it }));

const BonusSortSelect = memo<IWithClassName>(({ className }) => {
  const [t] = useTranslation();
  const filterValue = useSelector(platformBonusesSelectors.sortBy);

  const setFilterValue = useAction(changeBonusSortFilterAction);

  const handleChange: TSelectOnChange<EBonusSortFilter> = (value?: EBonusSortFilter) => {
    setFilterValue(value ?? null);
  };

  return (
    <div className={className}>
      <Select
        value={filterValue}
        onChange={handleChange}
        options={options}
        optionComponent={Option}
        placeholder={t.plain(platformui_starzbet_bonus_sortBy)}
        className={clsx(className, classes.select)}
        status={"default"}
      />
    </div>
  );
});
BonusSortSelect.displayName = "BonusSortSelect";

export { BonusSortSelect };

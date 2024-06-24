import clsx from "clsx";
import { createElement, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { keys } from "@sb/utils/Keys";
import { useAction } from "@sb/utils";
import classes from "./ProductFilter.module.css";
import {
  NativeHorizontalScroll,
} from "../../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import {
  bonusProductFilterOptionsSelector,
  platformBonusesSelectors,
} from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { changeBonusProductFilterAction } from "../../../../../../../Store/Bonuses/BonusesActions";
import { type TProductFilterKey } from "../../../../../../../Store/Bonuses/Utils/BonusesUISortFilterUtils";
import { PRODUCT_TO_ICON_MAP, PRODUCT_TRANSLATE_MAP } from "../../../../../Model/Bonus/BonusMaps";

interface IOptionProps {
  value: TProductFilterKey;
  selected: boolean;
}

const Option = memo<IOptionProps>(({ value, selected }) => {
  const [t] = useTranslation();
  const rawOptions = useSelector(bonusProductFilterOptionsSelector);
  const setFilterValue = useAction(changeBonusProductFilterAction);

  const handleClick = () => {
    if (!selected) {
      setFilterValue(value);
    }
  };

  return (
    <div className={clsx(classes.option, selected && classes.active)} onClick={handleClick}>
      <div className={classes.icon}>
        {createElement(PRODUCT_TO_ICON_MAP[value])}
      </div>

      <div className={classes.title}>
        {t(PRODUCT_TRANSLATE_MAP[value])}
      </div>

      {
        value !== "all"
          ? <div className={classes.count}>{rawOptions[value]}</div>
          : null
      }
    </div>
  );
});
Option.displayName = "Option";

const ProductFilter = memo(() => {
  const filterValue = useSelector(platformBonusesSelectors.bonusProductFilter);
  const rawOptions = useSelector(bonusProductFilterOptionsSelector);

  const options = useMemo(() => keys(rawOptions), [rawOptions]);

  return (
    <NativeHorizontalScroll trackClassName={classes.track}>
      {options.map((it) => <Option value={it} selected={filterValue === it} key={it} />)}
    </NativeHorizontalScroll>
  );
});
ProductFilter.displayName = "ProductFilter";

export { ProductFilter };

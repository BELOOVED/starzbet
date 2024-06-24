import clsx from "clsx";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import {
  isNil,
  noopStopPropagation,
  not,
  useActionWithBind,
  useClickOutside,
  useParamSelector,
  usePersistCallback,
  withCondition,
  withStopPropagation,
} from "@sb/utils";
import { platformui_starzbet_promoBonusSelect_placeholder } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./PromotionBonusSelect.module.css";
import {
  availableBonusByIdNotNilSelectors,
} from "../../../../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { TranslateRecord } from "../../../../../../../platformui/Components/TranslateRecord/TranslateRecord";
import { When } from "../../../../../../../common/Components/When";
import {
  availableBetSlipPromotionBonusIdsSelector,
  isAnyBetSlipPromotionBonusesAvailableSelector,
} from "../../../../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipPromotionBonusesSelectors";
import { CloseDefaultIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import {
  isAvailablePromotionBonusMatchedStaticSelector,
  isNotPrimaryBalanceUsedForParlaySelector,
} from "../../../../../../../platformui/Store/Bonuses/Selectors/BetSlip/FreeBetLabelSelectors";
import { betSlipChangePromotionBonusAction } from "../../../../../../Store/BetSlip/BetSlipActions";
import { betSlipPromotionBonusIdSelector } from "../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { ChevronIcon } from "../../Icons/ChevronIcon/ChevronIcon";

interface IPromotionBonusViewProps {
  bonusId: string;
}

const PromotionBonusView = memo<IPromotionBonusViewProps>(({ bonusId }) => {
  const bonusName = useParamSelector(availableBonusByIdNotNilSelectors.name, [bonusId]);

  return (
    <Ellipsis className={classes.bonusName}>
      <TranslateRecord record={bonusName} />
    </Ellipsis>
  );
});
PromotionBonusView.displayName = "PromotionBonusView";

interface IPromotionBonusSelectOptionProps {
  value: string;
}

const PromotionBonusSelectOption = memo<IPromotionBonusSelectOptionProps>(({ value }) => {
  const betSlipPromotionBonusId = useSelector(betSlipPromotionBonusIdSelector);
  const isMatched = useParamSelector(isAvailablePromotionBonusMatchedStaticSelector, [value]);
  const changePromotionBonus = useActionWithBind(betSlipChangePromotionBonusAction, value);

  const active = betSlipPromotionBonusId === value;

  const handleClick = isMatched ? changePromotionBonus : noopStopPropagation;

  return (
    <div
      className={clsx(classes.option, active && classes.active, !isMatched && classes.disabled)}
      onClick={handleClick}
    >
      <PromotionBonusView bonusId={value} />
    </div>
  );
});
PromotionBonusSelectOption.displayName = "PromotionBonusSelectOption";

interface IPromotionBonusSelectHandleProps {
  hidden: boolean;
}

const PromotionBonusSelectHandle = memo<IPromotionBonusSelectHandleProps>(({ hidden }) => {
  const [t] = useTranslation();

  const betSlipPromotionBonusId = useSelector(betSlipPromotionBonusIdSelector);
  const handleRemove = useActionWithBind(betSlipChangePromotionBonusAction, null);

  return (
    <div className={classes.promoSelectHandle}>
      {
        isNil(betSlipPromotionBonusId)
          ? (
            <>
              <Ellipsis>{t(platformui_starzbet_promoBonusSelect_placeholder)}</Ellipsis>

              <ChevronIcon expanded={!hidden} size={"m"} />
            </>
          )
          : (
            <>
              <PromotionBonusView bonusId={betSlipPromotionBonusId} />

              <CloseDefaultIcon onClick={withStopPropagation(handleRemove)} size={"xs"} color={"darkText"} />
            </>
          )
      }
    </div>
  );
});
PromotionBonusSelectHandle.displayName = "PromotionBonusSelectHandle";

const PromotionBonusSelect = withCondition(
  isAnyBetSlipPromotionBonusesAvailableSelector,
  memo(() => {
    const isNotPrimaryBalanceUsedForParlay = useSelector(isNotPrimaryBalanceUsedForParlaySelector);
    const bonusIds = useSelector(availableBetSlipPromotionBonusIdsSelector);

    const [hidden, setHidden] = useState(true);

    const hiddenHandler = usePersistCallback(() => setHidden(true));

    const toggleHandler = () => {
      if (!isNotPrimaryBalanceUsedForParlay) {
        setHidden(not);
      }
    };

    const ref = useClickOutside<HTMLDivElement>(hiddenHandler);

    return (
      <div className={classes.promoSelectWrapper}>
        <div
          className={clsx(classes.promoSelect, isNotPrimaryBalanceUsedForParlay && classes.disabled)}
          onClick={toggleHandler}
          ref={ref}
        >
          <PromotionBonusSelectHandle hidden={hidden} />

          <When condition={!hidden}>
            <div className={classes.promoSelectList}>
              {bonusIds.map((bonusId) => <PromotionBonusSelectOption value={bonusId} key={bonusId} />)}
            </div>
          </When>
        </div>
      </div>
    );
  }),
);
PromotionBonusSelect.displayName = "PromotionBonusSelect";

export { PromotionBonusSelect };

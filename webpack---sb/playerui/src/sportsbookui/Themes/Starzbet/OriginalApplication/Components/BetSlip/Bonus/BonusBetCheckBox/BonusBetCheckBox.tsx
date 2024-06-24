import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, isNil, Money, useAction, useParamSelector } from "@sb/utils";
import {
  sportsbookui_starzbet_betSlip_title_useBonusBalance,
  sportsbookui_starzbet_betSlip_warning_minStake,
  sportsbookui_starzbet_betSlip_warning_possibleRange,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { Space } from "../../../../../../../../common/Components/Space/Space";
import {
  isBonusCheckboxVisibleForParlaySelector,
  isBonusCheckboxVisibleSelector,
} from "../../../../../../../../platformui/Store/Bonuses/Selectors/BetSlip/SelectorsNeededToSplit";
import {
  bonusBetAmountPossibleRangeSelector,
} from "../../../../../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipBonusBetErrorSelectors";
import { betSlipUseBonusBalanceForParlayCheckedSelector } from "../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { betSlipSetUseBonusBalanceForParlayAction } from "../../../../../../../Store/BetSlip/BetSlipActions";
import { useBetSlipBonusToggle } from "../../../../../../../Store/BetSlip/Hooks/UseBetSlipBonusToggle";
import { BetSlipToggle } from "../BetSlipToggle/BetSlipToggle";

const BonusBetPossibleRange = memo(() => {
  const [t] = useTranslation();

  const range = useSelector(bonusBetAmountPossibleRangeSelector);

  if (!range) {
    return null;
  }

  return (
    <>
      {"("}

      {
        isNil(range[1])
          ? t(sportsbookui_starzbet_betSlip_warning_minStake, { stake: Money.toFormat(range[0], EMoneyFormat.symbolLeft) })
          : t(
            sportsbookui_starzbet_betSlip_warning_possibleRange,
            {
              minStake: Money.toFormat(range[0], EMoneyFormat.symbolLeft),
              maxStake: Money.toFormat(range[1], EMoneyFormat.symbolLeft),
            },
          )
      }

      {")"}
    </>
  );
});
BonusBetPossibleRange.displayName = "BonusBetPossibleRange";

interface IBonusBetCheckBoxProps {
  outcomeId: string;
}

const BonusBetCheckBox = memo<IBonusBetCheckBoxProps>(({ outcomeId }) => {
  const [t] = useTranslation();

  const isBonusCheckboxVisible = useParamSelector(isBonusCheckboxVisibleSelector, [outcomeId]);

  const [isActive, toggleBonus] = useBetSlipBonusToggle(outcomeId);

  if (!isBonusCheckboxVisible) {
    return null;
  }

  const label = (
    <Space value={4}>
      <span>
        {t(sportsbookui_starzbet_betSlip_title_useBonusBalance)}
      </span>

      <span>
        <BonusBetPossibleRange />
      </span>
    </Space>
  );

  return (
    <BetSlipToggle
      checked={isActive}
      onChange={toggleBonus}
      label={label}
    />
  );
});
BonusBetCheckBox.displayName = "BonusBetCheckBox";

const BonusCheckBoxForParlay = memo(() => {
  const [t] = useTranslation();

  const isBonusCheckboxVisibleForParlay = useSelector(isBonusCheckboxVisibleForParlaySelector);

  const useBonusBalanceParlayChecked = useSelector(betSlipUseBonusBalanceForParlayCheckedSelector);
  const setUseBonusBalanceForParlay = useAction(betSlipSetUseBonusBalanceForParlayAction);

  const toggle = useCallback(() => setUseBonusBalanceForParlay(!useBonusBalanceParlayChecked), [useBonusBalanceParlayChecked]);

  if (!isBonusCheckboxVisibleForParlay) {
    return null;
  }

  const label = (
    <Space value={4}>
      <span>
        {t(sportsbookui_starzbet_betSlip_title_useBonusBalance)}
      </span>

      <span>
        <BonusBetPossibleRange />
      </span>
    </Space>
  );

  return (
    <BetSlipToggle
      checked={useBonusBalanceParlayChecked}
      onChange={toggle}
      label={label}
    />
  );
});
BonusCheckBoxForParlay.displayName = "BonusCheckBoxForParlay";

export { BonusBetCheckBox, BonusCheckBoxForParlay };

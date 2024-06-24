import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, type IMoney, Money, useAction, useParamSelector } from "@sb/utils";
import {
  sportsbookui_starzbet_betSlip_title_freeBet,
  sportsbookui_starzbet_betSlip_warning_minStake,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { platformIsFreeBetPossibleSelector } from "../../../../../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { Space } from "../../../../../../../../common/Components/Space/Space";
import {
  isFreeBetCheckboxVisibleSelector,
} from "../../../../../../../../platformui/Store/Bonuses/Selectors/BetSlip/SelectorsNeededToSplit";
import {
  availableFreeBetAmountSelector,
} from "../../../../../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipFreeBetErrorSelectors";
import { betSlipIsFreeBetParlayCheckedSelector } from "../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { betSlipSetFreeBetParlayAction } from "../../../../../../../Store/BetSlip/BetSlipActions";
import { useBetSlipFreeBetToggle } from "../../../../../../../Store/BetSlip/Hooks/UseBetSlipBonusToggle";
import { BetSlipToggle } from "../BetSlipToggle/BetSlipToggle";

interface IRangeProps {
  min: IMoney;
  max?: IMoney;
}

const Range = memo<IRangeProps>(
  ({ min, max }) => {
    const [t] = useTranslation();

    if (!max) {
      return (
        <>
          {"("}

          {t(sportsbookui_starzbet_betSlip_warning_minStake, { stake: Money.toFormat(min, EMoneyFormat.symbolLeft) })}

          {")"}
        </>
      );
    }

    return <>{`(${Money.toFormat(min, EMoneyFormat.symbolLeft)} - ${Money.toFormat(max, EMoneyFormat.symbolLeft)})`}</>;
  },
);
Range.displayName = "Range";

const FreeBetPossibleRange = memo(() => {
  const availableFreeBetAmount = useSelector(availableFreeBetAmountSelector);

  if (!availableFreeBetAmount) {
    return null;
  }

  const [min, max] = availableFreeBetAmount;

  return <Range min={min} max={max} />;
});
FreeBetPossibleRange.displayName = "FreeBetPossibleRange";

interface IFreeBetCheckBoxProps {
  outcomeId: string;
}

const FreeBetCheckBox = memo<IFreeBetCheckBoxProps>(({ outcomeId }) => {
  const [t] = useTranslation();

  const isFreeBetCheckboxVisible = useParamSelector(isFreeBetCheckboxVisibleSelector, [outcomeId]);

  const [isActive, toggleFreeBet] = useBetSlipFreeBetToggle(outcomeId);

  if (!isFreeBetCheckboxVisible) {
    return null;
  }

  const label = (
    <Space value={4}>
      <span>
        {t(sportsbookui_starzbet_betSlip_title_freeBet)}
      </span>

      <span>
        <FreeBetPossibleRange />
      </span>
    </Space>
  );

  return (
    <BetSlipToggle
      checked={isActive}
      onChange={toggleFreeBet}
      label={label}
    />

  );
});
FreeBetCheckBox.displayName = "FreeBetCheckBox";

const FreeBetCheckBoxForParlay = memo(() => {
  const [t] = useTranslation();

  const isFreeBetPossible = useSelector(platformIsFreeBetPossibleSelector);

  const freeBetForParlayChecked = useSelector(betSlipIsFreeBetParlayCheckedSelector);
  const setFreeBetParlay = useAction(betSlipSetFreeBetParlayAction);

  const toggle = useCallback(() => setFreeBetParlay(!freeBetForParlayChecked), [freeBetForParlayChecked]);

  if (!isFreeBetPossible) {
    return null;
  }

  const label = (
    <Space value={4}>
      <span>
        {t(sportsbookui_starzbet_betSlip_title_freeBet)}
      </span>

      <span>
        <FreeBetPossibleRange />
      </span>
    </Space>
  );

  return (
    <BetSlipToggle
      checked={freeBetForParlayChecked}
      onChange={toggle}
      label={label}
    />
  );
});
FreeBetCheckBoxForParlay.displayName = "FreeBetCheckBoxForParlay";

export { FreeBetCheckBox, FreeBetCheckBoxForParlay };

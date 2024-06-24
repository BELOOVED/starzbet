import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, isNil, Money, useActionWithBind, useParamSelector } from "@sb/utils";
import { sportsbookui_starzbet_betSlip_bet_oddsBoost } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { selectOddBoostForPicks } from "../../../../../../../Store/OddsBoost/OddsBoostSelectors";
import { singleStakeMoneyByIdSelector } from "../../../../../../../Store/BetSlip/Hooks/UseSingleStakeByIdSelector";
import { singleHash } from "../../../../../../../Store/BetSlip/Model/BetHash";
import { changeApplyBoostForBetAction } from "../../../../../../../Store/BetSlip/BetSlipActions";
import { betSlipOddsBoostSelector } from "../../../../../../../Store/BetSlip/Selectors/BetSlipOddsBoostSelector";
import { type TWithOutcomeId } from "../../BetConstructor/BetConstructorContent/TBetConstructorContent";
import { BetSlipToggle } from "../BetSlipToggle/BetSlipToggle";

const OddsBoostCheckBox = memo<TWithOutcomeId>(({ outcomeId }) => {
  const [t] = useTranslation();

  const money = useParamSelector(singleStakeMoneyByIdSelector, [outcomeId]);
  const boost = useParamSelector(selectOddBoostForPicks, [[outcomeId], money, singleHash]);

  const checked = useParamSelector(betSlipOddsBoostSelector, [outcomeId, singleHash]);
  const changeBoost = useActionWithBind(changeApplyBoostForBetAction, [singleHash, outcomeId]);

  if (isNil(boost)) {
    return null;
  }

  return (
    <BetSlipToggle
      checked={checked}
      onChange={changeBoost}
      label={t(sportsbookui_starzbet_betSlip_bet_oddsBoost)}
      postfix={Money.toFormat(boost, EMoneyFormat.symbolLeft)}
    />
  );
});
OddsBoostCheckBox.displayName = "OddsBoostCheckBox";

export { OddsBoostCheckBox };

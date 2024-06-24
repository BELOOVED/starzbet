import { memo } from "react";
import { EMoneyFormat, type IMoney, Money } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_bet_oddsBoost } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { BetRow } from "../BetRow/BetRow";

interface IOddsBoostRowProps {
  boost: IMoney;
}

const OddsBoostRow = memo<IOddsBoostRowProps>(({ boost }) => {
  const [t] = useTranslation();

  return (
    <BetRow>
      <div>{t(sportsbookui_starzbet_betSlip_bet_oddsBoost)}</div>

      <div>{Money.toFormat(boost, EMoneyFormat.codeRight)}</div>
    </BetRow>
  );
});
OddsBoostRow.displayName = "OddsBoostRow";

export { OddsBoostRow };

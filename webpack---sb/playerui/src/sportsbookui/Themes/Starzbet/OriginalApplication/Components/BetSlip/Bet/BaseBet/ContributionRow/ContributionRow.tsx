import { memo } from "react";
import { EMoneyFormat, type IMoney, Money } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_totalContribution } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { BetRow } from "../BetRow/BetRow";

interface IContributionRowProps {
  contribution: IMoney;
}

const ContributionRow = memo<IContributionRowProps>(({ contribution }) => {
  const [t] = useTranslation();

  return (
    <BetRow>
      <span>{t(sportsbookui_starzbet_title_totalContribution)}</span>

      <span>
        {Money.toFormat(contribution, EMoneyFormat.symbolLeft)}
      </span>
    </BetRow>
  );
});
ContributionRow.displayName = "ContributionRow";

export { ContributionRow };

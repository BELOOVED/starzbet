import { type FC, memo, type PropsWithChildren, type ReactNode } from "react";
import { EMoneyFormat, isNil, Money, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_wageringRules_freeBetProgress,
  platformui_starzbet_bonus_wageringRules_freeSpinsProgress,
  platformui_starzbet_bonus_wageringRules_wageringProgress,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./RuleProgress.module.css";
import { Space } from "../../../../../../common/Components/Space/Space";
import {
  type IWageringProgress,
  wageringProgressSelector,
} from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { RuleProgress } from "./RuleProgress";
import { BonusBalanceToReach } from "./BonusBalanceToReach";

interface IWagerRuleProgressProps {
  playerBonusId: string;
  reverse?: boolean;
}

interface IWagerRuleProgressSingleProps {
  progress: Exclude<IWageringProgress[keyof IWageringProgress], undefined>;
  label: ReactNode;
  reverse?: boolean;
}

const WagerRuleProgressSingle: FC<PropsWithChildren<IWagerRuleProgressSingleProps>> = ({
  progress: {
    progress,
    total,
    current,
  },
  label,
  reverse,
  children,
}) => {
  const currentValue = Money.isMoney(current)
    ? Money.toFormat(current, EMoneyFormat.symbolLeft)
    : current;

  const requiredValue = Money.isMoney(total)
    ? Money.toFormat(total, EMoneyFormat.symbolLeft)
    : total;

  return (
    <Space value={16} vertical>
      <div className={classes.label}>
        {label}
      </div>

      {children}

      <RuleProgress
        currentProgress={progress}
        currentValue={currentValue}
        requiredValue={requiredValue}
        reverse={reverse}
        className={classes.dark}
      />
    </Space>
  );
};
WagerRuleProgressSingle.displayName = "WagerRuleProgressSingle";

const WagerRuleProgress = memo<IWagerRuleProgressProps>(({ playerBonusId, reverse }) => {
  const [t] = useTranslation();
  const progresses = useParamSelector(wageringProgressSelector, [playerBonusId]);

  if (isNil(progresses)) {
    return null;
  }

  const { wagering } = progresses;

  if (!wagering) {
    return null;
  }

  return (
    <WagerRuleProgressSingle
      progress={wagering}
      label={t(platformui_starzbet_bonus_wageringRules_wageringProgress)}
      reverse={reverse}
    >
      <BonusBalanceToReach />
    </WagerRuleProgressSingle>
  );
});
WagerRuleProgress.displayName = "WagerRuleProgress";

const FreeBetRuleProgress = memo<IWagerRuleProgressProps>(({ playerBonusId, reverse }) => {
  const [t] = useTranslation();
  const progresses = useParamSelector(wageringProgressSelector, [playerBonusId]);

  if (isNil(progresses)) {
    return null;
  }

  const { freebetCount, freebetAmount } = progresses;

  return (
    <Space value={8} vertical>
      {
        freebetAmount && (
          <WagerRuleProgressSingle
            progress={freebetAmount}
            label={t(platformui_starzbet_bonus_wageringRules_freeBetProgress)}
            reverse={reverse}
          />
        )
      }

      {
        freebetCount && (
          <WagerRuleProgressSingle
            progress={freebetCount}
            label={t(platformui_starzbet_bonus_wageringRules_freeSpinsProgress)}
            reverse={reverse}
          />
        )
      }
    </Space>
  );
});
FreeBetRuleProgress.displayName = "FreeBetRuleProgress";

const FreeBetWithWageringRuleProgress = memo<IWagerRuleProgressProps>(({ playerBonusId, reverse }) => {
  const progresses = useParamSelector(wageringProgressSelector, [playerBonusId]);

  if (isNil(progresses)) {
    return null;
  }

  const { wagering } = progresses;

  if (wagering) {
    return (
      <WagerRuleProgress playerBonusId={playerBonusId} reverse={reverse} />
    );
  }

  return (
    <FreeBetRuleProgress playerBonusId={playerBonusId} reverse={reverse} />
  );
});
FreeBetWithWageringRuleProgress.displayName = "FreeBetWithWageringRuleProgress";

export {
  WagerRuleProgressSingle,
  WagerRuleProgress,
  FreeBetRuleProgress,
  FreeBetWithWageringRuleProgress,
};

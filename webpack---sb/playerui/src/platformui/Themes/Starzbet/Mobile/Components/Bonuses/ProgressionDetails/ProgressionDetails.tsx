import { type FC, memo, type PropsWithChildren, type ReactNode, useCallback } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_progressionDetails_freeBetsProgressionDetails,
  platformui_starzbet_bonus_progressionDetails_freeSpinsProgressionDetails,
  platformui_starzbet_bonus_progressionDetails_wageringProgressionDetails,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useActionWithBind, useParamSelector, withParamCondition } from "@sb/utils";
import { type EBonusProductEnum, EPlatform_PlayerBonusPhaseEnum } from "@sb/graphql-client";
import classes from "./ProgressionDetails.module.css";
import { deprecatedBonusesBonusResourcesTableMountedAction } from "../../../../../../Store/Bonuses/BonusesActions";
import { isNotCashbackPlayerOrHistoryBonusSelector } from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { EBonusProgressTable } from "../../../../../../Store/Bonuses/Model/Enums/EBonusProgressTable";
import {
  deprecatedProgressionDetailsSelector,
} from "../../../../../../Store/Bonuses/Selectors/DeprecatedBonusResourcesSelectors";
import { Collapse } from "../../../../Components/Bonuses/Collapse/Collapse";
import {
  NotSettledResourcesCount,
} from "../../../../Components/Bonuses/ProgressionDetails/NotSettledResourcesCount/NotSettledResourcesCount";
import { BonusProgressTable } from "./ProgressTable/ProgressTable";

interface IProgressionDetailsProps {
  playerBonusId: string;
}

interface IProgressionDetailsCollapseProps {
  playerBonusId: string;
  type: EBonusProgressTable;
  phase: EPlatform_PlayerBonusPhaseEnum;
  product?: EBonusProductEnum;
  notSettledCount?: ReactNode;
}

const progressionDetailsTypeTranslateMap: Record<EBonusProgressTable, TTKeys> = {
  [EBonusProgressTable.bonus]: platformui_starzbet_bonus_progressionDetails_wageringProgressionDetails,
  [EBonusProgressTable.freeBet]: platformui_starzbet_bonus_progressionDetails_freeBetsProgressionDetails,
  [EBonusProgressTable.freeSpins]: platformui_starzbet_bonus_progressionDetails_freeSpinsProgressionDetails,
};

const ProgressionDetailsCollapse: FC<PropsWithChildren<IProgressionDetailsCollapseProps>> = ({
  children,
  playerBonusId,
  type,
  phase,
  product,
  notSettledCount = null,
}) => {
  const [t] = useTranslation();
  const handleExpanded = useActionWithBind(deprecatedBonusesBonusResourcesTableMountedAction, playerBonusId, phase, product);

  const onToggle = useCallback(
    (expanded: boolean) => {
      if (expanded) {
        handleExpanded();
      }
    },
    [],
  );

  const Title = (
    <div className={classes.mobileTitle}>
      {t(progressionDetailsTypeTranslateMap[type])}

      {notSettledCount}
    </div>
  );

  return (
    <Collapse
      title={Title}
      className={classes.collapse}
      headerClassName={classes.collapseHeader}
      onToggle={onToggle}
    >
      <div className={classes.collapseBody}>
        {children}
      </div>
    </Collapse>
  );
};
ProgressionDetailsCollapse.displayName = "ProgressionDetailsCollapse";

const ProgressionDetails = withParamCondition(
  isNotCashbackPlayerOrHistoryBonusSelector,
  ["playerBonusId"],
  memo<IProgressionDetailsProps>(({ playerBonusId }) => {
    const progressionDetails = useParamSelector(deprecatedProgressionDetailsSelector, [playerBonusId]);

    return (
      <>
        {
          progressionDetails.map((it) => {
            const notSettledCount = it.phase === EPlatform_PlayerBonusPhaseEnum.wager
              ? <NotSettledResourcesCount playerBonusId={playerBonusId} />
              : undefined;

            return (
              <ProgressionDetailsCollapse
                playerBonusId={playerBonusId}
                type={it.type}
                phase={it.phase}
                product={it.product}
                key={it.type}
                notSettledCount={notSettledCount}
              >
                <BonusProgressTable data={it} playerBonusId={playerBonusId} />
              </ProgressionDetailsCollapse>
            );
          })
        }
      </>
    );
  }),
);
ProgressionDetails.displayName = "ProgressionDetails";

export { ProgressionDetails };

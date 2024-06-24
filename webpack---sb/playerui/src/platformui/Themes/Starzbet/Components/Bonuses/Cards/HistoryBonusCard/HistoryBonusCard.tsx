import clsx from "clsx";
import { type FC, memo, type PropsWithChildren } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_bonusType_bonusType } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { getNotNil, useParamSelector } from "@sb/utils";
import classes from "./HistoryBonusCard.module.css";
import { Space } from "../../../../../../../common/Components/Space/Space";
import {
  historyBonusByIdNotNilSelector,
  historyBonusByIdSelector,
  simpleBonusTypeSelector,
} from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { RewardContent } from "../../../../Desktop/Components/Bonuses/TermsAndConditions/RewardTerms/RewardTerms";
import { SIMPLE_BONUS_TYPE_TRANSLATE_MAP } from "../../../../Model/Bonus/BonusTypeTranslateMap";
import { BonusItemContext } from "../../BonusItemContext";
import { BonusName } from "../Common/BonusName/BonusName";
import { BonusDescriptionTitle } from "../Common/BonusDescriptionTitle/BonusDescriptionTitle";
import { PlayerBonusStatus } from "../Common/PlayerBonusStatus/PlayerBonusStatus";

interface IHistoryBonusCardProps {
  historyBonusId: string;
  fixedCardSize?: boolean;
}

interface IHistoryBonusCardDescriptionBlockProps {
  historyBonusId: string;
}

const HistoryBonusCardDescriptionBlock = memo<IHistoryBonusCardDescriptionBlockProps>(({ historyBonusId }) => {
  const [t] = useTranslation();
  const { status } = useParamSelector(historyBonusByIdNotNilSelector, [historyBonusId]);

  const simpleBonusType = useParamSelector(simpleBonusTypeSelector, [historyBonusId, false]);

  const bonusTypeTranslated = t.plain(SIMPLE_BONUS_TYPE_TRANSLATE_MAP[simpleBonusType]);

  return (
    <div className={classes.descriptionBlock}>
      <div>
        {t(platformui_starzbet_bonus_bonusType_bonusType, { bonusType: bonusTypeTranslated })}
      </div>

      <div className={classes.statusWrapper}>
        <RewardContent bonusId={historyBonusId} forAvailable={false} itemClassName={classes.rewardItem} />

        <PlayerBonusStatus status={status} />
      </div>
    </div>
  );
});
HistoryBonusCardDescriptionBlock.displayName = "HistoryBonusCardDescriptionBlock";

const HistoryBonusCard: FC<PropsWithChildren<IHistoryBonusCardProps>> = ({
  historyBonusId,
  fixedCardSize = false,
  children,
}) => {
  const bonus = useParamSelector(historyBonusByIdSelector, [historyBonusId]);
  const {
    bonusDescriptionTitle,
    bonusName,
  } = getNotNil(bonus, ["HistoryBonusCard"], "bonus");

  const context = { bonusId: historyBonusId, forAvailable: false };

  return (
    <BonusItemContext.Provider value={context}>
      <div className={clsx(classes.card, fixedCardSize && classes.fixedWidth)}>
        <Space value={16} vertical>
          <Space value={8} vertical>
            <BonusName name={bonusName} />

            <BonusDescriptionTitle descriptionTitle={bonusDescriptionTitle} />
          </Space>

          <HistoryBonusCardDescriptionBlock historyBonusId={historyBonusId} />
        </Space>

        {children}
      </div>
    </BonusItemContext.Provider>
  );
};
HistoryBonusCard.displayName = "HistoryBonusCard";

export { HistoryBonusCard, HistoryBonusCardDescriptionBlock };

import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import { isVoid, useParamSelector } from "@sb/utils";
import { EPlatform_PlayerBonusStatusEnum } from "@sb/graphql-client";
import classes from "./PlayerBonusCard.module.css";
import { Space } from "../../../../../../../common/Components/Space/Space";
import { playerBonusByIdNotNilSelector } from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { FreeBetWithWageringRuleProgress } from "../../RuleProgress/WagerRuleProgress";
import { ExpireIn } from "../../ExpireIn/ExpireIn";
import { BonusItemContext } from "../../BonusItemContext";
import { BonusName } from "../Common/BonusName/BonusName";
import { BonusDescriptionTitle } from "../Common/BonusDescriptionTitle/BonusDescriptionTitle";
import { PlayerBonusStatus } from "../Common/PlayerBonusStatus/PlayerBonusStatus";

interface IPlayerBonusDetailsCardProps {
  playerBonusId: string;
  fixedCardSize?: boolean;
}

const PlayerBonusCard: FC<PropsWithChildren<IPlayerBonusDetailsCardProps>> = ({
  playerBonusId,
  fixedCardSize = false,
  children,
}) => {
  const {
    expiredAt,
    bonusDescriptionTitle,
    bonusName,
    status,
  } = useParamSelector(playerBonusByIdNotNilSelector, [playerBonusId]);

  const context = { bonusId: playerBonusId, forAvailable: false };

  return (
    <BonusItemContext.Provider value={context}>
      <div className={clsx(classes.card, fixedCardSize && classes.fixedWidth)}>
        <Space value={24} vertical>
          <Space value={8} vertical>
            <BonusName name={bonusName} />

            <BonusDescriptionTitle descriptionTitle={bonusDescriptionTitle} />
          </Space>

          <div className={clsx(classes.expireWrapper, isVoid(expiredAt) && classes.withoutExpire)}>
            <ExpireIn expiredAt={expiredAt} wrapperClassName={classes.expireInner} />

            <PlayerBonusStatus status={status} />
          </div>

          {
            status === EPlatform_PlayerBonusStatusEnum.inProgress && (
              <FreeBetWithWageringRuleProgress playerBonusId={playerBonusId} reverse />
            )
          }
        </Space>

        {children}
      </div>
    </BonusItemContext.Provider>
  );
};
PlayerBonusCard.displayName = "PlayerBonusCard";

export { PlayerBonusCard };

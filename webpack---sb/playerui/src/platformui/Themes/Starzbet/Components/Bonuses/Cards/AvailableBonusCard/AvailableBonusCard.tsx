import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import { isNotVoid, useParamSelector } from "@sb/utils";
import classes from "./AvailableBonusCard.module.css";
import { Space } from "../../../../../../../common/Components/Space/Space";
import { availableBonusByIdNotNilSelector } from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { ExpireIn } from "../../ExpireIn/ExpireIn";
import { BonusItemContext } from "../../BonusItemContext";
import { BonusImage } from "../Common/BonusImage/BonusImage";
import { BonusName } from "../Common/BonusName/BonusName";
import { BonusDescriptionTitle } from "../Common/BonusDescriptionTitle/BonusDescriptionTitle";

interface IAvailableBonusCardProps extends IWithId {
  fixedCardSize?: boolean;
}

const AvailableBonusCard: FC<PropsWithChildren<IAvailableBonusCardProps>> = ({
  id,
  fixedCardSize = false,
  children,
}) => {
  const {
    descriptionFiles,
    descriptionTitle,
    name,
    activityTime,
  } = useParamSelector(availableBonusByIdNotNilSelector, [id]);

  const expiredAt = isNotVoid(activityTime)
    ? Number(activityTime.to)
    : undefined;

  const context = { bonusId: id, forAvailable: true };

  return (
    <BonusItemContext.Provider value={context}>
      <div className={clsx(classes.card, fixedCardSize && classes.fixedWidth)}>
        <BonusImage file={descriptionFiles[0]} />

        <Space value={8} vertical>
          <Space value={24} vertical>
            <BonusName name={name} />

            <BonusDescriptionTitle descriptionTitle={descriptionTitle} />
          </Space>

          <ExpireIn expiredAt={expiredAt} />
        </Space>

        {children}
      </div>
    </BonusItemContext.Provider>
  );
};
AvailableBonusCard.displayName = "AvailableBonusCard";

export { AvailableBonusCard };

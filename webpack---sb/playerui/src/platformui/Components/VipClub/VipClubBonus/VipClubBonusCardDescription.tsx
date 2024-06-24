import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { availableBonusByIdNotNilSelectors } from "../../../Store/Bonuses/Selectors/BonusesSelectors";
import { TranslateRecord } from "../../TranslateRecord/TranslateRecord";

const VipClubBonusCardDescription = memo<IWithId & IWithClassName>(({ id, className }) => {
  const descriptionTitle = useParamSelector(availableBonusByIdNotNilSelectors.descriptionTitle, [id]);

  return descriptionTitle
    ? (
      <p className={className}>
        <TranslateRecord record={descriptionTitle} />
      </p>
    )
    : null;
});
VipClubBonusCardDescription.displayName = "VipClubBonusCardDescription";

export { VipClubBonusCardDescription };

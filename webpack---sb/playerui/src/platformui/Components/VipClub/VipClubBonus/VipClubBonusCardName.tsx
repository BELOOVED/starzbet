import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { availableBonusByIdNotNilSelectors } from "../../../Store/Bonuses/Selectors/BonusesSelectors";
import { TranslateRecord } from "../../TranslateRecord/TranslateRecord";

const VipClubBonusCardName = memo<IWithId & IWithClassName>(({ className, id }) => {
  const name = useParamSelector(availableBonusByIdNotNilSelectors.name, [id]);

  return (
    <span className={className}>
      <TranslateRecord record={name} />
    </span>
  );
});
VipClubBonusCardName.displayName = "VipClubBonusCardName";

export { VipClubBonusCardName };

import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_vipClub_levelNameAsNumber } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type IWithVipClubLevels } from "../../../../../Store/VipClub/VipClubModels";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";

const VipClubLevelRuleNameFallback = memo<IWithVipClubLevels>(({ levels: { from, to } }) => {
  const [t] = useTranslation();

  return <Ellipsis>{t(platformui_starzbet_vipClub_levelNameAsNumber, { from, to })}</Ellipsis>;
});
VipClubLevelRuleNameFallback.displayName = "VipClubLevelRuleNameFallback";

export { VipClubLevelRuleNameFallback };

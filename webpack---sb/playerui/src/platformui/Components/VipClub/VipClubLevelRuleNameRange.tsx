import { memo } from "react";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type IWithVipClubLevels } from "../../Store/VipClub/VipClubModels";
import { Ellipsis } from "../Ellipsis/Ellipsis";
import { TranslateRecord } from "../TranslateRecord/TranslateRecord";

interface IVipClubLevelRuleNameRangeProps extends IWithVipClubLevels {
  name: TTranslateRecord_Fragment[];
}

const VipClubLevelRuleNameRange = memo<IVipClubLevelRuleNameRangeProps>(({ levels: { from, to }, name }) => (
  <Ellipsis>
    <TranslateRecord record={name} />

    {from !== to ? ` ${from} - ${to}` : null}
  </Ellipsis>
));
VipClubLevelRuleNameRange.displayName = "VipClubLevelRuleNameRange";

export { VipClubLevelRuleNameRange };

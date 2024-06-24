import { memo } from "react";
import type { TPlatform_VipClubLevelExtraMedia_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./VipClubLevelRulesExtraMedias.module.css";
import { type IPublicImageProps, PublicImage } from "../../../../../../../common/Components/PublicImage";
import { type IWithVipClubExtraMedias } from "../../../../../../Store/VipClub/VipClubModels";
import { ThemedTranslateRecordHTML } from "../../../ThemedTranslateRecordHTML/ThemedTranslateRecordHTML";

const ExtraMediaIcon = memo<IPublicImageProps>(({ pathToFile }) => (
  <div className={classes.iconWrapper}>
    <PublicImage pathToFile={pathToFile} />
  </div>
));
ExtraMediaIcon.displayName = "ExtraMediaIcon";

const VipClubLevelRuleExtraMedia = memo<TPlatform_VipClubLevelExtraMedia_Fragment>(({ icon, name }) => (
  <div className={classes.extraMedia}>
    {icon ? <ExtraMediaIcon pathToFile={icon.pathToFile} /> : null}

    <ThemedTranslateRecordHTML record={name} className={classes.name} />
  </div>
));
VipClubLevelRuleExtraMedia.displayName = "VipClubLevelRuleExtraMedia";

const VipClubLevelRulesExtraMedias = memo<IWithVipClubExtraMedias>(({ extraMedias }) => (
  <div className={classes.vipClubLevelRulesExtraMedias}>
    {extraMedias.map((extraMedia) => <VipClubLevelRuleExtraMedia {...extraMedia} key={extraMedia.id} />)}
  </div>
));
VipClubLevelRulesExtraMedias.displayName = "VipClubLevelRulesExtraMedias";

export { VipClubLevelRulesExtraMedias };

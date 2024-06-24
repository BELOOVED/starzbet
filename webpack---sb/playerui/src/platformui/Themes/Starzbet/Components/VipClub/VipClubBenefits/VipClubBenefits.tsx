import { memo } from "react";
import { useSelector } from "react-redux";
import type { TPlatform_VipClubLevelExtraMedia_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./VipClubBenefits.module.css";
import { type IPublicImageProps, PublicImage } from "../../../../../../common/Components/PublicImage";
import { vipClubPlayerLevelExtraMediasSelector } from "../../../../../Store/VipClub/Selectors/VipClubLevelRulesSelectors";
import { ThemedTranslateRecordHTML } from "../../ThemedTranslateRecordHTML/ThemedTranslateRecordHTML";
import { VipClubEmptyBenefits } from "../VipClubEmpty/VipClubEmpty";

const ExtraMediaIcon = memo<IPublicImageProps>(({ pathToFile }) => (
  <div className={classes.iconWrapper}>
    <PublicImage pathToFile={pathToFile} />
  </div>
));
ExtraMediaIcon.displayName = "ExtraMediaIcon";

const VipClubExtraMedia = memo<TPlatform_VipClubLevelExtraMedia_Fragment>(({ icon, name, value }) => (
  <div className={classes.extraMedia}>
    <div className={classes.top}>
      {icon ? <ExtraMediaIcon pathToFile={icon.pathToFile} /> : null}

      <ThemedTranslateRecordHTML record={name} />
    </div>

    <ThemedTranslateRecordHTML record={value} />
  </div>
));
VipClubExtraMedia.displayName = "VipClubExtraMedia";

const VipClubBenefits = memo(() => {
  const extraMedias = useSelector(vipClubPlayerLevelExtraMediasSelector);

  if (!extraMedias) {
    return <VipClubEmptyBenefits />;
  }

  return (
    <div className={classes.vipClubBenefits}>
      {extraMedias.map((extraMedia) => <VipClubExtraMedia {...extraMedia} key={extraMedia.id} />)}
    </div>
  );
});
VipClubBenefits.displayName = "VipClubBenefits";

export { VipClubBenefits };

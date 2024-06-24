import { memo } from "react";
import {
  platformui_starzbet_vipClubLeaders_leaderBoard_points,
  platformui_starzbet_vipClubTournaments_potentialReward,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import desktopCardBadgeGold from "../../../../Assets/Images/VipClub/CardBadgeGold/desktop.png";
import desktopCardBadgeGold2x from "../../../../Assets/Images/VipClub/CardBadgeGold/desktop@2x.png";
import desktopCardBadgeSilver from "../../../../Assets/Images/VipClub/CardBadgeSilver/desktop.png";
import desktopCardBadgeSilver2x from "../../../../Assets/Images/VipClub/CardBadgeSilver/desktop@2x.png";
import desktopCardBadgeBronze from "../../../../Assets/Images/VipClub/CardBadgeBronze/desktop.png";
import desktopCardBadgeBronze2x from "../../../../Assets/Images/VipClub/CardBadgeBronze/desktop@2x.png";
import desktopCardBadgeGoldWebp from "../../../../Assets/Images/VipClub/CardBadgeGold/desktop.png_high.webp";
import desktopCardBadgeGold2xWebp from "../../../../Assets/Images/VipClub/CardBadgeGold/desktop@2x.png_high.webp";
import desktopCardBadgeSilverWebp from "../../../../Assets/Images/VipClub/CardBadgeSilver/desktop.png_high.webp";
import desktopCardBadgeSilver2xWebp from "../../../../Assets/Images/VipClub/CardBadgeSilver/desktop@2x.png_high.webp";
import desktopCardBadgeBronzeWebp from "../../../../Assets/Images/VipClub/CardBadgeBronze/desktop.png_high.webp";
import desktopCardBadgeBronze2xWebp from "../../../../Assets/Images/VipClub/CardBadgeBronze/desktop@2x.png_high.webp";
import classes from "../VipClubLeaderBoard.module.css";
import { createSrcSet } from "../../../../../../../common/Utils/CreateSrcSet";
import { IS_WEBP_SUPPORTED } from "../../../../../../../common/Utils/GetImageFormatParam";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { type IVipClubLeaderContentProps, VIP_CLUB_LEADER_AVATAR_SRC_SET } from "../VipClubLeaderBoardCommon";

const cardBadgeToPlayerPlaceMap: Record<number, string> = {
  1: createSrcSet(
    IS_WEBP_SUPPORTED ? desktopCardBadgeGoldWebp : desktopCardBadgeGold,
    IS_WEBP_SUPPORTED ? desktopCardBadgeGold2xWebp : desktopCardBadgeGold2x,
  ),
  2: createSrcSet(
    IS_WEBP_SUPPORTED ? desktopCardBadgeSilverWebp : desktopCardBadgeSilver,
    IS_WEBP_SUPPORTED ? desktopCardBadgeSilver2xWebp : desktopCardBadgeSilver2x,
  ),
  3: createSrcSet(
    IS_WEBP_SUPPORTED ? desktopCardBadgeBronzeWebp : desktopCardBadgeBronze,
    IS_WEBP_SUPPORTED ? desktopCardBadgeBronze2xWebp : desktopCardBadgeBronze2x,
  ),
};

const AvatarImg = withProps("img")({
  width: 80,
  height: 80,
  srcSet: VIP_CLUB_LEADER_AVATAR_SRC_SET,
  alt: "avatar",
  className: classes.vipClubLeaderAvatarImg,
});

const BadgeImg = withProps("img")({
  alt: "badge",
  width: 60,
  height: 60,
});

interface ICardTextProps {
  value: string;
  titleTKey: TTKeys;
}

const CardText = memo<ICardTextProps>(({ value, titleTKey }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubLeaderCardText}>
      <Ellipsis>{t(titleTKey)}</Ellipsis>

      <span className={classes.vipClubLeaderCardMoney}>
        {value}
      </span>
    </div>
  );
});
CardText.displayName = "CardText";

const VipClubLeaderCardContent = memo<IVipClubLeaderContentProps>(({
  place,
  playerMaskedName,
  points,
  prize,
}) => (
  <>
    <div className={classes.vipClubLeaderCardHead}>
      <div className={classes.vipClubLeaderCardAvatar}>
        <AvatarImg />
      </div>

      <div className={classes.vipClubLeaderCardInfo}>
        <div className={classes.vipClubLeaderCardName}>
          <Ellipsis>{playerMaskedName}</Ellipsis>
        </div>

        <div className={classes.vipClubLeaderCardBadge}>
          <BadgeImg srcSet={cardBadgeToPlayerPlaceMap[place]} />
        </div>
      </div>
    </div>

    <div className={classes.vipClubLeaderCardBody}>
      <CardText value={points} titleTKey={platformui_starzbet_vipClubLeaders_leaderBoard_points} />

      {prize ? <CardText value={prize} titleTKey={platformui_starzbet_vipClubTournaments_potentialReward} /> : null}
    </div>
  </>
));
VipClubLeaderCardContent.displayName = "VipClubLeaderCardContent";

export { VipClubLeaderCardContent };

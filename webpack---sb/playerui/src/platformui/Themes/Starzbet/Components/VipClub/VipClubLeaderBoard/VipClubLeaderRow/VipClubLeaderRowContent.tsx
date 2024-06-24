import { memo } from "react";
import {
  platformui_starzbet_vipClubLeaders_leaderBoard_points,
  platformui_starzbet_vipClubTournaments_potentialReward,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import classes from "../VipClubLeaderBoard.module.css";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { type IVipClubLeaderContentProps, VIP_CLUB_LEADER_AVATAR_SRC_SET } from "../VipClubLeaderBoardCommon";

const RowAvatarImg = withProps("img")({
  width: 40,
  height: 40,
  srcSet: VIP_CLUB_LEADER_AVATAR_SRC_SET,
  alt: "avatar",
  className: classes.vipClubLeaderAvatarImg,
});

interface IRowTextProps {
  value: string;
  titleTKey: TTKeys;
}

const RowText = memo<IRowTextProps>(({ value, titleTKey }) => {
  const [t] = useTranslation();

  return (
    <span className={classes.vipClubLeaderRowText}>
      {value}

      &nbsp;
      <span className={classes.vipClubLeaderRowTitle}>{t(titleTKey)}</span>
    </span>
  );
});
RowText.displayName = "RowText";

const VipClubLeaderRowContent = memo<IVipClubLeaderContentProps>(({
  place,
  playerMaskedName,
  points,
  prize,
}) => (
  <>
    <div className={classes.vipClubLeaderRowNum}>
      {place}

      {"."}
    </div>

    <div className={classes.vipClubLeaderRowContent}>
      <div className={classes.vipClubLeaderRowInfo}>
        <div className={classes.vipClubLeaderRowAvatar}>
          <RowAvatarImg />
        </div>

        <div className={classes.vipClubLeaderRowNameAndPoints}>
          <span className={classes.vipClubLeaderRowName}>
            <Ellipsis>
              {playerMaskedName}
            </Ellipsis>
          </span>
        </div>
      </div>

      <div className={classes.vipClubLeaderRowTextWrapper}>
        <RowText titleTKey={platformui_starzbet_vipClubLeaders_leaderBoard_points} value={points} />

        {prize ? <RowText titleTKey={platformui_starzbet_vipClubTournaments_potentialReward} value={prize} /> : null}
      </div>
    </div>
  </>
));
VipClubLeaderRowContent.displayName = "VipClubLeaderRowContent";

export { VipClubLeaderRowContent };

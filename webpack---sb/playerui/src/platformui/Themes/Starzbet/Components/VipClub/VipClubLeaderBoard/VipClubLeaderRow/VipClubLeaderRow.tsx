import clsx from "clsx";
import { createElement, memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_vipClubLeaders_leaderBoard_subtitle } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import type { TPlatform_VipClubLeaderBoardRow_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "../VipClubLeaderBoard.module.css";
import { FadeIn } from "../../../../../../../common/Components/Animations/FadeIn/FadeIn";
import { vipClubLeaderBoardIsPlayerRowSelector } from "../../../../../../Store/VipClub/Selectors/VipClubLeaderBoardSelectors";
import { vipClubActiveTournamentFormattedPrizeByPlaceSelector, vipClubFormatPoints } from "../../../../../../Utils/VipClubPointsFormatter";
import { isVipClubLeader, VIP_CLUB_NUMBER_OF_LEADERS } from "../VipClubLeaderBoardCommon";
import { VipClubLeaderCardContent } from "./VipClubLeaderCardContent";
import { VipClubLeaderRowContent } from "./VipClubLeaderRowContent";

const Subtitle = memo(() => {
  const [t] = useTranslation();

  return (
    <span className={classes.vipClubLeaderBoardSubtitle}>
      {t(platformui_starzbet_vipClubLeaders_leaderBoard_subtitle)}
    </span>
  );
});
Subtitle.displayName = "Subtitle";

const FIRST_ROW_PLACE = VIP_CLUB_NUMBER_OF_LEADERS + 1;

const VipClubLeaderRow = memo<TPlatform_VipClubLeaderBoardRow_Fragment>(({
  place,
  playerMaskedName,
  points: rawPoints,
  playerId,
}) => {
  const isLeader = isVipClubLeader(place);
  const isPlayerRow = useParamSelector(vipClubLeaderBoardIsPlayerRowSelector, [playerId]);

  const prize = useParamSelector(vipClubActiveTournamentFormattedPrizeByPlaceSelector, [place]);

  const className = isLeader ? classes.vipClubLeaderCard : classes.vipClubLeaderRow;

  const componentType = isLeader ? VipClubLeaderCardContent : VipClubLeaderRowContent;

  const points = vipClubFormatPoints(rawPoints);

  const style = { order: place };

  return (
    <FadeIn className={clsx(className, isPlayerRow && classes.playerRow)} style={style} data-place={place}>
      {place === FIRST_ROW_PLACE ? <Subtitle /> : null}

      {
        createElement(
          componentType,
          {
            place,
            playerMaskedName,
            points,
            prize,
          },
        )
      }
    </FadeIn>
  );
});
VipClubLeaderRow.displayName = "VipClubLeaderRow";

export { VipClubLeaderRow };

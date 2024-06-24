import desktopWebp from "../../../Assets/Images/VipClub/Avatar/desktop.png_high.webp";
import desktop from "../../../Assets/Images/VipClub/Avatar/desktop.png";
import desktop2xWebp from "../../../Assets/Images/VipClub/Avatar/desktop@2x.png_high.webp";
import desktop2x from "../../../Assets/Images/VipClub/Avatar/desktop@2x.png";
import { createSrcSet } from "../../../../../../common/Utils/CreateSrcSet";
import { IS_WEBP_SUPPORTED } from "../../../../../../common/Utils/GetImageFormatParam";

const VIP_CLUB_LEADER_AVATAR_SRC_SET = createSrcSet(
  IS_WEBP_SUPPORTED ? desktopWebp : desktop,
  IS_WEBP_SUPPORTED ? desktop2xWebp : desktop2x,
);

const VIP_CLUB_LEADER_PLACES_ARRAY = [1, 2, 3];
const VIP_CLUB_NUMBER_OF_LEADERS = VIP_CLUB_LEADER_PLACES_ARRAY.length;

interface IVipClubLeaderContentProps {
  place: number;
  playerMaskedName: string;
  points: string;
  prize: string | null;
}

const isVipClubLeader = (place: number) => VIP_CLUB_LEADER_PLACES_ARRAY.includes(place);

export {
  VIP_CLUB_LEADER_AVATAR_SRC_SET,
  VIP_CLUB_NUMBER_OF_LEADERS,
  isVipClubLeader,
  type IVipClubLeaderContentProps,
};

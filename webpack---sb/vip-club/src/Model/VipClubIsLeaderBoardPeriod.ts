import { EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";

const vipClubIsLeaderBoardPeriod = (candidate: string): candidate is  EPlatform_VipClubLeaderBoardPeriod =>
  Object.values(EPlatform_VipClubLeaderBoardPeriod).includes(candidate);

export { vipClubIsLeaderBoardPeriod };

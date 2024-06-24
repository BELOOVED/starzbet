import { EPlatform_PlayerBonusStatusEnum } from "@sb/graphql-client";

const activePlayerBonusStatuses: EPlatform_PlayerBonusStatusEnum[] = [
  EPlatform_PlayerBonusStatusEnum.claimed,
  EPlatform_PlayerBonusStatusEnum.inProgress,
];

const finishedPlayerBonusStatuses: EPlatform_PlayerBonusStatusEnum[] = [
  EPlatform_PlayerBonusStatusEnum.won,
  EPlatform_PlayerBonusStatusEnum.lost,
  EPlatform_PlayerBonusStatusEnum.cancelled,
  EPlatform_PlayerBonusStatusEnum.completed,
  EPlatform_PlayerBonusStatusEnum.expired,
];

export {
  activePlayerBonusStatuses,
  finishedPlayerBonusStatuses,
};

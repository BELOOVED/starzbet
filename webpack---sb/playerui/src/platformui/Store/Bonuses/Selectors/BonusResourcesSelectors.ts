import { createMemoSelector, getNotNil, isNotNil } from "@sb/utils";
import {
  EBonusProductEnum,
  EPlatform_BonusTypeEnum,
  EPlatform_PlayerBonusPhaseEnum,
  type TPageInfo_Fragment,
} from "@sb/graphql-client";
import { type TPlatform_PlayerBonusResourceRead_Fragment } from "@sb/graphql-client/PlayerUI";
import { calcPercentage, type IWitchCurrentPercentage } from "../Utils/BonusResourcesUtils";
import { EBonusProgressTable } from "../Model/Enums/EBonusProgressTable";
import { type IWithPlatformBonusesState } from "../BonusesInitialState";
import {
  isFreeBetBonusSizeHaveCasinoRule,
  isFreeBetBonusSizeHaveSportRule,
  isPlayerBonusOnWageringStage,
} from "../Utils/CommonBonusUtils";
import { platformBonusesSelectors, playerOrHistoryBonusByIdNotNilSelector } from "./BonusesSelectors";

const bonusResourcePageInfoSelector = (
  state: IWithPlatformBonusesState,
  playerBonusId: string,
  phase: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => getNotNil(
  platformBonusesSelectors.resources(state)[playerBonusId]?.[phase]?.[product ?? "all"]?.pageInfo,
  ["bonusResourcePageInfoSelector", playerBonusId, phase, product ?? "all"],
  "pageInfo",
);

type TExtendedBonusResource = TPlatform_PlayerBonusResourceRead_Fragment & IWitchCurrentPercentage

interface IProgressionDetailsData {
  type: EBonusProgressTable;
  phase: EPlatform_PlayerBonusPhaseEnum;
  product?: EBonusProductEnum;
  data: {
    records: TExtendedBonusResource[];
    pageInfo: TPageInfo_Fragment;
  } | null;
}

const resourcesForPlayerBonusSelector = (
  state: IWithPlatformBonusesState,
  playerBonusId: string,
) => platformBonusesSelectors.resources(state)[playerBonusId];

const progressionDetailsSelector = createMemoSelector(
  [
    playerOrHistoryBonusByIdNotNilSelector,
    resourcesForPlayerBonusSelector,
  ],
  (bonus, bonusResources): IProgressionDetailsData[] => {
    const bonusSize = bonus.bonusBonusSize;
    const totalWagering = bonus.totalWagering;

    switch (bonus.bonusType) {
      case EPlatform_BonusTypeEnum.cashback: {
        throw new Error("[progressionDetailsSelector] progressionDetails not available for CASHBACK bonus");
      }
      case EPlatform_BonusTypeEnum.firstDeposit:
      case EPlatform_BonusTypeEnum.custom: {
        const resources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.wager]?.["all"];

        return [{
          type: EBonusProgressTable.bonus,
          phase: EPlatform_PlayerBonusPhaseEnum.wager,
          data: isNotNil(resources)
            ? {
              records: calcPercentage(resources.records, totalWagering?.external),
              pageInfo: getNotNil(resources.pageInfo, ["progressionDetailsSelector", "firstDeposit/custom"], "pageInfo"),
            }
            : null,
        }];
      }
      case EPlatform_BonusTypeEnum.internalFreeBet: {
        const resources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.internalFreeBet]?.["all"];

        return [{
          type: EBonusProgressTable.freeBet,
          phase: EPlatform_PlayerBonusPhaseEnum.internalFreeBet,
          data: isNotNil(resources)
            ? {
              records: resources.records,
              pageInfo: getNotNil(resources.pageInfo, ["progressionDetailsSelector", "internalFreeBet"], "pageInfo"),
            }
            : null,
        }];
      }
      case EPlatform_BonusTypeEnum.externalFreeBet: {
        const result: IProgressionDetailsData[] = [];
        const haveSportRule = isFreeBetBonusSizeHaveSportRule(bonusSize);
        const haveCasinoRule = isFreeBetBonusSizeHaveCasinoRule(bonusSize);

        // if externalFreeBet bonus bonusSize have sport rule - freeBet table should be included
        if (haveSportRule) {
          const sportResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.sports];

          result.push({
            type: EBonusProgressTable.freeBet,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.sports,
            data: isNotNil(sportResources)
              ? {
                records: sportResources.records,
                pageInfo: getNotNil(sportResources.pageInfo, ["progressionDetailsSelector", "externalFreeBet"], "pageInfo"),
              }
              : null,
          });
        }

        // if external bonus bonusSize have casino rule - freeSpins table should be included
        if (haveCasinoRule) {
          const casinoResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.casino];

          result.push({
            type: EBonusProgressTable.freeSpins,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.casino,
            data: isNotNil(casinoResources)
              ? {
                records: casinoResources.records,
                pageInfo: getNotNil(casinoResources.pageInfo, ["progressionDetailsSelector", "externalFreeBet"], "pageInfo"),
              }
              : null,
          });
        }

        return result;
      }
      case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering: {
        const result: IProgressionDetailsData[] = [];

        const isWageringStage = isPlayerBonusOnWageringStage(bonus);

        if (isWageringStage) {
          const wagerResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.wager]?.["all"];

          result.push({
            type: EBonusProgressTable.bonus,
            phase: EPlatform_PlayerBonusPhaseEnum.wager,
            data: isNotNil(wagerResources)
              ? {
                records: calcPercentage(wagerResources.records, totalWagering?.external),
                pageInfo: getNotNil(wagerResources.pageInfo, ["progressionDetailsSelector", "internalFreeSpinsWithWagering", "wager"], "pageInfo"),
              }
              : null,
          });
        }

        const freeBetResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.internalFreeBet]?.["all"];

        result.push({
          type: EBonusProgressTable.freeBet,
          phase: EPlatform_PlayerBonusPhaseEnum.internalFreeBet,
          data: isNotNil(freeBetResources)
            ? {
              records: freeBetResources.records,
              pageInfo: getNotNil(freeBetResources.pageInfo, ["progressionDetailsSelector", "internalFreeSpinsWithWagering", "internalFreeBet"], "pageInfo"),
            }
            : null,
        });

        return result;
      }
      case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
        const result: IProgressionDetailsData[] = [];

        const isWageringStage = isPlayerBonusOnWageringStage(bonus);
        const haveCasinoRule = isFreeBetBonusSizeHaveCasinoRule(bonusSize);
        const haveSportRule = isFreeBetBonusSizeHaveSportRule(bonusSize);

        if (isWageringStage) {
          const wagerResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.wager]?.["all"];

          result.push({
            type: EBonusProgressTable.bonus,
            phase: EPlatform_PlayerBonusPhaseEnum.wager,
            data: isNotNil(wagerResources)
              ? {
                records: calcPercentage(wagerResources.records, totalWagering?.external),
                pageInfo: getNotNil(wagerResources.pageInfo, ["progressionDetailsSelector", "externalFreeSpinsWithWagering", "wager"], "pageInfo"),
              }
              : null,
          });
        }

        if (haveSportRule) {
          const freeBetSportResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.sports];

          result.push({
            type: EBonusProgressTable.freeBet,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.sports,
            data: isNotNil(freeBetSportResources)
              ? {
                records: freeBetSportResources.records,
                pageInfo: getNotNil(freeBetSportResources.pageInfo, ["progressionDetailsSelector", "externalFreeSpinsWithWagering", "externalFreeBet", "sport"], "pageInfo"),
              }
              : null,
          });
        }

        if (haveCasinoRule) {
          const freeBetCasinoResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.casino];

          result.push({
            type: EBonusProgressTable.freeSpins,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.casino,
            data: isNotNil(freeBetCasinoResources)
              ? {
                records: freeBetCasinoResources.records,
                pageInfo: getNotNil(freeBetCasinoResources.pageInfo, ["progressionDetailsSelector", "externalFreeSpinsWithWagering", "externalFreeBet", "casino"], "pageInfo"),
              }
              : null,
          });
        }

        return result;
      }
      default:
        throw new Error("[progressionDetailsSelector] unknown bonus type");
    }
  },
);

export {
  type TExtendedBonusResource,
  type IProgressionDetailsData,
  bonusResourcePageInfoSelector,
  progressionDetailsSelector,
};

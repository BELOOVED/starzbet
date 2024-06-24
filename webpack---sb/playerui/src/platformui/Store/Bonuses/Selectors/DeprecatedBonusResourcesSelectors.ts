import { createMemoSelector, createOptionalPropertySelector } from "@sb/utils";
import {
  EBonusProductEnum,
  EPlatform_BonusTypeEnum,
  EPlatform_PlayerBonusPhaseEnum,
  type TPageInfo_Fragment,
} from "@sb/graphql-client";
import {
  deprecatedGetExtendedResources,
  getExtendedBonusResourcesOnFinalPhase,
  getExtendedTransactions,
  type IDeprecatedProgressData,
} from "../Utils/DeprecatedBonusResourcesUtils";
import { calcPercentage, type IWitchCurrentPercentage } from "../Utils/BonusResourcesUtils";
import { type IWithPlatformBonusesState } from "../BonusesInitialState";
import { EBonusProgressTable } from "../Model/Enums/EBonusProgressTable";
import {
  isFreeBetBonusSizeHaveCasinoRule,
  isFreeBetBonusSizeHaveSportRule,
  isPlayerBonusOnWageringStage,
} from "../Utils/CommonBonusUtils";
import {
  historyBonusByIdSelector,
  platformBonusesSelector,
  playerBonusByIdSelector,
  playerOrHistoryBonusByIdNotNilSelector,
} from "./BonusesSelectors";

/**
 * @deprecated
 */
const deprecatedBonusResourcesSelector = (state: IWithPlatformBonusesState, playerBonusId: string) =>
  platformBonusesSelector(state).deprecatedBonusResources[playerBonusId] ?? null;

/**
 * @deprecated
 */
const bonusResourcesSelector = (state: IWithPlatformBonusesState, playerBonusId: string) =>
  platformBonusesSelector(state).bonusResources[playerBonusId];

/**
 * @deprecated
 */
const bonusResourcesSegregatedSelector = (state: IWithPlatformBonusesState, playerBonusId: string) =>
  platformBonusesSelector(state).bonusResourcesSegregated[playerBonusId];

/**
 * @deprecated
 */
const deprecatedPlayerBonusResourcePageInfoSelector = (
  state: IWithPlatformBonusesState,
  playerBonusId: string,
  phase?: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => {
  const bonusResources = bonusResourcesSelector(state, playerBonusId);
  const bonusResourcesSegregated = bonusResourcesSegregatedSelector(state, playerBonusId);

  if (!phase) {
    return bonusResources?.pageInfo;
  }

  return bonusResourcesSegregated?.[phase]?.[product ?? "all"]?.pageInfo;
};

/**
 * @deprecated
 */
const bonusResourceExtendedTransactionsSelector = createMemoSelector(
  [deprecatedBonusResourcesSelector],
  (bonusResources) => bonusResources ? getExtendedTransactions(bonusResources) : null,
);

/**
 * @deprecated
 */
interface IDeprecatedExtendedProgressionDetailsData {
  type: EBonusProgressTable;
  records: (IDeprecatedProgressData & IWitchCurrentPercentage)[];
  loading: boolean;
  pageInfo?: TPageInfo_Fragment | null; // Nil when first loading
  /**
   * for segregated tables by phase
   */
  phase: EPlatform_PlayerBonusPhaseEnum;
  /**
   * for segregated external tables by phase and product
   */
  product?: EBonusProductEnum;
}

/**
 * @deprecated
 */
const deprecatedProgressionDetailsSelector = createMemoSelector(
  [
    playerOrHistoryBonusByIdNotNilSelector,
    bonusResourcesSegregatedSelector,
  ],
  (bonus, bonusResources): IDeprecatedExtendedProgressionDetailsData[] => {
    const bonusSize = bonus.bonusBonusSize;
    const totalWagering = bonus.totalWagering;

    switch (bonus.bonusType) {
      case EPlatform_BonusTypeEnum.cashback: {
        throw new Error("[progressionDetailsSelector] progressionDetails not available for CASHBACK bonus");
      }
      case EPlatform_BonusTypeEnum.firstDeposit:
      case EPlatform_BonusTypeEnum.custom: {
        const resources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.wager]?.["all"];

        const common = {
          type: EBonusProgressTable.bonus,
          phase: EPlatform_PlayerBonusPhaseEnum.wager,
        };

        if (!resources) {
          return [{ ...common, records: [], loading: true }];
        }

        return [{
          ...common,
          records: calcPercentage(deprecatedGetExtendedResources(resources.records), totalWagering?.external),
          loading: resources.loading,
          pageInfo: resources.pageInfo,
        }];
      }
      case EPlatform_BonusTypeEnum.internalFreeBet: {
        const resources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.internalFreeBet]?.["all"];

        const common = {
          type: EBonusProgressTable.freeBet,
          phase: EPlatform_PlayerBonusPhaseEnum.internalFreeBet,
        };

        if (!resources) {
          return [{ ...common, records: [], loading: true }];
        }

        return [{
          ...common,
          records: deprecatedGetExtendedResources(resources.records),
          loading: resources.loading,
          pageInfo: resources.pageInfo,
        }];
      }
      case EPlatform_BonusTypeEnum.externalFreeBet: {
        const result: IDeprecatedExtendedProgressionDetailsData[] = [];
        const haveSportRule = isFreeBetBonusSizeHaveSportRule(bonusSize);
        const haveCasinoRule = isFreeBetBonusSizeHaveCasinoRule(bonusSize);

        const sportResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.sports];
        const casinoResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.casino];

        // if externalFreeBet bonus bonusSize have sport rule - freeBet table should be included
        if (haveSportRule) {
          const common = {
            type: EBonusProgressTable.freeBet,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.sports,
          };

          if (!sportResources) {
            result.push({ ...common, records: [], loading: false });
          } else {
            result.push({
              ...common,
              records: deprecatedGetExtendedResources(sportResources.records),
              loading: sportResources.loading,
              pageInfo: sportResources.pageInfo,
            });
          }
        }

        // if external bonus bonusSize have casino rule - freeSpins table should be included
        if (haveCasinoRule) {
          const common = {
            type: EBonusProgressTable.freeSpins,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.casino,
          };

          if (!casinoResources) {
            result.push({ ...common, records: [], loading: false });
          } else {
            result.push({
              ...common,
              records: deprecatedGetExtendedResources(casinoResources.records),
              loading: casinoResources.loading,
              pageInfo: casinoResources.pageInfo,
            });
          }
        }

        return result;
      }
      case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering: {
        const result: IDeprecatedExtendedProgressionDetailsData[] = [];

        const isWageringStage = isPlayerBonusOnWageringStage(bonus);

        const freeBetResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.internalFreeBet]?.["all"];
        const wagerResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.wager]?.["all"];

        const common = {
          type: EBonusProgressTable.freeBet,
          phase: EPlatform_PlayerBonusPhaseEnum.internalFreeBet,
        };

        if (!freeBetResources) {
          result.push({ ...common, records: [], loading: true });
        } else {
          result.push({
            ...common,
            records: deprecatedGetExtendedResources(freeBetResources.records),
            loading: freeBetResources.loading,
            pageInfo: freeBetResources.pageInfo,
          });
        }

        if (!isWageringStage) {
          return result;
        } else {
          const common = {
            type: EBonusProgressTable.bonus,
            phase: EPlatform_PlayerBonusPhaseEnum.wager,
          };

          if (!wagerResources) {
            result.splice(0, 0, { ...common, records: [], loading: true });
          } else {
            result.splice(
              0,
              0,
              {
                ...common,
                records: calcPercentage(deprecatedGetExtendedResources(wagerResources.records), totalWagering?.external),
                loading: wagerResources.loading,
                pageInfo: wagerResources.pageInfo,
              },
            );
          }

          return result;
        }
      }
      case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
        const result: IDeprecatedExtendedProgressionDetailsData[] = [];

        const isWageringStage = isPlayerBonusOnWageringStage(bonus);

        const haveCasinoRule = isFreeBetBonusSizeHaveCasinoRule(bonusSize);
        const haveSportRule = isFreeBetBonusSizeHaveSportRule(bonusSize);

        const freeBetSportResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.sports];
        const freeBetCasinoResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.externalFreeBet]?.[EBonusProductEnum.casino];
        const wagerResources = bonusResources?.[EPlatform_PlayerBonusPhaseEnum.wager]?.["all"];

        if (haveSportRule) {
          const common = {
            type: EBonusProgressTable.freeBet,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.sports,
          };

          if (!freeBetSportResources) {
            result.push({ ...common, records: [], loading: true });
          } else {
            result.push({
              ...common,
              records: deprecatedGetExtendedResources(freeBetSportResources.records),
              loading: freeBetSportResources.loading,
              pageInfo: freeBetSportResources.pageInfo,
            });
          }
        }

        if (haveCasinoRule) {
          const common = {
            type: EBonusProgressTable.freeSpins,
            phase: EPlatform_PlayerBonusPhaseEnum.externalFreeBet,
            product: EBonusProductEnum.casino,
          };

          if (!freeBetCasinoResources) {
            result.push({ ...common, records: [], loading: true });
          } else {
            result.push({
              ...common,
              records: deprecatedGetExtendedResources(freeBetCasinoResources.records),
              loading: freeBetCasinoResources.loading,
              pageInfo: freeBetCasinoResources.pageInfo,
            });
          }
        }

        if (!isWageringStage) {
          return result;
        }

        const common = {
          type: EBonusProgressTable.bonus,
          phase: EPlatform_PlayerBonusPhaseEnum.wager,
        };

        if (!wagerResources) {
          result.splice(0, 0, { ...common, records: [], loading: true });
        } else {
          result.splice(
            0,
            0,
            {
              ...common,
              records: calcPercentage(deprecatedGetExtendedResources(wagerResources.records), totalWagering?.external),
              loading: wagerResources.loading,
              pageInfo: wagerResources.pageInfo,
            },
          );
        }

        return result;
      }
      default:
        throw new Error("[progressionDetailsSelector] unknown bonus type");
    }
  },
);

const playerBonusTotalWageringSelector = createOptionalPropertySelector(
  playerBonusByIdSelector,
  ["totalWagering", "external"],
);

const historyBonusTotalWageringSelector = createOptionalPropertySelector(
  historyBonusByIdSelector,
  ["totalWagering", "external"],
);

/**
 * @deprecated
 */
const bonusResourcesOnFinalPhaseSelector = (state: IWithPlatformBonusesState, playerBonusId: string) => {
  const bonusResources = deprecatedBonusResourcesSelector(state, playerBonusId);

  if (!bonusResources) {
    return null;
  }

  const playerBonusTotalWagering = playerBonusTotalWageringSelector(state, playerBonusId);
  const historyBonusTotalWagering = historyBonusTotalWageringSelector(state, playerBonusId);

  const bonusResourcesOnFinalPhase = getExtendedBonusResourcesOnFinalPhase(bonusResources);

  const totalWagering = playerBonusTotalWagering || historyBonusTotalWagering;

  if (!totalWagering) {
    return bonusResourcesOnFinalPhase;
  }

  return calcPercentage(bonusResourcesOnFinalPhase, totalWagering);
};

export {
  type IDeprecatedExtendedProgressionDetailsData,
  bonusResourcesOnFinalPhaseSelector,
  deprecatedProgressionDetailsSelector,
  bonusResourceExtendedTransactionsSelector,
  deprecatedPlayerBonusResourcePageInfoSelector,
};

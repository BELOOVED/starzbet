import { type IMoney, isNotVoid } from "@sb/utils";
import { type EBonusProductEnum, EPlatform_PlayerBonusPhaseEnum } from "@sb/graphql-client";
import {
  type TPlatform_PlayerBonusResource_Fragment,
  type TPlatform_PlayerBonusResourceDeprecated_Fragment,
  type TPlatform_TransactionRequestDataPayloadForBonusResource_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { getBonusProductByProductCode } from "./CommonBonusUtils";

interface IDeprecatedExtendedPlayerBonusResource extends TPlatform_PlayerBonusResourceDeprecated_Fragment {
  betStake: IMoney;
  betId: string;
  currentPercentage?: number;
}

interface IDeprecatedProgressData {
  id: string;
  currentWagering?: IMoney;
  heldAt?: string;
  heldAtPhase?: EPlatform_PlayerBonusPhaseEnum;
  contributionPct?: number;
  product: EBonusProductEnum;
  betId: string;
  freeBetNumber?: number;
  payload: TPlatform_TransactionRequestDataPayloadForBonusResource_Fragment | null;
  stake: IMoney;
  payout: IMoney;
}

/**
 * @deprecated
 */
const getExtendedTransactions = (bonusResources: TPlatform_PlayerBonusResourceDeprecated_Fragment[]) =>
// flat transactions
  bonusResources.reduce(
    (
      acc,
      {
        contributionPct,
        transactionRequests,
        id,
        heldAtPhase,
      },
    ) => {
      const extendedAcc = [...acc];

      transactionRequests.forEach(({ transactions }) => {
        transactions.forEach((transaction) => {
          extendedAcc.push({
            ...transaction,
            contributionPct,
            resourceId: id,
            heldAtPhase,
          });
        });
      });

      return extendedAcc;
    },
    [],
  );

/**
 * @deprecated
 */
const getResourcesOnFinalPhase = ({ heldAtPhase }: TPlatform_PlayerBonusResourceDeprecated_Fragment) =>
  heldAtPhase === EPlatform_PlayerBonusPhaseEnum.wager || heldAtPhase === EPlatform_PlayerBonusPhaseEnum.internalFreeBet;

/**
 * @deprecated
 */
const getExtendedBonusResourcesOnFinalPhase = (
  bonusResources: TPlatform_PlayerBonusResourceDeprecated_Fragment[],
): IDeprecatedExtendedPlayerBonusResource[] =>
  bonusResources.filter(getResourcesOnFinalPhase)
    .map<IDeprecatedExtendedPlayerBonusResource>((resource) => {
      const details = resource.transactionRequests[0]?.transactions[0]?.details;

      if (!details) {
        throw new Error(`getExtendedBonusResourcesOnFinalPhase error: there are no details in resource ${resource.id}`);
      }
      const payload = details.payload;

      switch (payload.__typename) {
        case "Platform_SportsbookBetData": {
          return { ...resource, betStake: payload.bet.stake, betId: payload.bet.betId };
        }
        case "Platform_SportsbookBetRequestBatchData": {
          return { ...resource, betStake: payload.bets[0].bet.stake, betId: payload.bets[0].bet.betId };
        }
        default: {
          throw new Error(`getExtendedBonusResourcesOnFinalPhase error: there are incorrect request payload data in resource ${resource.id} in details ${details.id}`);
        }
      }
    });

/**
 * @deprecated
 */
const deprecatedGetExtendedResources = (
  resources: TPlatform_PlayerBonusResource_Fragment[],
) => resources.map(deprecatedGetExtendedResource);

/**
 * @deprecated
 */
const deprecatedGetExtendedResource = (resource: TPlatform_PlayerBonusResource_Fragment): IDeprecatedProgressData => {
  /**
   * TPlatform_TransactionRequestDataPayloadForBonusResource_Fragment pick just few payload types,
   * so we take any record with selected payload types
   */
  const request = resource?.transactionRequests?.find(({ data: { payload } }) => isNotVoid(payload));

  /*if (!request) {
      throw new Error(`[getExtendedResource] error: there are no request in resource ${resource.id}`);
    }*/

  const common = ({
    id: resource.id,
    currentWagering: resource.currentWagering,
    heldAt: resource.heldAt,
    heldAtPhase: resource.heldAtPhase,
    contributionPct: resource.contributionPct,
    product: getBonusProductByProductCode(resource.product),
    freeBetNumber: resource.freeBetNumber,
    payload: request?.data?.payload,
    stake: resource.stake,
    payout: resource.payout,
  });
  const payload = request?.data?.payload;

  if (!payload) {
    // @ts-ignore
    return common;
  }

  switch (payload.__typename) {
    case "Platform_SportsbookBetRequestBatchData": {
      return {
        ...common,
        betId: payload.bets[0].bet.betId,
      };
    }
    // case "Platform_EvolutionDebitRequestData":
    // case "Platform_BGamingFreeSpinsRequestData":
    // case "Platform_OneTouchBetRequestData":
    // case "Platform_PragmaticPlayBetRequestData":
    // case "Platform_AbsoluteLiveGamingDebitRequestData":
    // case "Platform_EndorphinaBetRequestData":
    // case "Platform_EzugiDebitRequestData":
    // case "Platform_FalconGamingUserWithdrawalRequestData":
    // case "Platform_LeapGamingPlaceBetRequestData":
    // case "Platform_LuckyStreakMoveFundsRequestData":
    default: {
      return {
        ...common,
        betId: resource.id,
      };
    }
  }
};

export {
  getExtendedTransactions,
  getExtendedBonusResourcesOnFinalPhase,
  deprecatedGetExtendedResources,
  type IDeprecatedProgressData,
};

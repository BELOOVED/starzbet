import { getNotNil, type IMoney } from "@sb/utils";
import {
  type TPlatform_PlayerBonusResourceRead_Fragment,
  type TPlatform_PlayerBonusResourceReadPayloadData_Fragment,
  type TPlatform_PlayerBonusSportsbookResource_Fragment,
} from "@sb/graphql-client/PlayerUI";

interface IWitchCurrentPercentage {
  currentPercentage?: number;
}

const calcPercentage = <T extends { currentWagering?: IMoney | null; }>(
  bonusResources: T[],
  totalWagering?: IMoney,
): (T & IWitchCurrentPercentage)[] =>
    bonusResources.map((resource) => {
      if (!resource.currentWagering || !totalWagering) {
        return resource;
      } else {
        const contributionAmount = Number(resource.currentWagering.amount);
        const percentage = contributionAmount / Number(totalWagering.amount);

        return ({ ...resource, currentPercentage: Math.floor(percentage * 100) });
      }
    });

const getResourceStake = <R extends TPlatform_PlayerBonusResourceRead_Fragment>(resource: R) => {
  const payload = getNotNil(resource.payload, ["getResourceStake"], "payload");

  switch (payload.data.__typename) {
    case "Platform_PlayerBonusDepositResource": {
      return payload.data.depositAmount;
    }
    case "Platform_PlayerBonusGameResource":
    case "Platform_PlayerBonusSportsbookResource": {
      return payload.data.stake;
    }
    default: {
      throw new Error(`[getResourceStake] not supported payload.data: ${JSON.stringify(payload.data)}`);
    }
  }
};

const isSportsbookResourcePayload = (
  payload: TPlatform_PlayerBonusResourceReadPayloadData_Fragment,
): payload is TPlatform_PlayerBonusSportsbookResource_Fragment =>
  payload.__typename === "Platform_PlayerBonusSportsbookResource";

export {
  type IWitchCurrentPercentage,
  calcPercentage,
  getResourceStake,
  isSportsbookResourcePayload,
};

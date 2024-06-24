import type {
  TPlatform_Bonus_Fragment,
  TPlatform_Bonus_Registration_Fragment,
  TPlatform_Bonus_Template_Fragment,
  TPlatform_PlayerBonus_Fragment,
  TPlatform_PlayerBonusResource_Fragment,
  TPlatform_PlayerBonusResourceDeprecated_Fragment,
  TPlatform_PlayerBonusResourceRead_Fragment,
} from "@sb/graphql-client/PlayerUI";
import {
  type EBonusProductEnum,
  type EPlatform_PlayerBonusPhaseEnum,
  type TPageInfo_Fragment,
} from "@sb/graphql-client";
import { type IMoney } from "@sb/utils";
import {
  type IBonusCanceledPayload,
  type IBonusCompletedPayload,
  type IBonusCreatedPayload,
  type IBonusLostPayload,
  type IBonusWonPayload,
  type TBonusActivatedPayload,
} from "../../Model/BonusWebSocketEvents";
import { type TProductFilterKey } from "./Utils/BonusesUISortFilterUtils";
import { type EBonusTypeCommonFilter } from "./Model/Enums/EBonusTypeCommonFilter";
import { type EBonusSortFilter } from "./Model/Enums/EBonusSortFilter";

interface IDeprecatedResourcesPage {
  loading: boolean;
  records: TPlatform_PlayerBonusResource_Fragment[];
  pageInfo: TPageInfo_Fragment | null; // null when start first loading
}

interface IResourcesPage {
  records: TPlatform_PlayerBonusResourceRead_Fragment[];
  pageInfo: TPageInfo_Fragment | null; // null when start first loading
}

interface IWithPlatformBonusesState {
  platformBonuses: {
    availableBonuses: TPlatform_Bonus_Fragment[];
    playerBonuses: TPlatform_PlayerBonus_Fragment[];
    historyBonuses: TPlatform_PlayerBonus_Fragment[];
    registrationBonuses: TPlatform_Bonus_Registration_Fragment[];
    /**
     * segregated by phase and product resources with separated paginator
     * for custom and internal bonuses segregate just by phase (product === "all")
     * for external also by product ("sport" | "casino")
     */
    resources: Record<string, Partial<Record<EPlatform_PlayerBonusPhaseEnum, Partial<Record<EBonusProductEnum | "all", IResourcesPage>>>>>;
    /**
     * @deprecated
     * use resources instead
     */
    deprecatedBonusResources: Record<string, TPlatform_PlayerBonusResourceDeprecated_Fragment[]>;
    /**
     * @deprecated
     * use resources instead
     * not segregated by phase resources - for replace deprecatedBonusResources
     * playerBonusId to resourcesPage map;
     */
    bonusResources: Record<string, IDeprecatedResourcesPage>;
    /**
     * @deprecated
     * use resources instead
     * segregated by phase and product resources with separated paginators
     * for custom and internal bonuses segregate just by phase (product === "all")
     * for external also by product ("sport" | "casino")
     */
    bonusResourcesSegregated: Record<string, Partial<Record<EPlatform_PlayerBonusPhaseEnum, Partial<Record<EBonusProductEnum | "all", IDeprecatedResourcesPage>>>>>;
    bonusTypeCommonFilter: EBonusTypeCommonFilter | null;
    bonusProductFilter: TProductFilterKey;
    sortBy: EBonusSortFilter | null;
    /**
     * used only for history bonuses
     */
    showOnlyCompleted: boolean;

    /**
     * for bonuses with 100% wagering should make call and receive count of not settled resources
     * they will be displayed in Player Bonuses until all resources will be settled
     * shouldn't be visible in Bonus History (maybe impl clear this state when receive 'change phase' by ws)
     */
    notSettledResourcesMap: Record<string, number>;

    bonusesForCMS: TPlatform_Bonus_Template_Fragment[];
    /**
     * requestCashbackSum call response
     */
    cashbackSum: IMoney | null;

    bonusClaimedEvent: IBonusCreatedPayload | null;
    playerBonusActivatedEvent: TBonusActivatedPayload | null;
    playerBonusCanceledEvent: IBonusCanceledPayload | null;
    playerBonusLostEvent: IBonusLostPayload | null;
    playerBonusWonEvent: IBonusWonPayload | null;
    playerBonusCompletedEvent: IBonusCompletedPayload | null;
    /**
     * Define if you want to use certain cashbackBonusId instead of the first available
     */
    preferredCashbackBonusId: string | null;
  };
}

type TPlayerBonusEvent = Extract<
  keyof IWithPlatformBonusesState["platformBonuses"],
  "bonusClaimedEvent" | "playerBonusActivatedEvent" | "playerBonusCanceledEvent" | "playerBonusWonEvent" | "playerBonusLostEvent" | "playerBonusCompletedEvent"
>

const bonusesInitialState: IWithPlatformBonusesState = {
  platformBonuses: {
    availableBonuses: [],
    playerBonuses: [],
    historyBonuses: [],
    registrationBonuses: [],
    resources: {},
    deprecatedBonusResources: {},
    bonusResources: {},
    bonusResourcesSegregated: {},
    bonusTypeCommonFilter: null,
    bonusProductFilter: "all",
    sortBy: null,
    showOnlyCompleted: false,
    notSettledResourcesMap: {},
    bonusesForCMS: [],
    cashbackSum: null,
    bonusClaimedEvent: null,
    playerBonusActivatedEvent: null,
    playerBonusCanceledEvent: null,
    playerBonusLostEvent: null,
    playerBonusWonEvent: null,
    playerBonusCompletedEvent: null,
    preferredCashbackBonusId: null,
  },
};

export {
  type IDeprecatedResourcesPage,
  type IBonusCreatedPayload,
  type IWithPlatformBonusesState,
  type TPlayerBonusEvent,
  bonusesInitialState,
};

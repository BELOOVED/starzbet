import { type ComponentType } from "react";
import { Registry, useRegistry } from "@bem-react/di";
import { type IMoney } from "@sb/utils";
import { type TMoneyTransaction_Fragment } from "@sb/graphql-client";
import {
  type TSportsbook_Bet_Fragment,
  type TSportsbook_BetBonus_Fragment,
  type TSportsbook_BetOddsBoost_Fragment,
  type TSportsbook_Pick_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type IDeprecatedBetFromFS } from "../../../../../../Model/Bet";

interface IOddsBoostProps extends IWithId {
  totalStake: IMoney | TMoneyTransaction_Fragment;
  betOddsBoost?: TSportsbook_BetOddsBoost_Fragment | null;
  totalPotentialPayout?: TMoneyTransaction_Fragment;
}

interface IBetFooterProps extends IWithId {
  isDropDown: boolean;
  cashOutAt: string | number | null;
  totalPayout: IMoney | TMoneyTransaction_Fragment;
}

interface IBetRegistry {
  TotalStake: ComponentType<{
    totalStake: IMoney | TMoneyTransaction_Fragment;
    betBonus?: TSportsbook_BetBonus_Fragment;
  }>;
  TotalPayout: ComponentType<{ totalPayout: IMoney | TMoneyTransaction_Fragment; }>;
  BetName: ComponentType<{ id: string; hash: string; }>;
  EditBetButton?: ComponentType<IWithId>;
  PickList: ComponentType<IWithId & {
    picks: (TSportsbook_Pick_Fragment | IDeprecatedBetFromFS["picks"][0])[];
    isDropDown: boolean;
  }>;
  EditingContent?: ComponentType<IWithId>;
  BetHistory?: ComponentType<IWithId & { betStatesCount: number; contract: IDeprecatedBetFromFS["contract"]; }>;
  BetTotalTitle?: ComponentType<IWithId>;
  BetTotalExtraContent?: ComponentType<IWithId>;
  BetFooter?: ComponentType<IBetFooterProps>;
  OddsBoost: ComponentType<IOddsBoostProps>;
  EstimatedReturns: ComponentType<IWithId & Pick<TSportsbook_Bet_Fragment, "totalPotentialPayout">>;
}

const BET_REGISTRY_ID = "bet_registry";

const betRegistry = () => new Registry({ id: BET_REGISTRY_ID, overridable: false });

const useBetRegistry = () => useRegistry<IBetRegistry>(BET_REGISTRY_ID);

export {
  betRegistry,
  useBetRegistry,
};

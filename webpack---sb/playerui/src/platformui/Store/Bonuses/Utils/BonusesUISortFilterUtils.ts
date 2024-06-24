import {
  EBonusProductEnum,
  type EPlatform_BonusStatusEnum,
  type EPlatform_BonusTypeEnum,
  EPlatform_PlayerBonusStatusEnum,
} from "@sb/graphql-client";
import type { TPlatform_Bonus_Fragment, TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import {
  ascend,
  descend,
  type ELocale,
  type IMoney,
  isNil,
  isNotVoid,
  isVoid,
  Money,
  sort,
  type TNullable,
} from "@sb/utils";
import { keys } from "@sb/utils/Keys";
import { getTranslatedText } from "../../../Components/TranslateRecord/TranslateRecord";
import { EBonusTypeCommonFilter } from "../Model/Enums/EBonusTypeCommonFilter";
import { EBonusSortFilter } from "../Model/Enums/EBonusSortFilter";
import { isBonus } from "./BonusTypeGuards";
import { isFreeBetBonusType, isNotFreeBetBonusType } from "./CommonBonusUtils";

interface IProductFilterOptions extends Partial<Record<EBonusProductEnum, number>> {
  all: null;
}

type TProductFilterKey = keyof IProductFilterOptions;

const productPriorityMap: Record<TProductFilterKey, number> = {
  all: 1,
  [EBonusProductEnum.sports]: 2,
  [EBonusProductEnum.casino]: 3,
  [EBonusProductEnum.liveCasino]: 4,
  [EBonusProductEnum.games]: 5,
  [EBonusProductEnum.virtual]: 6,
};

const productsSorter = (a: TProductFilterKey, b: TProductFilterKey) => productPriorityMap[a] - productPriorityMap[b];

const emptyProductFilterOptions: IProductFilterOptions = { all: null };

const getProductsFilterOptions = (bonuses: (TPlatform_Bonus_Fragment | TPlatform_PlayerBonus_Fragment)[]) => {
  const reduced = bonuses.reduce<IProductFilterOptions>(
    (acc, bonus) => {
      const newAcc = { ...acc };

      const products = isBonus(bonus) ? bonus.products : bonus.bonus.products;

      products.forEach((product) => {
        const current = newAcc[product];

        return current ? newAcc[product] = current + 1 : newAcc[product] = 1;
      });

      return newAcc;
    },
    emptyProductFilterOptions,
  );

  return keys(reduced).sort(productsSorter).reduce<IProductFilterOptions>(
    (acc, it) => ({
      ...acc,
      [it]: reduced[it],
    }),
    emptyProductFilterOptions,
  );
};

const filterByBonusType = (filterType: EBonusTypeCommonFilter | null) =>
  <Node extends { bonusType: EPlatform_BonusTypeEnum; }>({ bonusType }: Node) => {
    switch (filterType) {
      case EBonusTypeCommonFilter.freeBet:
        return isFreeBetBonusType(bonusType);
      case EBonusTypeCommonFilter.custom:
        return isNotFreeBetBonusType(bonusType);
      default:
        return true;
    }
  };

const filterByProductType = (productFilter: TProductFilterKey) =>
  <B extends TPlatform_PlayerBonus_Fragment | TPlatform_Bonus_Fragment>(bonus: B) => {
    if (productFilter === "all") {
      return true;
    }

    const products = isBonus(bonus) ? bonus.products : bonus.bonus.products;

    return products.includes(productFilter);
  };

const filterByStatuses = (statuses: (EPlatform_PlayerBonusStatusEnum | EPlatform_BonusStatusEnum)[] | null) =>
  <B extends TPlatform_PlayerBonus_Fragment | TPlatform_Bonus_Fragment>(bonus: B) => {
    if (isNil(statuses)) {
      return true;
    }

    return statuses.includes(bonus.status);
  };

const completedPlayerBonusStatuses = [
  EPlatform_PlayerBonusStatusEnum.completed,
  EPlatform_PlayerBonusStatusEnum.won,
];

const filterBonusesByUIFilter = <B extends TPlatform_PlayerBonus_Fragment | TPlatform_Bonus_Fragment>(
  bonuses: B[],
  filterType: EBonusTypeCommonFilter | null,
  productFilter: TProductFilterKey,
  showOnlyCompleted = false,
) => bonuses
    .filter(filterByBonusType(filterType))
    .filter(filterByProductType(productFilter))
    .filter(filterByStatuses(showOnlyCompleted ? completedPlayerBonusStatuses : null));

const nullableAmountSort = (a: TNullable<IMoney>, b: TNullable<IMoney>) => {
  if (isNotVoid(a) && isNotVoid(b)) {
    return Money.greaterThanOrEqual(a, b) ? 1 : -1;
  }

  if (isVoid(a) && isVoid(b)) {
    return 0;
  }

  if (isNotVoid(a) && isVoid(b)) {
    return -1;
  }

  if (isVoid(a) && isNotVoid(b)) {
    return 1;
  }

  throw new Error("[nullableAmountSort] impossible condition");
};

const sortByNullableAmount = <N>(
  extractor: (node: N) => TNullable<IMoney>,
  nodes: N[],
) => sort((a: N, b: N) => nullableAmountSort(extractor(a), extractor(b)), nodes);

const playerBonusSortByFilter = (sortBy: EBonusSortFilter | null, userLocale: ELocale, systemLocale: ELocale) =>
  (bonuses: TPlatform_PlayerBonus_Fragment[]): TPlatform_PlayerBonus_Fragment[] => {
    switch (sortBy) {
      case EBonusSortFilter.time:
      case null: {
        return sort(descend(({ finishedAt }) => Number(finishedAt)), bonuses);
      }
      case EBonusSortFilter.name: {
        return sort(
          ascend(({ bonusName }) => getTranslatedText(bonusName, userLocale, systemLocale).toLowerCase()),
          bonuses,
        );
      }
      case EBonusSortFilter.bonusAmount: {
        return sortByNullableAmount(({ bonusGiven }: TPlatform_PlayerBonus_Fragment) => bonusGiven?.external, bonuses);
      }
      case EBonusSortFilter.netWin: {
        return sortByNullableAmount(({ wonGiven }: TPlatform_PlayerBonus_Fragment) => wonGiven?.external, bonuses);
      }
      default: {
        throw new Error(`[playerBonusSortByFilter] unhandled sort filter type: ${sortBy}`);
      }
    }
  };

export {
  type TProductFilterKey,
  emptyProductFilterOptions,
  getProductsFilterOptions,
  filterBonusesByUIFilter,
  playerBonusSortByFilter,
};

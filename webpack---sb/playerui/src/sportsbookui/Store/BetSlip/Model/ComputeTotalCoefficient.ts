import { combineWithoutRepetitions } from "@sb/betting-core/Combinatorics";
import { range } from "../../../Utils/Range";
import { partition } from "../../../Utils/Partition";
import { Numeric } from "../../../Utils/Numeric";
import {
  isBanker,
  isSingleHash,
  isSystemHash,
  parseHash,
} from "./BetHash";

type TCoefficientContainer =
    { outrightId: string; eventId: undefined; coefficient: string; banker: boolean; }
    | { eventId: string; outrightId: undefined; coefficient: string; banker: boolean; }

type TGroupedCoefficients = string[][];

const isConflict = (hash: string, coefficientContainers: TCoefficientContainer[]) => {
  const { total } = parseHash(hash);

  return total !== coefficientContainers.length;
};

const groupContainersByParentId = (coefficientContainers: TCoefficientContainer[]) => {
  const map: Record<string, string[]> = {};

  coefficientContainers.forEach((container) => {
    const parentId = (
            container.outrightId
              ? container.outrightId
              : container.eventId
        ) as string;

    const coefficients = map[parentId];
    if (!coefficients) {
      map[parentId] = [container.coefficient];
    } else {
      coefficients.push(container.coefficient);
    }
  });

  return Object.values(map);
};

const createCombinationsFromHash = (hash: string) => {
  const { list, total } = parseHash(hash);

  const elems = range(0, total - 1);

  const array: (number[][])[] = [];

  list.forEach((countPicksPerBet) => {
    array.push(combineWithoutRepetitions(elems, countPicksPerBet));
  });

  return array;
};

const getCountElementsPerGroup = (groupedCoefficients: TGroupedCoefficients) => {
  const map: Record<string, number> = {};

  groupedCoefficients.forEach((value, index) => {
    const count = value.length;

    if (count !== 1) {
      map[index] = count;
    }
  });

  return map;
};

const computeSystem = (hash: string, groupedCoefficients: TGroupedCoefficients) => {
  const allCombinations = createCombinationsFromHash(hash);

  const mapCountElementsPerGroup = getCountElementsPerGroup(groupedCoefficients);

  const keysMapCountElementsPerGroup = Object.keys(mapCountElementsPerGroup);

  const maxRepeatCountOfPick = Object.values(mapCountElementsPerGroup).reduce(
    (total, current) => total * current,
    1,
  );

  let result = 0;

  allCombinations.forEach((combinations) => {
    combinations.forEach((combination) => {
      let total = 1;
      let currentRepeatCountOfPick = maxRepeatCountOfPick;

      combination.forEach((pick) => {
        let sumItems = 0;

        (groupedCoefficients[pick] as string[]).forEach((item) => {
          sumItems = Numeric.plus(sumItems, item);
        });

        total = Numeric.mul(total, sumItems);

        if (keysMapCountElementsPerGroup.includes(pick.toString())) {
          currentRepeatCountOfPick = Numeric.div(currentRepeatCountOfPick, mapCountElementsPerGroup[pick]);
        }
      });

      total = Numeric.mul(total, currentRepeatCountOfPick);

      result = Numeric.plus(result, total);
    });
  });

  return result;
};

const computeFold = (by: number, groupedCoefficients: TGroupedCoefficients) => {
  let result = 0;

  if (by === 1) {
    groupedCoefficients.forEach((group) => {
      group.forEach((item) => {
        result = Numeric.plus(result, item);
      });
    });

    return result;
  }

  // Extract characters one by one and concatenate them to combinations of smaller lengths.
  // We need to extract them because we don't want to have repetitions after concatenation.
  groupedCoefficients.forEach((group, index) => {
    group.forEach((item) => {
      const subGroup = computeFold(
        by - 1,
        groupedCoefficients.slice(index + 1),
      );

      const groupTotal = Numeric.mul(subGroup, item);

      result = Numeric.plus(result, groupTotal);
    });
  });

  return result;
};

const sumCoefficient = (acc: number, { coefficient }: { coefficient: string; }) => acc + Number(coefficient);

const computeBanker = (coefficientContainers: TCoefficientContainer[], hash: string) => {
  const { list, total, bankersCount } = parseHash(hash);

  if (list[0] === total) {
    return computeFold(total + bankersCount, groupContainersByParentId(coefficientContainers));
  }

  const [withBanker, notBankers] = partition((c) => c.banker, coefficientContainers);

  let resultCoefficient = computeFold(list[0], groupContainersByParentId(notBankers));

  withBanker.forEach((container) => {
    resultCoefficient = Numeric.mul(resultCoefficient, container.coefficient);
  });

  return resultCoefficient;
};

const compute = (coefficientContainers: TCoefficientContainer[], hash: string) => {
  if (isBanker(hash)) {
    return computeBanker(coefficientContainers, hash);
  }

  if (isSingleHash(hash)) {
    return coefficientContainers.reduce(sumCoefficient, 0);
  }

  if (isSystemHash(hash)) {
    if (isConflict(hash, coefficientContainers)) {
      return computeSystem(hash, groupContainersByParentId(coefficientContainers));
    }

    let result = 0;

    const { list } = parseHash(hash);

    const coefficients = coefficientContainers.map(({ coefficient }) => [coefficient]);

    list.forEach((countPicksPerBet) => {
      result = Numeric.plus(result, computeFold(countPicksPerBet, coefficients));
    });

    return result;
  }

  const { list } = parseHash(hash);

  return computeFold(list[0], groupContainersByParentId(coefficientContainers));
};

const computeTotalCoefficient = (coefficientContainers: TCoefficientContainer[], hash: string) => {
  if (coefficientContainers.length === 0) {
    return void 0;
  }

  return Numeric.truncate(compute(coefficientContainers, hash));
};

export { computeTotalCoefficient };

export type { TCoefficientContainer };

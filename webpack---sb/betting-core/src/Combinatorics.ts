
const factorial = (n: number) => {
  let i = n - 1;
  let f = n;

  while (i > 0) {
    f *= i;
    i -= 1;
  }
  return f;
};

/**
 * @param {*[]} comboOptions
 * @param {number} comboLength
 * @return {*[]}
 */
const combineWithoutRepetitions = <T>(comboOptions: T[], comboLength: number) => {
  // If the length of the combination is 1 then each element of the original array
  // is a combination itself.
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption]);
  }

  // Init combinations array.
  const combos = [] as T[][];

  // Extract characters one by one and concatenate them to combinations of smaller lengths.
  // We need to extract them because we don't want to have repetitions after concatenation.
  comboOptions.forEach((currentOption, optionIndex) => {
    // Generate combinations of smaller size.
    const smallerCombos = combineWithoutRepetitions(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1,
    );

    // Concatenate currentOption with all combinations of smaller size.
    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
};

/**
 * @param {*[]} permutationOptions
 * @return {*[]}
 */
const permutateWithoutRepetitions = <T>(permutationOptions: T[]) => {
  if (permutationOptions.length === 1) {
    return [permutationOptions];
  }

  // Init permutations array.
  const permutations = [];

  // Get all permutations for permutationOptions excluding the first element.
  const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1));

  // Insert first option into every possible position of every smaller permutation.
  const firstOption = permutationOptions[0] as T;

  for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
    const smallerPermutation = smallerPermutations[permIndex] as T[];

    // Insert first option into every possible position of smallerPermutation.
    for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex);
      const permutationSuffix = smallerPermutation.slice(positionIndex);
      permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
    }
  }

  return permutations;
};


const countCombinationsWithoutRepetitions = <T>(items: number, set: number) => {
  if (set < items) {
    return 0;
  }
  if (set === items) {
    return 1;
  }

  return factorial(set) / ((factorial(items) * factorial(set - items)));
};

const countGroupedCombinationWithoutRepetitions = <T>(groupedItems: T[][], k: number) => {
  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > groupedItems.length || k <= 0) {
    return 0;
  }

  if (k === 1) {
    return groupedItems.flat().length;
  }

  let result = 0;
  groupedItems.forEach((group, index) => {
    group.forEach(() => {
      const small = countGroupedCombinationWithoutRepetitions(
        groupedItems.slice(index + 1),
        k - 1,
      );

      result += small;
    });
  });

  return result;
};

export {
  combineWithoutRepetitions,
  countCombinationsWithoutRepetitions,
  countGroupedCombinationWithoutRepetitions,
  permutateWithoutRepetitions,
};

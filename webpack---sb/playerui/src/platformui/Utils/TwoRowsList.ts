import { type TExplicitAny } from "@sb/utils/TAny";

const twoRowsList = <T extends TExplicitAny[]>(array: T):{row1: T; row2: T;} => array
  .reduce(
    (
      previousValue,
      currentValue,
      currentIndex,
    ) => {
      const index = currentIndex + 1;
      if (index % 2 === 0) {
        previousValue.row2.push(currentValue);
      } else {
        previousValue.row1.push(currentValue);
      }

      return previousValue;
    },
    {
      row1: [],
      row2: [],
    },
  );

export { twoRowsList };

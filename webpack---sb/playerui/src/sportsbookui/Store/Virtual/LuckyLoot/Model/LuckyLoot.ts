import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { range } from "../../../../Utils/Range";

const luckyLootKeys = range(1, 24) as [number, ...number[]];

const luckyLootColorKeys = [
  {
    color: EOutcomeEnumValue.green,
    keys: [1, 3, 5, 7, 9, 11],
  },
  {
    color: EOutcomeEnumValue.blue,
    keys: [13, 15, 17, 19, 21, 23],
  },
  {
    color: EOutcomeEnumValue.yellow,
    keys: [2, 4, 6, 8, 10, 12],
  },
  {
    color: EOutcomeEnumValue.red,
    keys: [14, 16, 18, 20, 22, 24],
  },
];

const luckyLootColorCountKeys = [
  {
    key: 0,
    coefficient: 6,
  },
  {
    key: 2,
    coefficient: 1.9,
  },
  {
    key: 3,
    coefficient: 6,
  },
  {
    key: 4,
    coefficient: 45,
  },
  {
    key: 5,
    coefficient: 700,
  },
];

const luckyLootSubsetInSetOutcomes = [
  {
    outcome: 2,
    coefficient: 1.8,
  },
  {
    outcome: 3,
    coefficient: 6,
  },
  {
    outcome: 4,
    coefficient: 46,
  },
  {
    outcome: 5,
    coefficient: 1000,
  },
];

const getLuckyLootComboCoefficient = (from: number, count = from) => {
  switch (from) {
    case 6:
      switch (count) {
        case 3:
          return 4;
        case 4:
          return 8;
        case 5:
          return 100;
        default:
          return 5500;
      }

    case 5:
      switch (count) {
        case 2:
          return 2;
        case 3:
          return 5;
        case 4:
          return 40;
        default:
          return 2000;
      }

    case 4:
      switch (count) {
        case 2:
          return 5;
        case 3:
          return 25;
        default:
          return 800;
      }

    case 3:
      switch (count) {
        case 1:
          return 2;
        case 2:
          return 5;
        default:
          return 150;
      }

    case 2:
      switch (count) {
        case 1:
          return 4;
        default:
          return 60;
      }
    default:
      return 21;
  }
};

export {
  luckyLootKeys,
  luckyLootColorKeys,
  getLuckyLootComboCoefficient,
  luckyLootColorCountKeys,
  luckyLootSubsetInSetOutcomes,
};


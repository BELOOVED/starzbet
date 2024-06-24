// @ts-nocheck
import { range } from "../../../../Utils/Range";

const kenoKeys = range(1, 80);

const kenoQuickPickKeys = range(1, 10);

const getKenoOddsByKeysLength = (length) => {
  switch (length) {
    case 1:
      return [
        {
          id: 1,
          coefficient: 3.8,
        },
      ];

    case 2:
      return [
        {
          id: 2,
          coefficient: 15,
        },
      ];

    case 3:
      return [
        {
          id: 2,
          coefficient: 3,
        },
        {
          id: 3,
          coefficient: 35,
        },
      ];
    case 4:
      return [
        {
          id: 2,
          coefficient: 1,
        },
        {
          id: 3,
          coefficient: 8,
        },
        {
          id: 4,
          coefficient: 100,
        },
      ];
    case 5:
      return [
        {
          id: 2,
          coefficient: 1,
        },
        {
          id: 3,
          coefficient: 3,
        },
        {
          id: 4,
          coefficient: 15,
        },
        {
          id: 5,
          coefficient: 300,
        },
      ];
    case 6:
      return [
        {
          id: 3,
          coefficient: 1,
        },
        {
          id: 4,
          coefficient: 10,
        },
        {
          id: 5,
          coefficient: 70,
        },
        {
          id: 6,
          coefficient: 1800,
        },
      ];
    case 7:
      return [
        {
          id: 0,
          coefficient: 1,
        },
        {
          id: 3,
          coefficient: 1,
        },
        {
          id: 4,
          coefficient: 6,
        },
        {
          id: 5,
          coefficient: 12,
        },
        {
          id: 6,
          coefficient: 120,
        },
        {
          id: 7,
          coefficient: 2150,
        },
      ];
    case 8:
      return [
        {
          id: 0,
          coefficient: 1,
        },
        {
          id: 4,
          coefficient: 4,
        },
        {
          id: 5,
          coefficient: 8,
        },
        {
          id: 6,
          coefficient: 68,
        },
        {
          id: 7,
          coefficient: 600,
        },
        {
          id: 8,
          coefficient: 3000,
        },
      ];
    case 9:
      return [
        {
          id: 0,
          coefficient: 1,
        },
        {
          id: 4,
          coefficient: 3,
        },
        {
          id: 5,
          coefficient: 6,
        },
        {
          id: 6,
          coefficient: 18,
        },
        {
          id: 7,
          coefficient: 120,
        },
        {
          id: 8,
          coefficient: 1800,
        },
        {
          id: 9,
          coefficient: 4200,
        },
      ];
    case 10:
      return [
        {
          id: 0,
          coefficient: 1,
        },
        {
          id: 4,
          coefficient: 2,
        },
        {
          id: 5,
          coefficient: 4,
        },
        {
          id: 6,
          coefficient: 12,
        },
        {
          id: 7,
          coefficient: 40,
        },
        {
          id: 8,
          coefficient: 400,
        },
        {
          id: 9,
          coefficient: 2500,
        },
        {
          id: 10,
          coefficient: 5000,
        },
      ];

    default:
      return [];
  }
};

export { kenoKeys, getKenoOddsByKeysLength, kenoQuickPickKeys };

// @ts-nocheck
import { range } from "../../../../Utils/Range";
import { sortBy } from "../../../../Utils/SortBy";

const spinAndWinKeys = range(0, 36);
const spinAndWinOrderedKeys = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const spinAndWinRedKey = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const spinAndWinBlackKey = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

const spinAndWinRowPickerKeys = [1, 2, 0];

const spinAndWinFirstTwelveKeys = spinAndWinKeys.slice(1, 13);
const spinAndWinSecondTwelveKeys = spinAndWinKeys.slice(13, -12);
const spinAndWinThirdTwelveKeys = spinAndWinKeys.slice(-12);
const spinAndWinFirstHalfKeys = spinAndWinKeys.slice(1, 19);
const spinAndWinLastHalfKeys = spinAndWinKeys.slice(-18);

const spinAndWinOrangeSectorKeys = [32, 15, 19, 4, 21, 2];
const spinAndWinBlueSectorKeys = [25, 17, 34, 6, 27, 13];
const spinAndWinRoseSectorKeys = [36, 11, 30, 8, 23, 10];
const spinAndWinGreenSectorKeys = [5, 24, 16, 33, 1, 20];
const spinAndWinYellowSectorKeys = [14, 31, 9, 22, 18, 29];
const spinAndWinWhiteSectorKeys = [7, 28, 12, 35, 3, 26];

const ESpinAndWinEdgeKeyEnum = {
  topMiddle: "topMiddle",
  bottomMiddle: "bottomMiddle",
  leftMiddle: "leftMiddle",
  rightMiddle: "rightMiddle",
  rightTop: "rightTop",
  rightBottom: "rightBottom",
  leftBottom: "leftBottom",
  leftTop: "leftTop",
  rightThirdTop: "rightThirdTop",
  rightThirdBottom: "rightThirdBottom",
};

const getSpinAndWinSiblingKeysByEdge = (key, id) => {
  switch (key) {
    case ESpinAndWinEdgeKeyEnum.topMiddle:
      return id % 3 === 0 ? [id, id - 1, id - 2] : [id, id + 1];

    case ESpinAndWinEdgeKeyEnum.bottomMiddle:
      return id % 3 === 1 ? [id, id + 1, id + 2] : [id, id - 1];

    case ESpinAndWinEdgeKeyEnum.leftMiddle:
      return id <= 3 ? [id, 0] : [id, id - 3];

    case ESpinAndWinEdgeKeyEnum.rightMiddle:
      return id === 0 ? [id, id + 2] : [id, id + 3];

    case ESpinAndWinEdgeKeyEnum.rightTop:
      return id % 3 === 0 ? [id, id - 1, id - 2, id + 1, id + 2, id + 3] : [id, id + 1, id + 3, id + 4];

    case ESpinAndWinEdgeKeyEnum.rightBottom:
      if (id === 0) {
        return [id, id + 1, id + 2, id + 3];
      }

      return id % 3 === 1
        ? [id, id + 1, id + 2, id + 3, id + 4, id + 5]
        : [id, id - 1, id + 2, id + 3];

    case ESpinAndWinEdgeKeyEnum.leftBottom:
      if (id === 1) {
        return [id, id + 1, id + 2, id - 1];
      }

      return id % 3 === 1
        ? [id, id + 1, id + 2, id - 1, id - 2, id - 3]
        : [id, id - 1, id - 3, id - 4];

    case ESpinAndWinEdgeKeyEnum.leftTop:
      return id % 3 === 0 ? [id, id - 1, id - 2, id - 3, id - 4, id - 5] : [id, id + 1, id - 2, id - 3];

    case ESpinAndWinEdgeKeyEnum.rightThirdTop:
      return [id, id + 3];

    case ESpinAndWinEdgeKeyEnum.rightThirdBottom:
      return [id, id + 1];

    default:
      return [];
  }
};

const spinAndWinCoefficientMapByNumberLength = {
  2: 18,
  3: 12,
  4: 9,
  6: 6,
  12: 3,
  18: 2,
  1: 36,
  5: 7,
};

const getSpinAndWinAllKeysInRow = (key) => spinAndWinKeys.slice(1).filter((it) => it % 3 === key);

const getSpinAndWinOutcome = (list) => sortBy((it) => +it, list).join(",");

export {
  spinAndWinKeys,
  spinAndWinRedKey,
  spinAndWinBlackKey,
  spinAndWinRowPickerKeys,
  spinAndWinFirstTwelveKeys,
  spinAndWinSecondTwelveKeys,
  spinAndWinThirdTwelveKeys,
  spinAndWinFirstHalfKeys,
  spinAndWinLastHalfKeys,
  spinAndWinOrangeSectorKeys,
  spinAndWinBlueSectorKeys,
  spinAndWinRoseSectorKeys,
  spinAndWinGreenSectorKeys,
  spinAndWinYellowSectorKeys,
  spinAndWinWhiteSectorKeys,
  ESpinAndWinEdgeKeyEnum,
  spinAndWinCoefficientMapByNumberLength,
  getSpinAndWinAllKeysInRow,
  getSpinAndWinSiblingKeysByEdge,
  getSpinAndWinOutcome,
  spinAndWinOrderedKeys,
};

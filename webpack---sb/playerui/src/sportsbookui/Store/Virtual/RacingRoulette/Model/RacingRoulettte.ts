// @ts-nocheck
import isEqual from "lodash/fp/isEqual";
import { isNumber } from "@sb/utils";
import { EMarketType } from "@sb/betting-core/MarketType";
import {
  shared_outcomeEnumValue_black,
  shared_outcomeEnumValue_even,
  shared_outcomeEnumValue_high,
  shared_outcomeEnumValue_low,
  shared_outcomeEnumValue_odd,
  shared_outcomeEnumValue_red,
} from "@sb/translates/shared/SharedTKeys";
import { range } from "../../../../Utils/Range";

const racingRouletteKeys = range(0, 12);

const racingRouletteRedKey = [1, 3, 5, 7, 9, 12];
const racingRouletteBlackKey = [2, 4, 6, 8, 10, 11];

const racingRouletteRowPickerKeys = [
  {
    id: 1,
    modulo: 0,
  },
  {
    id: 2,
    modulo: 2,
  },
  {
    id: 3,
    modulo: 1,
  },
];
const racingRouletteColumnPickerKeys = [1, 2, 3, 4];

const racingRouletteFilterValueByElement = (keysList, element) => {
  let result = [];

  if (!keysList) {
    return result;
  }

  if (isNumber(element)) {
    result = [...keysList.filter(isNumber)];
  } else {
    const elementList = element.split(",");

    const length = elementList.length;
    if (length === 6) {
      [
        [racingRouletteBlackKey, racingRouletteRedKey],
        // even | odd
        [racingRouletteKeys.slice(1).filter((it) => !(it % 2)), racingRouletteKeys.filter((it) => it % 2)],
        //low | high
        [racingRouletteKeys.slice(1, 7), racingRouletteKeys.slice(-6)],
      ].map((arr) => arr.map((it) => it.join(",")))
        .forEach(([a, b]) => {
          if (element === a || element === b) {
            result = [...keysList.filter((it) => it === a || it === b)];
          }
        });
    } else {
      // for rows and columns
      result = [...keysList.filter((it) => it.split(",").length === length)];
    }
  }

  return result;
};

const getRacingRouletteRowKeys = (rowKey) => racingRouletteKeys
  .slice(1)
  .filter((it) => it % 3 === racingRouletteRowPickerKeys.find(({ id }) => id === rowKey).modulo);

const racingRouletteExtractRowKey = (keyList) => racingRouletteRowPickerKeys.find(({ modulo }) => modulo === keyList.split(",")[0] % 3).id;

const getRacingRouletteColumnKeys = (columnKey) =>
  racingRouletteKeys
    .slice((columnKey * 3) - 2, (columnKey * 3) + 1);

const racingRouletteExtractColumnKey = (keyList) =>
  racingRouletteColumnPickerKeys
    .filter(
      (columnKey) =>
        racingRouletteKeys
          .slice((columnKey * 3) - 2, (columnKey * 3) + 1)
          .join(",") === keyList,
    )[0];

const racingRouletteGetColumnName = (keyList) => keyList.map((columnList) => `R${racingRouletteExtractColumnKey(columnList)}`).join(" ");
const racingRouletteGetRowName = (keyList) => keyList.map((rowList) => `C${racingRouletteExtractRowKey(rowList)}`).join(" ");

const racingRouletteFindParticipants = (arr, participants) => arr.map((it) => it.split(",").map((that) => Object.values(participants).find(({ name }) => name === that).shortId).join(","));

const ERacingRouletteTypeFieldEnum = {
  columns: "columns",
  rows: "rows",
  low: "low",
  even: "even",
  red: "red",
  numbers: "numbers",
};

const racingRouletteSimpleKeyMap = {
  [ERacingRouletteTypeFieldEnum.columns]: getRacingRouletteColumnKeys(1).join(","),
  [ERacingRouletteTypeFieldEnum.rows]: getRacingRouletteRowKeys(1).join(","),
  [ERacingRouletteTypeFieldEnum.low]: racingRouletteKeys.slice(1, 7).join(","),
  [ERacingRouletteTypeFieldEnum.even]: racingRouletteKeys.slice(1).filter((it) => !(it % 2)).join(","),
  [ERacingRouletteTypeFieldEnum.red]: racingRouletteRedKey.join(","),
  [ERacingRouletteTypeFieldEnum.numbers]: "0",
};

const racingRouletteCoefficientMapByMarketAndKey = {
  [EMarketType.place_number_racing_roulette_first]: {
    [ERacingRouletteTypeFieldEnum.columns]: 4,
    [ERacingRouletteTypeFieldEnum.rows]: 3,
    [ERacingRouletteTypeFieldEnum.numbers]: 12,
    default: 2,
  },
  [EMarketType.place_number_racing_roulette_first_second]: {
    [ERacingRouletteTypeFieldEnum.columns]: 13,
    [ERacingRouletteTypeFieldEnum.rows]: 9,
    [ERacingRouletteTypeFieldEnum.numbers]: 100,
    default: 4,
  },
  [EMarketType.place_number_racing_roulette_first_second_third]: {
    [ERacingRouletteTypeFieldEnum.columns]: 55,
    [ERacingRouletteTypeFieldEnum.rows]: 25,
    default: 8,
  },
  [EMarketType.place_number_racing_roulette_in_first_three]: {
    [ERacingRouletteTypeFieldEnum.numbers]: [7, 30, 200],
  },
  [EMarketType.place_number_racing_roulette_two_from_three]: {
    [ERacingRouletteTypeFieldEnum.numbers]: 1000,
  },
};

const racingRouletteTKeyByKeyListMap = {
  [racingRouletteRedKey.join(",")]: shared_outcomeEnumValue_red,
  [racingRouletteBlackKey.join(",")]: shared_outcomeEnumValue_black,
  [racingRouletteKeys.slice(1).filter((it) => !(it % 2)).join(",")]: shared_outcomeEnumValue_even,
  [racingRouletteKeys.filter((it) => it % 2).join(",")]: shared_outcomeEnumValue_odd,
  [racingRouletteKeys.slice(1, 7).join(",")]: shared_outcomeEnumValue_low,
  [racingRouletteKeys.slice(-6).join(",")]: shared_outcomeEnumValue_high,
};

const racingRouletteGetTypeByOutcome = (outcome) => {
  const keyList = outcome.split(",").map((out) => +out.replace("p", ""));

  if (keyList.length === 4) {
    return ERacingRouletteTypeFieldEnum.rows;
  }

  if (keyList.length === 3) {
    return ERacingRouletteTypeFieldEnum.columns;
  }

  if (keyList.length === 6) {
    if (isEqual(racingRouletteBlackKey, keyList) || isEqual(racingRouletteRedKey, keyList)) {
      return ERacingRouletteTypeFieldEnum.red;
    }

    if (
      isEqual(
        racingRouletteKeys
          .slice(1)
          .filter((it) => it % 2),
        keyList,
      ) ||
      isEqual(
        racingRouletteKeys
          .slice(1)
          .filter((it) => !(it % 2)),
        keyList,
      )) {
      return ERacingRouletteTypeFieldEnum.even;
    }

    if (isEqual(racingRouletteKeys.slice(1, 7), keyList) || isEqual(racingRouletteKeys.slice(-6), keyList)) {
      return ERacingRouletteTypeFieldEnum.low;
    }
  }

  return ERacingRouletteTypeFieldEnum.numbers;
};

export {
  racingRouletteFilterValueByElement,
  racingRouletteFindParticipants,
  racingRouletteKeys,
  racingRouletteRedKey,
  racingRouletteBlackKey,
  racingRouletteRowPickerKeys,
  racingRouletteColumnPickerKeys,
  racingRouletteSimpleKeyMap,
  getRacingRouletteColumnKeys,
  getRacingRouletteRowKeys,
  racingRouletteCoefficientMapByMarketAndKey,
  ERacingRouletteTypeFieldEnum,
  racingRouletteTKeyByKeyListMap,
  racingRouletteGetColumnName,
  racingRouletteGetRowName,
  racingRouletteGetTypeByOutcome,
  racingRouletteExtractColumnKey,
  racingRouletteExtractRowKey,
};

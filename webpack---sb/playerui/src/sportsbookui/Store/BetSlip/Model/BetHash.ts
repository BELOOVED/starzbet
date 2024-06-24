import {
  sportsbookui_betName_countFolds,
  sportsbookui_betName_doubles,
  sportsbookui_betName_goliath,
  sportsbookui_betName_heinz,
  sportsbookui_betName_lucky15,
  sportsbookui_betName_lucky31,
  sportsbookui_betName_lucky63,
  sportsbookui_betName_patient,
  sportsbookui_betName_single,
  sportsbookui_betName_superHeinz,
  sportsbookui_betName_superYankee,
  sportsbookui_betName_trebles,
  sportsbookui_betName_trixie,
  sportsbookui_betName_yankee,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { deduplicate } from "@sb/utils/Deduplicate";
import { type TTFuncParameters } from "@sb/translator";
import { partition } from "../../../Utils/Partition";
import { type AbstractPick } from "./BetPick";

type TFoldCombo = [number, number];
type TSystemCombo = [number, number][];

const isSystemCombo = (combo: TFoldCombo | TSystemCombo): combo is TSystemCombo => Array.isArray(combo[0]);

const singleHash = "1/1";

const bankerSeparator = "|B";

const simpleName: Record<string, string> = {
  1: sportsbookui_betName_single,
  2: sportsbookui_betName_doubles,
  3: sportsbookui_betName_trebles,
};

const joinToSystemHash = (value: string[]) => value.join(":");

const joinToFoldHash = (value: [number, number]) => value.join("/");

const toAccumulatorHash = (count: number) => `${count}/${count}`;

const generateSystemHash = (start: number, end: number) => {
  let i = start;

  const result: [number, number][] = [];
  while (i <= end) {
    result.push([i, end]);

    i += 1;
  }

  return joinToSystemHash(result.map(joinToFoldHash));
};

const extractBanker = (hash: string): [string, number] => {
  const [simpleHash, bankersCount] = hash.split(bankerSeparator);

  if (!bankersCount) {
    return [simpleHash, 0] as [string, number];
  }

  return [simpleHash, +bankersCount] as [string, number];
};

const namedSystems = {
  [generateSystemHash(2, 3)]: sportsbookui_betName_trixie,
  [generateSystemHash(1, 3)]: sportsbookui_betName_patient,
  [generateSystemHash(2, 4)]: sportsbookui_betName_yankee,
  [generateSystemHash(1, 4)]: sportsbookui_betName_lucky15,
  [generateSystemHash(2, 5)]: sportsbookui_betName_superYankee,
  [generateSystemHash(1, 5)]: sportsbookui_betName_lucky31,
  [generateSystemHash(2, 6)]: sportsbookui_betName_heinz,
  [generateSystemHash(1, 6)]: sportsbookui_betName_lucky63,
  [generateSystemHash(2, 7)]: sportsbookui_betName_superHeinz,
  [generateSystemHash(2, 8)]: sportsbookui_betName_goliath,
};

/**
 * Return object with fields:
 * - total: total count of bets. example: ["2/3" -> 3, "1/"1 -> 1, "3/3" -> 3]
 * - list: list of particle bets: example: [
 *                                            "2/3"                         -> [2],
 *                                            "1/1"                         -> [1],
 *                                            "3/3"                         -> [3],
 *                                            "2/8:3/8:4/8:5/8:6/8:7/8:8/8" -> [2, 3, 4, 5, 6, 7, 8]
 *                                         ]
 *
 * @param {string} hash
 * @returns {{total: number, list: number[]}}
 */
const parseHash = (hash: string): { total: number; bankersCount: number; list: [number, ...number[]]; } => {
  // initialize value to satisfy compiler
  let totalPicks = -1;

  const listOfPickNumbersPerBet: number[] = [];

  const [betHash, bankersCount] = extractBanker(hash);

  betHash.split(":").forEach((pair) => {
    const [first, second] = pair.split("/") as [string, string];

    listOfPickNumbersPerBet.push(+first);

    if (totalPicks === -1) {
      totalPicks = +second;
    }
  });

  return { list: listOfPickNumbersPerBet.sort() as [number, ...number[]], total: +totalPicks, bankersCount };
};

type TBetSlipHash = string | { total: number; list: number[]; }

/**
 * @param {string | {total: number, list: number[]}} hash
 *
 * @returns {boolean}
 */
const isSingleHash = (hash: TBetSlipHash): boolean => {
  if (typeof hash === "string") {
    return isSingleHash(parseHash(hash));
  }

  return hash.list.length === 1 && hash.total === 1;
};

/**
 * @param {string | {total: number, list: number[]}} hash
 *
 * @returns {boolean}
 */
const isAccumulatorHash = (hash: string | { total: number; list: number[]; }): boolean => {
  if (typeof hash === "string") {
    return isAccumulatorHash(parseHash(hash));
  }

  return (
    hash.list.length === 1 && hash.total > 1 && hash.list[0] === hash.total
  );
};

/**
 * @param {string | {total: number, list: number[]}} hash
 *
 * @returns {boolean}
 */
const isFoldHash = (hash: string) => {
  const { list, total } = parseHash(hash);

  return list.length === 1 && total > 1;
};

/**
 * @param {string | {total: number, list: number[]}} hash
 *
 * @returns {boolean}
 */
const isSystemHash = (hash: string) => !isSingleHash(hash) && !isFoldHash(hash);

const isBanker = (hash: string) => {
  const { bankersCount } = parseHash(hash);

  return bankersCount !== 0;
};

const toHashByCombo = (combo: TFoldCombo | TSystemCombo) => {
  if (isSystemCombo(combo)) {
    return joinToSystemHash(combo.map(joinToFoldHash));
  }

  return joinToFoldHash(combo);
};

const generateFoldCombination = (pickCount: number) => {
  let i = pickCount + 1;

  const result: TFoldCombo[] = [];

  while (i > 2) {
    i -= 1;

    result.push([i, pickCount]);
  }

  return result.reverse();
};

const generateFoldAndSystemCombination = (pickCount: number) => {
  const foldCombos = generateFoldCombination(pickCount);

  const systemCombos: TSystemCombo[] = [];

  if (pickCount > 2 && pickCount < 7) {
    systemCombos.push(foldCombos, [[1, pickCount], ...foldCombos]);
  }

  if (pickCount >= 7 && pickCount <= 8) {
    systemCombos.push(foldCombos);
  }

  return [...foldCombos, ...systemCombos];
};

const generateHashesWithBanker = (picks: AbstractPick[]) => {
  const [withBanker, notBankers] = partition((pick) => pick.banker, picks);

  const foldCombos = generateFoldCombination(notBankers.length);

  const combo: TFoldCombo = [1, notBankers.length];

  const combos = [combo, ...foldCombos].map(toHashByCombo);

  return combos.map((hash) => `${hash}${bankerSeparator}${withBanker.length}`);
};

const generateFoldAndSystemHashes = (picks: AbstractPick[]) => {
  if (picks.some((pick) => pick.banker)) {
    return generateHashesWithBanker(picks);
  }

  const countCombination = deduplicate(picks.map(({ eventId }) => eventId)).length;

  return generateFoldAndSystemCombination(countCombination).map(toHashByCombo);
};

const generateFoldHashes = (picks: AbstractPick[]) => {
  const countCombination = deduplicate(picks.map(({ eventId }) => eventId)).length;

  return generateFoldCombination(countCombination).map(toHashByCombo);
};

const hashToName = (hash: string): TTFuncParameters => {
  const nameSystem: string | undefined = namedSystems[hash];

  if (nameSystem) {
    return [nameSystem];
  }

  if (isBanker(hash)) {
    const [simpleHash, bankersCount] = extractBanker(hash);

    return [`${bankersCount}B + ${simpleHash}`];
  }

  const [count] = hash.split("/", 1) as [string];

  const simpleNameForCount = simpleName[count];

  if (simpleNameForCount) {
    return [simpleNameForCount];
  }

  return [sportsbookui_betName_countFolds, { count }];
};

export {
  singleHash,
  toAccumulatorHash,
  extractBanker,
  parseHash,
  isSingleHash,
  isAccumulatorHash,
  isFoldHash,
  isSystemHash,
  isBanker,
  generateFoldAndSystemHashes,
  generateFoldHashes,
  hashToName,
  type TBetSlipHash,
};

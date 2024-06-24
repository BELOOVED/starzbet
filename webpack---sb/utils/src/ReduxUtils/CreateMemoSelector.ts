/**
 * Create Memo Selector can be used to memoize result of selector
 *
 * Must be used when combiner returns:
 *   - Reference-type value that was created inside combiner (property extraction is not creation)
 *   - Reference-type value extraction from result is expensive (pass options record as third argument with true by "expensive" key to avoid error)
 *   - Primitive-type value that that was calculated using a lot of resources, like reducing array with a lot of elements ((pass options record as third argument with true by "expensive" key to avoid error))
 *
 * Lonely selector
 *   Converts parameters of selector (if there are such) to hash and cache selector result per parameters hash
 *     Hashing behavior could be changed through passing options record as third argument with function by "paramsToHash" key
 *
 *   Returns selector result every time when selector was called
 *     Such behaviour could be changed though passing options record as third argument with function or "deepEqual" string by "resultEqual" key
 *     Then selector result will be compared and previous result will be returned if it is equal with current result
 *
 * Selectors
 *   Converts parameters of selector (if there are such) to hash and cache combiner result per parameters hash
 *     Hashing behavior could be changed through passing options record as third argument with function by "paramsToHash" key
 *
 *   Combiner called only when result of some selector has changed
 *     Compares using reference (a === b)
 *     Comparing behaviour could be changed though passing options record as third argument with function or "deepEqual" string by "resultsEqual" key
 *
 *   Returns combiner result every time when combiner was called
 *     Such behaviour could be changed though passing options record as third argument with function or "deepEqual" string by "combinedEqual" key
 *     Then combiner result will be compared and previous result will be returned if it is equal with current result
 *
 * Cache of selectors that was called earlier (LRU) will be deleted to keep cache map size less than allowed
 *
 * Current cache could be logged to console using cheat-code "creatememoselector"
 *   Every created selector will have some number as it's "revision"
 *   Each created selector will also have "displayName" property as "unknown" string
 *   It is possible to assign created selector some name through "displayName" property (createdSelector.displayName = "createdSelector")
 *
 * Cache will be logged as map with such structure:
 *   - Selector "displayName"
 *     - Selector "revision"
 *       - Parameters hash
 *         - time ("performance.now()" when selector was called last time)
 *         - results (results of selectors)
 *         - combined (result of combiner)
 */
import type { TMergeArrays } from "../TMergeArrays";
import type { TExplicitAny } from "../TAny";
import type { TRequireAtLeastOne } from "../TRequireOne";
import type { TSelector } from "./TSelector";
import { deepFreeze } from "../DeepFreeze";
import { Cheater } from "../Cheater";
import { deepEqual } from "fast-equals";
import { USE_STRICT_MODE } from "../UseStrict";

type TMemoSelector<S, R, P extends TExplicitAny[]> = TSelector<S, R, P> & { displayName: string };

type TParamsToHash<P extends TExplicitAny[]> = P["length"] extends 0 ? never : (...params: P) => string;
type TResultsEqual<R extends TExplicitAny[]> = (a: R, b: R) => boolean;
type TCombinedEqual<C> = (a: C, b: C) => boolean;

type TLonelyOptions<P extends TExplicitAny[], R> = {
  paramsToHash?: TParamsToHash<P>;
  resultEqual: "deepEqual" | TCombinedEqual<R>;
  expensive?: true;
};

type TOptions<P extends TExplicitAny[], R extends TExplicitAny[], C> = TRequireAtLeastOne<{
  paramsToHash?: TParamsToHash<P>;
  resultsEqual?: "deepEqual" | TResultsEqual<R>;
  combinedEqual?: "deepEqual" | TCombinedEqual<C>;
  expensive?: true;
}>;

type TStorageValue = [time: number, results: TExplicitAny[], combined: TExplicitAny];

class Storage {
  private static _maxSize: number = 500;
  private static _trimSize: number = this._maxSize / 5;
  private static _list: [hash: string, value: TStorageValue][] = [];
  private static _map: Map<string, TStorageValue> = new Map();
  private static _checked: boolean = true;

  public static debug(): void {
    const groups: Record<string, Record<string, Record<string, Record<string, TExplicitAny>>>> = {};

    let index = 0;

    while (index < this._list.length) {
      const [hash, [time, results, combined]] = this._list[index]!;

      index++

      const [displayName, revision, ...params] = hash.split(HASH_SEPARATOR) as [string, string, string[]];

      const selectorsGroup = groups[displayName] ?? {};

      const revisionsGroup = selectorsGroup[revision] ?? {};

      revisionsGroup[params.join(HASH_SEPARATOR)] = {
        time,
        results,
        combined,
      };

      selectorsGroup[revision] = revisionsGroup;
      groups[displayName] = selectorsGroup;
    }

    console.log(groups);
  }

  public static insert(hash: string, results: TExplicitAny[], combined: TExplicitAny): void {
    this.freeze(combined);

    const inserted = this._map.get(hash);

    if (inserted !== undefined) {
      throw new Error(`Values by such Hash already inserted - ${hash}`);
    }

    const value: TStorageValue = [performance.now(), results, combined];

    this._list.push([hash, value]);
    this._map.set(hash, value);

    this.check();
  }

  public static update(hash: string, results: TExplicitAny[], combined: TExplicitAny): void {
    this.freeze(combined);

    const value = this.getValue(hash);

    value[0] = performance.now();
    value[1] = results;
    value[2] = combined;
  }

  public static get(hash: string): undefined | [results: TExplicitAny, combined: TExplicitAny] {
    const value = this._map.get(hash);

    if (value === undefined) {
      return undefined;
    }

    return [value[1], value[2]];
  }

  public static updateTime(hash: string): void {
    const value = this.getValue(hash);

    value[0] = performance.now();

    this.check();
  }

  private static freeze(combined: TExplicitAny) {
    if (USE_STRICT_MODE) {
      deepFreeze(combined);
    }
  }

  private static getValue(hash: string): TStorageValue {
    const value = this._map.get(hash);

    if (value === undefined) {
      throw new Error(`Value by such Hash does not inserted - ${hash}`);
    }

    return value;
  }

  private static check(): void {
    if (
      !this._checked ||
      this._list.length < this._maxSize
    ) {
      return;
    }

    this._checked = false;

    const callback = () => {
      this._list.sort(([, [aTime]], [, [bTime]]) => {
        if (aTime < bTime) {
          return -1;
        }

        if (aTime > bTime) {
          return 1;
        }

        return 0;
      });

      const deleteCount = this._list.length - this._maxSize + this._trimSize;

      let index = 0;

      while (index < deleteCount) {
        const [hash] = this._list[index]!;

        index++;

        this._map.delete(hash);
      }

      this._list.splice(0, deleteCount);

      this._checked = true;
    };

    setTimeout(callback, 0);
  }
}

const HASH_SEPARATOR = ` ࿀ `;

let FIRST_CALL = true;
let OBJECT_PARAMS_HASH_REVISION = 0;
const OBJECT_PARAMS_HASH = new WeakMap<object, number>();

let CACHE_REVISION = 0;

const defaultParamsToHash: TParamsToHash<TExplicitAny[]> = (...params) => {
  let hash = "";

  let index = 0;

  while (index < params.length) {
    const param = params[index]!;

    if (index > 0) {
      hash += HASH_SEPARATOR;
    }

    index++

    if (
      typeof param === "object" &&
      param !== null
    ) {
      let revision = OBJECT_PARAMS_HASH.get(param);

      if (revision === undefined) {
        revision = OBJECT_PARAMS_HASH_REVISION;

        OBJECT_PARAMS_HASH_REVISION++;
        OBJECT_PARAMS_HASH.set(param, revision);
      }

      hash += revision;
    } else {
      hash += param;
    }
  }

  return hash;
}

const defaultResultsEqual: TResultsEqual<TExplicitAny[]> = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }

  let index = 0;

  while (index < a.length) {
    if (a[index] !== b[index]) {
      return false;
    }

    index++;
  }

  return true;
};

const isLonely = (
  args: TExplicitAny[],
  options: undefined | TLonelyOptions<TExplicitAny, TExplicitAny> | TOptions<TExplicitAny, TExplicitAny, TExplicitAny>,
): options is TLonelyOptions<TExplicitAny, TExplicitAny> => !Array.isArray(args[0]);

const toHash = (name: string, revision: number, paramsHash: string) => {
  const hash = `${name}${HASH_SEPARATOR}${revision}`;

  if (paramsHash.length === 0) {
    return hash;
  }

  return `${hash}${HASH_SEPARATOR}${paramsHash}`;
};

const isFromSource = (source: TExplicitAny, target: TExplicitAny): boolean => {
  if (
    source === undefined ||
    source === null ||
    typeof source !== "object"
  ) {
    return false;
  }

  if (source === target) {
    return true;
  }

  const values = Array.isArray(source)
    ? source
    : Object.values(source);

  return values.some((it) => isFromSource(it, target));
};

const assertUselessMemo = (results: TExplicitAny, combined: TExplicitAny): void => {
  if (
    combined === undefined ||
    combined === null
  ) {
    return;
  }

  if (typeof combined !== "object") {
    throw new Error("Primitive type was returned from combiner. There is no need in Memo Selector when combiner returns primitive")
  }

  if (isFromSource(results, combined)) {
    throw new Error("Reference-type value that was extracted from results of selectors was returned. Memo Selector must be used to memo reference-type value created in combiner");
  }
};

/* lonely selector */
function createMemoSelector<
  State,
  Res,
  Params extends TExplicitAny[],
>(
  selector: TSelector<State, Res, Params>,
  options: TLonelyOptions<Params, Res>,
): TMemoSelector<State, Res, Params>;

/* one selector */
function createMemoSelector<
  State1,
  Res1,
  Params1 extends TExplicitAny[],
  Params extends Params1,
  Combiner extends (res1: Res1) => TExplicitAny,
>(
  selectors: [
    TSelector<State1, Res1, Params1>,
  ],
  combiner: Combiner,
  options?: TOptions<Params, [Res1], ReturnType<Combiner>>,
): TMemoSelector<State1, ReturnType<Combiner>, Params>;

/* two selectors */
function createMemoSelector<
  State1, State2,
  Res1, Res2,
  Params1 extends TExplicitAny[], Params2 extends TExplicitAny[],
  Params extends TMergeArrays<[Params1, Params2]>,
  Combiner extends (res1: Res1, res2: Res2) => TExplicitAny,
>(
  selectors: [
    TSelector<State1, Res1, Params1>,
    TSelector<State2, Res2, Params2>,
  ],
  combiner: Combiner,
  options?: TOptions<Params, [Res1, Res2], ReturnType<Combiner>>,
): TMemoSelector<State1, ReturnType<Combiner>, Params>;

/* three selectors */
function createMemoSelector<
  State1, State2, State3,
  Res1, Res2, Res3,
  Params1 extends TExplicitAny[], Params2 extends TExplicitAny[], Params3 extends TExplicitAny[],
  Params extends TMergeArrays<[Params1, Params2, Params3]>,
  Combiner extends (res1: Res1, res2: Res2, res3: Res3) => TExplicitAny,
>(
  selectors: [
    TSelector<State1, Res1, Params1>,
    TSelector<State2, Res2, Params2>,
    TSelector<State3, Res3, Params3>,
  ],
  combiner: Combiner,
  options?: TOptions<Params, [Res1, Res2, Res3], ReturnType<Combiner>>,
): TMemoSelector<State1, ReturnType<Combiner>, Params>;

/* four selectors */
function createMemoSelector<
  State1, State2, State3, State4,
  Res1, Res2, Res3, Res4,
  Params1 extends TExplicitAny[], Params2 extends TExplicitAny[], Params3 extends TExplicitAny[], Params4 extends TExplicitAny[],
  Params extends TMergeArrays<[Params1, Params2, Params3, Params4]>,
  Combiner extends (res1: Res1, res2: Res2, res3: Res3, res4: Res4) => TExplicitAny,
>(
  selectors: [
    TSelector<State1, Res1, Params1>,
    TSelector<State2, Res2, Params2>,
    TSelector<State3, Res3, Params3>,
    TSelector<State4, Res4, Params4>,
  ],
  combiner: Combiner,
  options?: TOptions<Params, [Res1, Res2, Res3, Res4], ReturnType<Combiner>>,
): TMemoSelector<State1, ReturnType<Combiner>, Params>;

/* five selectors */
function createMemoSelector<
  State1, State2, State3, State4, State5,
  Res1, Res2, Res3, Res4, Res5,
  Params1 extends TExplicitAny[], Params2 extends TExplicitAny[], Params3 extends TExplicitAny[], Params4 extends TExplicitAny[], Params5 extends TExplicitAny[],
  Params extends TMergeArrays<[Params1, Params2, Params3, Params4, Params5]>,
  Combiner extends (res1: Res1, res2: Res2, res3: Res3, res4: Res4, res5: Res5) => TExplicitAny,
>(
  selectors: [
    TSelector<State1, Res1, Params1>,
    TSelector<State2, Res2, Params2>,
    TSelector<State3, Res3, Params3>,
    TSelector<State4, Res4, Params4>,
    TSelector<State5, Res5, Params5>,
  ],
  combiner: Combiner,
  options?: TOptions<Params, [Res1, Res2, Res3, Res4, Res5], ReturnType<Combiner>>,
): TMemoSelector<State1, ReturnType<Combiner>, Params>;

/* six selectors */
function createMemoSelector<
  State1, State2, State3, State4, State5, State6,
  Res1, Res2, Res3, Res4, Res5, Res6,
  Params1 extends TExplicitAny[], Params2 extends TExplicitAny[], Params3 extends TExplicitAny[], Params4 extends TExplicitAny[], Params5 extends TExplicitAny[], Params6 extends TExplicitAny[],
  Params extends TMergeArrays<[Params1, Params2, Params3, Params4, Params5, Params6]>,
  Combiner extends (res1: Res1, res2: Res2, res3: Res3, res4: Res4, res5: Res5, res6: Res6) => TExplicitAny,
>(
  selectors: [
    TSelector<State1, Res1, Params1>,
    TSelector<State2, Res2, Params2>,
    TSelector<State3, Res3, Params3>,
    TSelector<State4, Res4, Params4>,
    TSelector<State5, Res5, Params5>,
    TSelector<State6, Res6, Params6>,
  ],
  combiner: Combiner,
  options?: TOptions<Params, [Res1, Res2, Res3, Res4, Res5, Res6], ReturnType<Combiner>>,
): TMemoSelector<State1, ReturnType<Combiner>, Params>;

function createMemoSelector(...args: TExplicitAny[]): TMemoSelector<TExplicitAny, TExplicitAny, TExplicitAny> {
  if (FIRST_CALL) {
    Cheater.add(
      ["memoselector"],
      () => {
        Storage.debug();
      },
      "Logs current cache",
    );

    FIRST_CALL = false;
  }

  let selectors: TSelector<TExplicitAny, TExplicitAny, TExplicitAny[]>[];
  let combiner: (...results: TExplicitAny[]) => TExplicitAny;
  const options: undefined | TLonelyOptions<TExplicitAny, TExplicitAny> | TOptions<TExplicitAny, TExplicitAny, TExplicitAny> = args[args.length - 1];

  const paramsToHash = options?.paramsToHash ?? defaultParamsToHash;
  let resultsEqual: undefined | TResultsEqual<TExplicitAny[]> = undefined;
  let combinedEqual: undefined | TCombinedEqual<TExplicitAny> = undefined;

  const lonely = isLonely(args, options);

  if (lonely) {
    selectors = [args[0]];
    combiner = (result: TExplicitAny) => result;

    combinedEqual = options.resultEqual === "deepEqual"
      ? deepEqual
      : options.resultEqual
  } else {
    selectors = args[0];
    combiner = args[1];

    if (options?.resultsEqual) {
      resultsEqual = options.resultsEqual === "deepEqual"
        ? deepEqual
        : options.resultsEqual;
    } else {
      resultsEqual = defaultResultsEqual;
    }

    if (options?.combinedEqual) {
      combinedEqual = options.combinedEqual === "deepEqual"
        ? deepEqual
        : options.combinedEqual;
    }
  }

  const revision = CACHE_REVISION;
  CACHE_REVISION++;

  // @ts-ignore
  const selector: TMemoSelector<TExplicitAny, TExplicitAny, TExplicitAny> = (state, ...params) => {
    const hash = toHash(selector.displayName, revision, paramsToHash(...params));

    let cached = Storage.get(hash);

    const results = [];

    let index = 0;

    while (index < selectors.length) {
      const result = selectors[index]!(state, ...params);

      if (
        USE_STRICT_MODE &&
        !lonely &&
        result !== selectors[index]!(state, ...params)
      ) {
        throw new Error(`Selector in "${selector.displayName}" by index "${index}" returns different result when called multiple times sequentially`);
      }

      results.push(result);

      index++;
    }

    if (cached === undefined) {
      const combined = combiner(...results);

      if (
        USE_STRICT_MODE &&
        !lonely &&
        !options?.expensive
      ) {
        assertUselessMemo(results, combined);
      }

      Storage.insert(hash, results, combined);

      return combined;
    }

    Storage.updateTime(hash);

    const [cachedResults, cachedCombined] = cached;

    if (
      resultsEqual &&
      resultsEqual(results, cachedResults)
    ) {
      return cachedCombined;
    }

    const combined = combiner(...results);

    if (
      USE_STRICT_MODE &&
      !lonely &&
      !options?.expensive
    ) {
      assertUselessMemo(results, combined);
    }

    if (
      combinedEqual &&
      combinedEqual(combined, cachedCombined)
    ) {
      return cachedCombined;
    }

    Storage.update(hash, results, combined);

    return combined;
  };

  selector.displayName = "unknown";

  return selector;
}

export { createMemoSelector };

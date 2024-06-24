import { deepEqual } from "fast-equals";
import { isArray, isNil, isObject, type TExplicitAny } from "@sb/utils";
import {
  type IBaseRecord,
  type IOrmState,
  type TBaseOrm,
  type TFindAllParameters,
  type TFindManyParameters,
  type TFindManyThroughParameters,
  type TGetAllParameters,
  type TGetManyParameters,
  type TGetManyThroughParameters,
} from "./Orm";

interface IParameters {
  state: IOrmState;
}

const sortObjectKeys = (obj: Record<string, unknown>): unknown => {
  if (isObject(obj)) {
    return Object
      .keys(obj)
      .sort()
      .reduce(
        (acc, key) => {
          if (isArray(obj[key])) {
            acc[key] = (obj[key] as Record<string, unknown>[]).map(sortObjectKeys);
          } else if (isObject(obj[key])) {
            acc[key] = sortObjectKeys(obj[key] as Record<string, unknown>);
          } else {
            acc[key] = obj[key];
          }

          return acc;
        },
        {} as Record<string, unknown>,
      );
  }

  return obj;
};

const objectToHash = (obj: Record<string, unknown>): string => {
  const sortedObject = sortObjectKeys(obj);

  const asString = JSON.stringify(sortedObject, (_, value) => isNil(value) ? "nil" : value as unknown);

  return asString.replace(/\s+/g, "");
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parametersToKey = ({ state, ...parameters }: IParameters) => objectToHash(parameters as unknown as Record<string, unknown>);

/**
 * Decorate base TOrm and add memoization behavior.
 */
const withMemoization = <T extends TBaseOrm>(orm: T): T => {
  const cache: Record<string, TExplicitAny[]> = {};

  const insertCache = (key: string, data: TExplicitAny[]) => {
    cache[key] = data;
  };

  const getCache = <T>(key: string) => cache[key] as T[];

  const handleCache = <T>(parameters: IParameters, data: T[]): T[] => {
    const key = parametersToKey(parameters);

    const cachedData = getCache<T>(key);

    if (deepEqual(data, cachedData)) {
      return cachedData;
    }

    insertCache(key, data);

    return data;
  };

  return {
    ...orm,

    findMany<T extends IBaseRecord = IBaseRecord>(parameters: TFindManyParameters<T>): T[] {
      return handleCache<T>(parameters, orm.findMany<T>(parameters));
    },

    getMany<T extends IBaseRecord = IBaseRecord>(parameters: TGetManyParameters<T>): T[] {
      return handleCache<T>(parameters, orm.getMany<T>(parameters));
    },

    findManyThrough<T extends IBaseRecord = IBaseRecord>(parameters: TFindManyThroughParameters): T[] {
      return handleCache<T>(parameters, orm.findManyThrough<T>(parameters));
    },

    getManyThrough<T extends IBaseRecord = IBaseRecord>(parameters: TGetManyThroughParameters): T[] {
      return handleCache<T>(parameters, orm.getManyThrough<T>(parameters));
    },

    findAll<T extends IBaseRecord = IBaseRecord>(parameters: TFindAllParameters): T[] {
      return handleCache<T>(parameters, orm.findAll<T>(parameters));
    },

    getAll<T extends IBaseRecord = IBaseRecord>(parameters: TGetAllParameters): T[] {
      return handleCache<T>(parameters, orm.getAll<T>(parameters));
    },
  };
};

export { withMemoization };

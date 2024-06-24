import { type TExplicitAny } from "@sb/utils";
import { type SerializableMap } from "./SerializableMap";
import {
  type IBaseRecord,
  type TBaseOrm,
  type TFindManyParameters,
  type TFindManyThroughParameters,
  type TFindOneParameters,
  type TFindOneThroughParameters,
  type TGetManyParameters,
  type TGetManyThroughParameters,
  type TGetOneParameters,
  type TGetOneThroughParameters,
  type TInsertParameters,
} from "./Orm";

interface IFrozenInsertParams extends Omit<TInsertParameters, "record"> {
  record: Readonly<IBaseRecord>;
}

type TOrmWithDeepFrozenRecord<T extends TBaseOrm = TBaseOrm> = T & {
  insert: (params: IFrozenInsertParams) => IFrozenState;

  findOne: <T extends IBaseRecord = IBaseRecord>(parameters: TFindOneParameters) => Readonly<T | undefined>;
  getOne: <T extends IBaseRecord = IBaseRecord>(parameters: TGetOneParameters) => Readonly<T>;

  findOneThrough: <T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
    parameters: TFindOneThroughParameters<U>,
  ) => Readonly<T | undefined>;
  getOneThrough: <T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
    parameters: TGetOneThroughParameters<U>,
  ) => Readonly<T>;

  findMany: <T extends IBaseRecord = IBaseRecord>(parameters: TFindManyParameters<T>) => readonly T[];
  getMany: <T extends IBaseRecord = IBaseRecord>(parameters: TGetManyParameters<T>) => readonly T[];

  findManyThrough: <T extends IBaseRecord = IBaseRecord>(parameters: TFindManyThroughParameters) => readonly T[];
  getManyThrough: <T extends IBaseRecord = IBaseRecord>(parameters: TGetManyThroughParameters) => readonly T[];

};

interface IFrozenState {
  [recordName: string]: SerializableMap<Readonly<TExplicitAny>>;
}

const deepFreeze = (obj: IBaseRecord) => {
  if (typeof obj !== "object" || Object.isFrozen(obj)) {
    return obj;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (obj.hasOwnProperty(key) && typeof value == "object") {
      deepFreeze(value as IBaseRecord);
    }
  }

  return Object.freeze(obj);
};

/**
 * Decorate base TOrm and deepFreeze every record.
 */
const withDeppFreeze: <T extends TBaseOrm>(orm: T) => TOrmWithDeepFrozenRecord<T> = (orm) => ({
  ...orm,
  insert(parameters: TInsertParameters): IFrozenState {
    deepFreeze(parameters.record);

    return orm.insert(parameters);
  },

  findOne<T extends IBaseRecord = IBaseRecord>(parameters: TFindOneParameters): Readonly<T | undefined> {
    return orm.findOne<T>(parameters);
  },

  getOne<T extends IBaseRecord = IBaseRecord>(parameters: TGetOneParameters): Readonly<T> {
    return orm.getOne(parameters);
  },

  findOneThrough<T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
    parameters: TFindOneThroughParameters<U>,
  ): Readonly<T | undefined> {
    return orm.findOneThrough(parameters);
  },

  getOneThrough<T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
    parameters: TGetOneThroughParameters<U>,
  ): Readonly<T> {
    return orm.getOneThrough(parameters);
  },

  findMany<T extends IBaseRecord = IBaseRecord>(parameters: TFindManyParameters<T>): readonly T[] {
    return orm.findMany<T>(parameters);
  },

  getMany<T extends IBaseRecord = IBaseRecord>(parameters: TGetManyParameters<T>): readonly T[] {
    return orm.getMany<T>(parameters);
  },

  findManyThrough<T extends IBaseRecord = IBaseRecord>(parameters: TFindManyThroughParameters): readonly T[] {
    return orm.findManyThrough<T>(parameters);
  },

  getManyThrough<T extends IBaseRecord = IBaseRecord>(parameters: TGetManyThroughParameters): readonly T[] {
    return orm.getManyThrough<T>(parameters);
  },
});

export {
  type IFrozenInsertParams,
  type TOrmWithDeepFrozenRecord,
  type IFrozenState,
  withDeppFreeze,
};


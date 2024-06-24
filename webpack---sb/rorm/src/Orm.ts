import { getNotNil, isNil, isNumber, notNil, type TExplicitAny, type TRequireAtLeastOne } from "@sb/utils";
import { SerializableMap } from "./SerializableMap";
import { createIndexer } from "./Indexer";
import { isOneToManyUnidirectional, type TMappings } from "./Mapping";
import { type TOrmWithDeepFrozenRecord, withDeppFreeze } from "./DeepFreeze";
import { Logger } from "./Logger";

type TRecordDefinition = string

type TRecord = Readonly<IBaseRecord>

interface IBaseRecord {
  readonly id: string;
}

interface IModel {
  refs: TMappings[];
  records: TRecordDefinition[];
}

interface IOrmState<T = TExplicitAny> {
  /**
   * Read/write/delete is very slow on plain object when there are hundreds of properties
   * Map is significantly faster
   */
  [recordName: string]: SerializableMap<T>;
}

type TOneToOneIndex = Record<string, string>;
type TOneToManyIndex = Record<string, string[]>;

type TIndexes = Record<string, TOneToOneIndex | TOneToManyIndex>;

type TBaseOrm = ReturnType<typeof createBaseOrm>;

type TOrm = TOrmWithDeepFrozenRecord; // shortcut

type TExtra = Record<string, string>;

type TWithLength = {
  /**
   * Length of array must equals to that length if it is number,
   * otherwise array length must be correct according to min or/and max
   */
  length: number | TRequireAtLeastOne<{
    min: number;
    max: number;
  }>;
};

type TBaseParameters<T = TExplicitAny> = {
  /**
   * ORM state
   */
  state: IOrmState<T>;
}

type TInsertParameters = TBaseParameters & {
  what: string;
  record: IBaseRecord;
  extra: TExtra;
}

type TInsertMapParameters = TBaseParameters & {
  what: string;
  map: Record<string, IBaseRecord>;
  extra: TExtra;
}

type TRemoveParameters = TBaseParameters & {
  what: string;
  id: string;
  throwError: boolean;
  extra: TExtra;
}

type TRemoveManyParameters = TBaseParameters & {
  what: string;
  ids: string[];
  throwError: boolean;
  extra: TExtra;
}

type TFindOneParameters<T = TExplicitAny> = TBaseParameters<T> & {
  /**
   * Record with that name should be selected
   */
  what: string;

  /**
   * Record with that id should be selected
   */
  id: string;
};

/**
 * Equals TFindOneParameters
 */
type TGetOneParameters = TFindOneParameters;

/**
 * Equals TFindOneParameters
 */
type THasOneParameters = TFindOneParameters;

type TFindOneThroughParameters<T extends IBaseRecord = IBaseRecord> = TBaseParameters & {
  /**
   * Record with that name should be selected
   */
  what: string;

  /**
   * Through what record should be selected
   */
  through: {
    /**
     * Record with that name refers to main record
     */
    what: string;

    /**
     * Record with that id refers to main record
     */
    id: string;

    /**
     * Field that contains main record id
     */
    field: keyof T;
  };
};

/**
 * Equals TFindOneThroughParameters
 */
type TGetOneThroughParameters<T extends IBaseRecord = IBaseRecord> = TFindOneThroughParameters<T>;

type TFindManyParameters<T extends IBaseRecord = IBaseRecord> = TBaseParameters & {
  /**
   * Array of records with that name should be selected
   */
  what: string;

  /**
   * By that field array or record must be filtered
   */
  field: keyof T;

  /**
   * Specified field of record must be shallowly equal to that value
   */
  value: string | boolean | number | null | undefined;
}

/**
 * Equals TFindManyParameters but with length. TWithLength described where declared
 */
type TGetManyParameters<T extends IBaseRecord = IBaseRecord> = TWithLength & TFindManyParameters<T>;

type TFindManyThroughParameters = TBaseParameters & {
  /**
   * Array of records with that name should be selected
   */
  what: string;

  /**
   * Through what record should be selected
   */
  through: {
    /**
     * Record with that name refers to main record
     */
    what: string;

    /**
     * Record with that id refers to main record
     */
    id: string;
  };
};

/**
 * Equals TFindManyThroughParameters but with length. TWithLength described where declared
 */
type TGetManyThroughParameters = TWithLength & TFindManyThroughParameters;

type TFindAllParameters = TBaseParameters & {
  /**
   * Array of records with that name should be selected
   */
  what: string;
}

/**
 * Equals TFindAllParameters but with length. TWithLength described where declared
 */
type TGetAllParameters = TWithLength & TFindAllParameters;

const Errors = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove({ state, ...parameters }: Record<string, unknown>) {
    new Error(`Error occurred in remove. Unable to remove record by such parameters: ${JSON.stringify(parameters, undefined, 2)}"`);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  select({ state, ...parameters }: Record<string, unknown>, text: string) {
    throw new Error(`Error occurred in select. ${text} by such parameters: ${JSON.stringify(parameters, undefined, 2)}`);
  },
};

const validateLength = (length: TWithLength["length"], target: TExplicitAny[]): void => {
  if (isNumber(length)) {
    if (target.length !== length) {
      throw new Error(`Result length is not equals length: ${target.length} !== ${length}`);
    }
  } else {
    const { min, max } = length;

    if (isNil(min) && isNil(max)) {
      throw new Error("At least min or max length required. Both can not bet absent");
    }

    if (notNil(min) && min < 0) {
      throw new Error(`Min length can not be less than zero: ${min}`);
    }

    if (notNil(max) && max < 0) {
      throw new Error(`Max length can not be less than zero: ${max}`);
    }

    if (notNil(min) && notNil(max) && min > max) {
      throw new Error(`Min length can not be greater then max length: ${min} > ${max}`);
    }

    if (notNil(min) && target.length < min) {
      throw new Error(`Result length is less than min length: ${target.length} < ${min}`);
    }

    if (notNil(max) && target.length > max) {
      throw new Error(`Result length is greater than max length: ${target.length} > ${max}`);
    }
  }
};

const createBaseOrm = (model: IModel) => ({
  indexer: createIndexer(model),

  model,

  insert(parameters: TInsertParameters): IOrmState {
    const { state, what, record } = parameters;

    const map = state[what] ?? new SerializableMap<TExplicitAny>();

    const nextState = { ...state };

    nextState[what] = map;

    map.set(record.id, record);

    // todo^eb optimize - now we perform full recompute
    this.indexer.recompute(nextState);

    return nextState;
  },

  // overload
  insertMap(parameters: TInsertMapParameters): IOrmState {
    const { state, map, ...rest } = parameters;

    return Object
      .values(map)
      .reduce(
        (nextState, record) => this.insert({
          state: nextState,
          record,
          ...rest,
        }),
        state,
      );
  },

  remove(parameters: TRemoveParameters): IOrmState {
    const {
      state,
      what,
      id,
      throwError,
    } = parameters;

    if (!state[what]?.has(id)) {
      if (throwError) {
        Errors.remove(parameters);
      }

      return state;
    }

    const map = getNotNil(state[what], ["Orm"], "What Map");

    const nextState: IOrmState = {
      ...state,
      [what]: map,
    };

    map.delete(id);

    if (map.size === 0) {
      delete nextState[what];
    }

    // todo^eb optimize - now we perform full recompute
    this.indexer.recompute(nextState);

    return nextState;
  },

  // overload
  removeMany(parameters: TRemoveManyParameters): IOrmState {
    const { state, ids, ...rest } = parameters;

    return ids.reduce(
      (nextState, id) => this.remove({
        state: nextState,
        id,
        ...rest,
      }),
      state,
    );
  },

  /**
   * Returns one record or undefined
   * @param parameters Described where declared
   */
  findOne<T extends IBaseRecord = IBaseRecord>(parameters: TFindOneParameters<T>): T | undefined {
    const {
      state,
      what,
      id,
    } = parameters;

    return state[what]?.get(id);
  },

  /**
   * Returns one boolean
   * @param parameters Described where declared
   */
  hasOne(parameters: THasOneParameters): boolean {
    const {
      state,
      what,
      id,
    } = parameters;

    return state[what]?.has(id) ?? false;
  },

  /**
   * Returns one record. Throws error if record not found
   * @param parameters Described where declared
   */
  getOne<T extends IBaseRecord = IBaseRecord>(parameters: TGetOneParameters): T {
    // Untyped function calls may not accept type arguments.
    // @ts-ignore
    const record = this.findOne<T>(parameters);

    if (!record) {
      return Errors.select(parameters, "Unable to get record");
    }

    return record;
  },

  /**
   * Returns one record through another record or undefined
   * @param parameters Described where declared
   */
  findOneThrough<T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
    parameters: TFindOneThroughParameters<U>,
  ): T | undefined {
    const {
      state,
      what,
      through,
    } = parameters;

    const id = state[through.what]?.get(through.id)?.[through.field];

    if (id) {
      // Untyped function calls may not accept type arguments.
      // @ts-ignore
      return this.findOne<T>({
        state,
        what,
        id,
      });
    }

    return undefined;
  },

  /**
   * Returns one record through another record. Throws error if record not found
   * @param parameters Described where declared
   */
  getOneThrough<T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
    parameters: TGetOneThroughParameters<U>,
  ): T {
    // Untyped function calls may not accept type arguments.
    // @ts-ignore
    const record = this.findOneThrough<T, U>(parameters);

    if (!record) {
      return Errors.select(parameters, "Unable to get one record through another");
    }

    return record;
  },

  /**
   * Returns array of records with any length, even 0
   * @param parameters Described where declared
   */
  findMany<T extends IBaseRecord = IBaseRecord>(parameters: TFindManyParameters<T>): T[] {
    const {
      state,
      what,
      field,
      value,
    } = parameters;

    const records = state[what]?.values();

    if (!records) {
      return [];
    }

    return Array.from(records).filter((record) => record[field] === value) as T[];
  },

  /**
   * Returns array of records. Throws error if array have incorrect length
   * @param parameters Described where declared
   */
  getMany<T extends IBaseRecord = IBaseRecord>(parameters: TGetManyParameters<T>): T[] {
    const { length, ...findParameters } = parameters;

    // Untyped function calls may not accept type arguments.
    // @ts-ignore
    const many = this.findMany<T>(findParameters);

    validateLength(length, many);

    return many;
  },

  /**
   * Returns array of records with any length, even 0 through another record using mapping
   * @param parameters Described where declared
   */
  findManyThrough<T extends IBaseRecord = IBaseRecord>(parameters: TFindManyThroughParameters): T[] {
    const {
      state,
      what,
      through,
    } = parameters;

    const joinColumn = this.model
      .refs
      .filter((mapping) => isOneToManyUnidirectional(mapping))
      .find((oneToMany) => oneToMany.sourceRecord === through.what && oneToMany.targetRecord === what)?.field;

    if (!joinColumn) {
      return Errors.select(parameters, "Unable to find OneToManyUnidirectional between what and through what");
    }

    const records = getNotNil(
      state[what]?.values(),
      ["findManyThrough"],
      `what: ${what}`,
    );

    return Array.from(records).filter((record) => record[joinColumn] === through.id) as T[];
  },

  /**
   * Returns array of records through another record using mapping. Throws error if array have incorrect length
   * @param parameters Described where declared
   */
  getManyThrough<T extends IBaseRecord = IBaseRecord>(parameters: TGetManyThroughParameters): T[] {
    const { length, ...findManyThroughParameters } = parameters;

    // Untyped function calls may not accept type arguments.
    // @ts-ignore
    const many = this.findManyThrough<T>(findManyThroughParameters);

    validateLength(length, many);

    return many;
  },

  /**
   * @deprecated It is not save to select all records from ORM. This method will be removed soon
   * Returns array of records with any length, even 0
   * @param parameters Described where declared
   */
  findAll<T extends IBaseRecord = IBaseRecord>(parameters: TFindAllParameters): T[] {
    Logger.warn.selector("[orm.findAll]", "It is not save to select all records from ORM. This method will be removed soon");

    const { state, what } = parameters;

    const records = state[what]?.values();

    let result: T[] = [];

    if (records) {
      result = Array.from(records);
    }

    return result;
  },

  /**
   * @deprecated It is not save to select all records from ORM. This method will be removed soon
   * Returns array of records. Throws error if array have incorrect length
   * @param parameters Described where declared
   */
  getAll<T extends IBaseRecord = IBaseRecord>(parameters: TGetAllParameters): T[] {
    Logger.warn.selector("[orm.getAll]", "It is not save to select all records from ORM. This method will be removed soon");

    const { state, what, length } = parameters;

    // Untyped function calls may not accept type arguments.
    // @ts-ignore
    const records = this.findAll<T>({ state, what });

    validateLength(length, records);

    return records;
  },
});

const createOrm = (model: IModel): TOrm => {
  if (process.env.DEV === "true") {
    return withDeppFreeze(createBaseOrm(model));
  } else {
    return createBaseOrm(model) as TOrm;
  }
};

export {
  type TRecordDefinition,
  type TRecord,
  type IBaseRecord,
  type IModel,
  type IOrmState,
  type TOneToOneIndex,
  type TOneToManyIndex,
  type TIndexes,
  type TBaseOrm,
  type TOrm,
  type TExtra,
  type TBaseParameters,
  type TInsertParameters,
  type TInsertMapParameters,
  type TRemoveParameters,
  type TRemoveManyParameters,
  type TFindOneParameters,
  type THasOneParameters,
  type TGetOneParameters,
  type TGetOneThroughParameters,
  type TFindOneThroughParameters,
  type TFindManyParameters,
  type TGetManyParameters,
  type TFindManyThroughParameters,
  type TGetManyThroughParameters,
  type TFindAllParameters,
  type TGetAllParameters,
  createOrm,
};

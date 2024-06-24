import { type TExplicitAny } from "@sb/utils";
import {
  type IBaseRecord,
  type IOrmState,
  type TBaseParameters,
  type TFindAllParameters,
  type TFindManyParameters,
  type TFindManyThroughParameters,
  type TFindOneParameters,
  type TFindOneThroughParameters,
  type TGetManyParameters,
  type TGetManyThroughParameters,
  type TGetOneParameters,
  type TGetOneThroughParameters,
  type THasOneParameters,
} from "./Orm";
import { ormStaticFacade } from "./OrmStaticFacade";

type TOmitState<T extends TBaseParameters> = Omit<T, "state">;

interface IWithOrmState {
  orm: IOrmState;
}

const ormSelector = <S extends IWithOrmState>(state: S): IOrmState => state.orm as unknown as IOrmState;

const createOrmSelector = <S extends IWithOrmState, T, A extends TExplicitAny[]>(combiner: (...args: A) => (res: IOrmState) => T) =>
  (state: S, ...args: A) => {
    const orm = ormSelector(state);

    return combiner(...args)(orm);
  };

const deferFindOne = <T extends IBaseRecord = IBaseRecord>(parameters: TOmitState<TFindOneParameters>) =>
  (state: IOrmState) =>
    ormStaticFacade.findOne<T>({ state, ...parameters });

const deferHasOne = (parameters: TOmitState<THasOneParameters>) =>
  (state: IOrmState) =>
    ormStaticFacade.hasOne({ state, ...parameters });

const deferGetOne = <T extends IBaseRecord = IBaseRecord>(parameters: TOmitState<TGetOneParameters>) =>
  (state: IOrmState) =>
    ormStaticFacade.getOne<T>({ state, ...parameters });

const deferFindOneThrough = <T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
  parameters: TOmitState<TFindOneThroughParameters<U>>,
) =>
    (state: IOrmState) =>
      ormStaticFacade.findOneThrough<T, U>({ state, ...parameters });

const deferGetOneThrough = <T extends IBaseRecord = IBaseRecord, U extends IBaseRecord = IBaseRecord>(
  parameters: TOmitState<TGetOneThroughParameters<U>>,
) =>
    (state: IOrmState) =>
      ormStaticFacade.getOneThrough<T, U>({ state, ...parameters });

const deferFindMany = <T extends IBaseRecord = IBaseRecord>(parameters: TOmitState<TFindManyParameters<T>>) =>
  (state: IOrmState) =>
    ormStaticFacade.findMany<T>({ state, ...parameters });

const deferGetMany = <T extends IBaseRecord = IBaseRecord>(parameters: TOmitState<TGetManyParameters<T>>) =>
  (state: IOrmState) =>
    ormStaticFacade.getMany<T>({ state, ...parameters });

const deferFindManyThrough = <T extends IBaseRecord = IBaseRecord>(parameters: TOmitState<TFindManyThroughParameters>) =>
  (state: IOrmState) =>
    ormStaticFacade.findManyThrough<T>({ state, ...parameters });

const deferGetManyThrough = <T extends IBaseRecord = IBaseRecord>(parameters: TOmitState<TGetManyThroughParameters>) =>
  (state: IOrmState) =>
    ormStaticFacade.getManyThrough<T>({ state, ...parameters });

/**
 * @deprecated It is not save to select all records from ORM. This method will be removed soon
 */
const deferFindAll = <T extends IBaseRecord = IBaseRecord>(parameters: TOmitState<TFindAllParameters>) =>
  (state: IOrmState) =>
    ormStaticFacade.findAll<T>({ state, ...parameters });

export {
  type IWithOrmState,
  ormSelector,
  createOrmSelector,
  deferFindOne,
  deferHasOne,
  deferGetOne,
  deferFindOneThrough,
  deferGetOneThrough,
  deferFindMany,
  deferGetMany,
  deferFindManyThrough,
  deferGetManyThrough,
  deferFindAll,
};

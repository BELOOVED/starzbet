import { type TExplicitAny } from "@sb/utils";
import { type TRecordDefinition } from "./Orm";

interface IAssociationMapping {
  targetRecord: TRecordDefinition;
  sourceRecord: TRecordDefinition;
  field: string;
  cascadeRemove?: boolean;
}

interface IOneToOneUnidirectionalMapping extends IAssociationMapping {
  type: "OneToOneUnidirectional";
}

interface IOneToManyUnidirectionalMapping extends IAssociationMapping {
  type: "OneToManyUnidirectional";
}

type TMappings = IOneToOneUnidirectionalMapping | IOneToManyUnidirectionalMapping

function isOneToOneUnidirectionalMapping(t: TMappings): t is IOneToOneUnidirectionalMapping {
  return t.type === "OneToOneUnidirectional";
}

function isOneToManyUnidirectional(t: TExplicitAny): t is IOneToManyUnidirectionalMapping {
  return t.type === "OneToManyUnidirectional";
}

const mapping = {
  /**
   * example:
   * ```js
   * const state = {
   *   user: {
   *     "u_1": { id: "u_1", wallet_id: "w_1" },
   *   },
   *   wallet: {
   *     "w_1": { id: "w_1" }
   *   }
   * }
   * ```
   *
   * OneToOneUnidirectional({
   *  targetRecordName: "wallet",
   *  sourceRecordName: "user",
   *  column: "wallet_id" // `wallet_id` should exists in `user` record.
   * })
   */
  OneToOneUnidirectional: (
    {
      targetRecord,
      sourceRecord,
      cascadeRemove,
      field,
    }: IAssociationMapping,
  ): IOneToOneUnidirectionalMapping =>
    // todo asserts
    ({
      targetRecord,
      sourceRecord,
      cascadeRemove,
      field: field,
      type: "OneToOneUnidirectional",
    })
  ,

  /**
   * example:
   * ```js
   * const state = {
   *   user: {
   *     "u_1": { id: "u_1", group_id: "g_1" },
   *     "u_2": { id: "u_1", group_id: "g_1" },
   *   },
   *   group: {
   *     "g_1": { id: "g_1" }
   *   }
   * }
   * ```
   *
   * OneToManyUnidirectional({
   *  targetRecordName: "user",
   *  sourceRecordName: "group",
   *  column: "group_id" // `group_id` should exists in `user` record.
   * })
   */
  OneToManyUnidirectional: (
    {
      targetRecord,
      sourceRecord,
      field,
      cascadeRemove,
    }: IAssociationMapping,
  ): IOneToManyUnidirectionalMapping => ({
    targetRecord,
    sourceRecord,
    field: field,
    cascadeRemove,
    type: "OneToManyUnidirectional",
  }),
};

export {
  type IAssociationMapping,
  type IOneToOneUnidirectionalMapping,
  type IOneToManyUnidirectionalMapping,
  type TMappings,
  isOneToOneUnidirectionalMapping,
  isOneToManyUnidirectional,
  mapping,
};

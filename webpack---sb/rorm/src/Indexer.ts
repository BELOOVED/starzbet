import { type IModel, type IOrmState, type TIndexes, type TOneToManyIndex, type TOneToOneIndex } from "./Orm";
import {
  type IOneToManyUnidirectionalMapping,
  type IOneToOneUnidirectionalMapping,
  isOneToManyUnidirectional,
  isOneToOneUnidirectionalMapping,
} from "./Mapping";

const createIndexer = (model: IModel) => ({
  indexes: {} as TIndexes,

  recompute(state: IOrmState): TIndexes {
    // clear
    this.indexes = {};

    // one to one case should create two indexes A_B and B_A
    model.refs
      .forEach((mapping) => {
        if (isOneToOneUnidirectionalMapping(mapping)) {
          this.indexes = {
            ...this.indexes,
            ...this.createOneToOneUnidirectionalIndex(state, mapping),
          };
        }

        if (isOneToManyUnidirectional(mapping)) {
          this.indexes = {
            ...this.indexes,
            ...this.createOneToManyUnidirectionalIndex(state, mapping),
          };
        }
      });

    return this.indexes;
  },

  createOneToOneUnidirectionalIndex(
    state: IOrmState,
    mapping: IOneToOneUnidirectionalMapping,
  ): Record<string, TOneToOneIndex> {
    const index: TOneToOneIndex = {};

    const sourceMap = state[mapping.sourceRecord];

    if (sourceMap) {
      sourceMap.forEach((record, sourceId) => {
        index[sourceId] = record[mapping.field];
      });
    }

    const indexName = `${mapping.sourceRecord}__${mapping.targetRecord}`;

    return { [indexName]: index };
  },

  createOneToManyUnidirectionalIndex(
    state: IOrmState,
    mapping: IOneToManyUnidirectionalMapping,
  ): Record<string, TOneToManyIndex> {
    const index: TOneToManyIndex = {};

    const sourceMap = state[mapping.sourceRecord];

    if (sourceMap) {
      sourceMap.forEach((_, sourceId) => {
        const ids: string[] = [];

        index[sourceId] = ids;

        const targetMap = state[mapping.targetRecord];

        if (targetMap) {
          targetMap.forEach((targetRecord) => {
            if (targetRecord[mapping.field] === sourceId) {
              ids.push(targetRecord.id);
            }
          });
        }
      });
    }

    const indexName = `${mapping.sourceRecord}__${mapping.targetRecord}`;

    return { [indexName]: index };
  },
});

export { createIndexer };

import {clone, setVersion, TVersionCache} from "./Version";
import {EChangeType} from "../EChangeType";
import {deepEqual} from "fast-equals";
import {IFlatFeed} from "./Types";
import { Logger } from "../Utils/Logger";

export const hasDiff = (entity) => entity.diff !== null;

export const shouldUpdate = (field) => field != null;

export const assertNotChanged = (prev, next) => {
  if (next !== null && !deepEqual(prev, next)) {
    Logger.warn.reducer("assertNotChanged", "Const value changed.");
  }
};

export const apply = (cache: TVersionCache, prevState, nextState, diff, id, key, create, update, remove, ...args) => {
  const allArgs = [cache, nextState, diff, id, ...args];

  // eslint-disable-next-line default-case
  switch (diff.changeType) {
    case EChangeType.CREATE:
      if (prevState[key].hasOwnProperty(id)) {
        update(...allArgs);
        return;
      }

      create(...allArgs);

      return;
    case EChangeType.UPDATE:
      if (!prevState[key].hasOwnProperty(id)) {
        Logger.warn.reducer("Fail update nonexistent item", diff, id);
        return;
      }

      update(...allArgs);

      return;
    case EChangeType.REMOVE:
      if (!prevState[key].hasOwnProperty(id)) {
        Logger.warn.reducer("Fail remove nonexistent item", diff, id);
        return;
      }

      remove(...allArgs);
  }
};
export const concatId = (parentId, childId) => `${parentId}->${childId}`;

export const addToIndex = (cache: TVersionCache, state: IFlatFeed, key: keyof IFlatFeed, forId: string, id: string) => {
  clone(cache, state, key);

  if (state[key][forId]) {
       clone(cache, state[key], forId);
  }

  const index = (state[key][forId] || []) as any as string[];

  state[key][forId] = index.concat(id);

  setVersion(state[key], 0);
  setVersion(state[key][forId], 0);
};

/**
 * Chains promises with same key to execute them sequentially
 *
 * Every added promise will be created when
 *  - there is no pending promise with same key
 *  - pending promise with same key terminated (fulfilled or rejected)
 */

import { getNotNil } from "./IsNil";

class PromiseChainer {
  private readonly state = new Map<string, Promise<unknown>[]>();

  public add<Result>(creator: () => Promise<Result>, keys: (string | number)[]): Promise<Result> {
    const key = keys.join("::@@::");

    let arr = this.state.get(key);

    if (!arr) {
      arr = [];

      this.state.set(key, arr);
    }

    const last = arr[arr.length - 1];

    let promise: Promise<Result>;

    if (last) {
      promise = last
        .catch(() => null)
        .then(() => this.create(creator, key, promise));
    } else {
      promise = this.create(creator, key);
    }

    arr.push(promise);

    return promise;
  }

  private create<Result>(creator: () => Promise<Result>, key: string, instance?: Promise<Result>): Promise<Result> {
    const promise = creator()
      .finally(() => {
        const arr = getNotNil(this.state.get(key), ["PromiseChainer", "create"], "arr");

        const index = arr.indexOf(instance ?? promise);

        if (index === -1) {
          throw new Error(`[PromiseChainer] Promise with key "${key}" not found`);
        }

        arr.splice(index, 1);

        if (arr.length === 0) {
          this.state.delete(key);
        }
      });

    return promise;
  }
}

export { PromiseChainer };

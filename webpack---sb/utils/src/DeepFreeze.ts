import { TExplicitAny } from "./TAny";

const deepFreeze = (value: TExplicitAny): void => {
  if (
    typeof value !== "object" ||
    value === null ||
    Object.isFrozen(value)
  ) {
    return;
  }

  /**
   * Methods that mutates array
   *  - pop
   *  - push
   *  - shift
   *  - unshift
   *  - reverse
   *  - sort
   *  - splice
   *
   * Only reverse and sort will not throw error by default
   * They need to be redefined
   */
  if (Array.isArray(value)) {
    /**
     * TODO @lebedev
     * Problems when Object.values/entries/keys called on frozen array
     */
    if (false) {
      value.reverse = () => {
        throw new Error("Can not perform \"reverse\" on frozen array");
      };

      value.sort = () => {
        throw new Error("Can not perform \"sort\" on frozen array");
      }
    }
  }

  Object
    .values(value)
    .forEach((it: TExplicitAny) => {
      deepFreeze(it);
    });
};

export { deepFreeze };

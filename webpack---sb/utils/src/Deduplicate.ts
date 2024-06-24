/**
 * When only list passed deduplicate array using set
 * With comparator as function deduplicate array using comparator for equality check
 * With comparator as string/array representing property name of item deduplicate array using check for equality by such/each property
 */
import { isArray, isFunction } from "./IsTypeOf";

export const deduplicate = <T, K extends keyof T>(list: Array<T>, comparator?: ((a: T, b: T) => boolean) | K | K[]): Array<T> => {
  if (comparator) {
    if (isFunction(comparator)) {
      return list.filter((item, index) => {
        const duplicateIndex = list.findIndex((innerItem) => comparator(item, innerItem));

        return duplicateIndex === index;
      });
    }

    if (isArray(comparator)) {
      return list.filter((item, index) => {
        const duplicateIndex = list.findIndex(
          (innerItem) => {
            if (item === innerItem) {
              return true;
            }

            return comparator.every(
              (key) => item?.[key] === innerItem?.[key]
            );
          },
        );

        return duplicateIndex === index;
      });
    }

    return list.filter((item, index) => {
      const duplicateIndex = list.findIndex((innerItem) => item?.[comparator] === innerItem?.[comparator]);

      return duplicateIndex === index;
    });
  }

  return Array.from(new Set(list));
}

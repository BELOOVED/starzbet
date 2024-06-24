type TMapKey = string | number;

export const groupBy = <V, T extends TMapKey = TMapKey>(get: (v: V) => T) => (arr: readonly V[]): Record<T, V[]> =>
  groupBy2(get, arr);

export const groupBy2 = <V, T extends TMapKey = TMapKey>(get: (v: V) => T, arr: readonly V[]): Record<T, V[]> => arr.reduce(
  (grouped, value) => {
    const key = get(value);

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(value);

    return grouped;
  },
  {} as Record<TMapKey, V[]>,
);

export const groupBy3 = <T, K extends TMapKey, V>(getKey: (v: T) => K, getValue: (v: T) => V, arr: readonly T[]): Record<K, V[]> => arr.reduce(
  (grouped, value) => {
    const key = getKey(value);

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(getValue(value));

    return grouped;
  },
  {} as Record<TMapKey, V[]>,
);

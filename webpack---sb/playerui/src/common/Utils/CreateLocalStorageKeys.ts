const createLocalStorageKeys = <S extends string>(namespace: string, keys: S[]): Record<S, string> => keys.reduce(
  (acc, cur) => {
    acc[cur] = `${namespace}/${cur}`;

    return acc;
  },
  {} as Record<S, string>,
);

export { createLocalStorageKeys };

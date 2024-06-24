type TEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const entries = <O extends Record<string, any>>(obj: O): TEntries<O> => Object.entries(obj);

export { entries };

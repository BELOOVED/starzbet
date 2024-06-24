type TBuild<T, N extends number, S extends T[]> = S["length"] extends N
  ? [...S, ...T[]]
  : TBuild<T, N, [...S, T]>;

type TArrayMinLength<T, N extends number> = TBuild<T, N, []>;

type TArrayNotEmpty<T> = [T, ...T[]];

const isArrayMinLength = <T, N extends number>(value: T[], size: N): value is TArrayMinLength<T, N> =>
  value.length >= size;

export { isArrayMinLength };
export type { TArrayMinLength, TArrayNotEmpty };

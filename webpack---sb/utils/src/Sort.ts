type TSortFunc<Value, Result extends number = number> = (a: Value, b: Value) => Result;

const sort = <T>(fn: TSortFunc<T> | undefined, list: T[]) => [...list].sort(fn);

export type { TSortFunc }
export { sort };

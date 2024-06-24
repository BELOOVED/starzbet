type TEntriesType = [PropertyKey, unknown][] | readonly (readonly [PropertyKey, unknown])[];

type TEntriesToObject<ENTRIES extends TEntriesType> = ENTRIES extends (infer R)[]
  ? R extends [infer key, infer val]
    ? { [prop in key & PropertyKey]: val }
    : never
  : never;

const fromEntries = <ENTRIES extends TEntriesType>(entries: ENTRIES): TEntriesToObject<ENTRIES> =>
  Object.fromEntries(entries) as TEntriesToObject<ENTRIES>;

export { fromEntries };

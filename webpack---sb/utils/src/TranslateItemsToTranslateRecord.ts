import { ELocale } from "./ELocale";

type TTranslateRecord = Partial<Record<ELocale, string>>;

type TTranslateItem = {
  locale: ELocale;
  translate: string;
};

const translateItemsToTranslateRecord = <T extends (Array<TTranslateItem> | null),
  R extends (T extends null ? null : TTranslateRecord)>(names: T): R => {
  if (names) {
    return names.reduce<TTranslateRecord>(
      (acc, cur) => ({
        ...acc,
        [cur.locale]: cur.translate,
      }),
      {},
    ) as R;
  }

  return names as unknown as R;
};

export type { TTranslateRecord, TTranslateItem };
export { translateItemsToTranslateRecord };

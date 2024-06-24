import { type ELocale } from "@sb/utils";

const translateToAllLangs = (
  locales: ELocale[],
  translateFn: (locale: ELocale) => string | undefined,
) => locales.reduce<Record<string, string>>(
  (acc, it) => {
    const result = translateFn(it);

    if (result === undefined) {
      return acc;
    }

    acc[it] = result;

    return acc;
  },
  {},
);

export { translateToAllLangs };

import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type ELocale, isNil, isNotVoid } from "@sb/utils";

const getTranslateByLocaleOrFirstNonNullableTranslate = (arr: TTranslateRecord_Fragment[], systemLocale: ELocale) => {
  let systemTranslate: string | null = null;
  let firstNonNullableTranslate: string | null = null;

  for (const { locale, translate } of arr) {
    if (locale === systemLocale && isNotVoid(translate)) {
      systemTranslate = translate;

      break;
    }

    if (isNotVoid(translate) && isNil(firstNonNullableTranslate)) {
      firstNonNullableTranslate = translate;
    }
  }

  return systemTranslate || firstNonNullableTranslate || "";
};
export { getTranslateByLocaleOrFirstNonNullableTranslate };

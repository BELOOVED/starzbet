import { memo } from "react";
import { useSelector } from "react-redux";
import { type ELocale, getNotNil, isNotNil, isVoid, type TNil, type TNullable } from "@sb/utils";
import { type TTranslateRecord_Fragment as ITranslateRecord } from "@sb/graphql-client";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import { platformConfigSystemLocaleSelector } from "../../../common/Store/Config/Selectors/ConfigSelectors";
import { localeSelector } from "../../Store/Locale/Selectors/localeSelector";

interface ITranslateRecordProps {
  record: TNullable<ITranslateRecord[]>;
}

const findByLocale = (locale: ELocale, record: ITranslateRecord[]) => record.find((it) => it.locale === locale);

function getTranslatedText(record: TNil, locale: ELocale, systemLocale: ELocale): null
function getTranslatedText(record: ITranslateRecord[], locale: ELocale, systemLocale: ELocale): string
function getTranslatedText(record: TNullable<ITranslateRecord[]>, locale: ELocale, systemLocale: ELocale): string | null

/**
 * for ITranslateRecord[] View we use appLocale => systemLocale => first available locale
 */
function getTranslatedText(
  record: TNullable<ITranslateRecord[]>,
  locale: ELocale,
  systemLocale: ELocale,
) {
  if (isVoid(record)) {
    return null;
  }

  const currentRecord = findByLocale(locale, record);

  if (isNotNil(currentRecord)) {
    return currentRecord.translate;
  }

  const systemRecord = findByLocale(systemLocale, record);

  if (isNotNil(systemRecord)) {
    return systemRecord.translate;
  }

  return getNotNil(record[0], ["TranslateRecord", "getTranslatedText"], "record[0]").translate;
}

const TranslateRecord = memo<ITranslateRecordProps>(({ record }) => {
  const locale = useSelector(localeSelector);
  const systemLocale = useSelector(platformConfigSystemLocaleSelector);

  return (
    getTranslatedText(record, locale, systemLocale)
  );
});
TranslateRecord.displayName = "TranslateRecord";

interface ITranslateRecordHTMLProps extends ITranslateRecordProps, IWithClassName, IWithQaAttribute {
  /** Ignore all html tags and return <b style="color: purple">only text content</b> */
  textContent?: boolean;
}

const TranslateRecordHTML = memo<ITranslateRecordHTMLProps>(({
  record,
  textContent,
  className,
  qaAttribute,
}) => {
  const locale = useSelector(localeSelector);
  const systemLocale = useSelector(platformConfigSystemLocaleSelector);
  const translatedText = getTranslatedText(record, locale, systemLocale) ?? "";

  const callbackRef = (element: HTMLDivElement | null) => {
    if (!element) {
      return;
    }

    element.innerHTML = textContent
      ? new DOMParser().parseFromString(translatedText, "text/html").body.textContent ?? ""
      : translatedText;
  };

  return <div className={className} ref={callbackRef} {...qaAttr(qaAttribute)} />;
});
TranslateRecordHTML.displayName = "TranslateRecordHTML";

export {
  getTranslatedText,
  TranslateRecord,
  TranslateRecordHTML,
  type ITranslateRecordHTMLProps,
};

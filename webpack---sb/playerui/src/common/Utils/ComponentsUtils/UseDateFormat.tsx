import { useSelector } from "react-redux";
import { IS_SERVER, Time, type TNullable } from "@sb/utils";
import { localeSelector } from "../../../platformui/Store/Locale/Selectors/localeSelector";
import { localClientTimeZoneOffsetSelector } from "../../Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { SUPPORTED_INTERNAL_LOCALES_LIST, SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP } from "../../Store/Locale/Model/TSupportedLocale";
import { renderToTemplate } from "../../Server/Core/Utils/RenderToTemplate";

const NOOP = "-";

//Nullable for legacy code support
type TDate = TNullable<string | number>

const useDateFormat = (date: TDate, format: string) => {
  const locale = useSelector(localeSelector);
  const offset = useSelector(localClientTimeZoneOffsetSelector);

  const timestamp = date ? Number(date) : undefined;

  //todo copy paste from @funsclub-ui
  if (IS_SERVER) {
    const timePerLocale = SUPPORTED_INTERNAL_LOCALES_LIST.reduce<Record<string, string>>(
      (acc, internalLocale) => {
        const publicLocale = SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP[internalLocale];

        acc[publicLocale] = Time.formatOrNoop(timestamp, format, NOOP, { offset, locale: internalLocale });

        return acc;
      },
      {},
    );

    return renderToTemplate("time", timePerLocale);
  }

  return Time.formatOrNoop(Number(date), format, NOOP, { offset, locale });
};
export { useDateFormat };

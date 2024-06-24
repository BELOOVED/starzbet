import { Time } from "@sb/utils";
import { type TIso8601Date } from "@sb/utils/Iso8601Type";

const iso8601Format = "yyyy-MM-dd";

type TIso8601Format = `${typeof iso8601Format}`;

type TReturnDateType<T> = T extends TIso8601Format ? TIso8601Date : string;

const parseDateString = (date: string, parseFormat = "dd/MM/yyyy") => Time.parse(date, parseFormat, Date.now());

const formatDateStringToIsoString = <T extends string | undefined = TIso8601Format>(
  date: string,
  displayFormat?: T,
  parseFormat = "dd/MM/yyyy",
) => (
  Time.format(Number(parseDateString(date, parseFormat)), displayFormat || iso8601Format) as TReturnDateType<T>
  );

export { parseDateString, formatDateStringToIsoString };

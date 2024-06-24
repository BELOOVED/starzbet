import { memo } from "react";
import { IS_SERVER, type TNullable } from "@sb/utils";
import { useDateFormat } from "../../Utils/ComponentsUtils/UseDateFormat";

interface IDateFormatProps {
  date: TNullable<string | number>;
  format: string;
}

const DateFormat = memo<IDateFormatProps>(({ date, format }) => {
  if (IS_SERVER) {
    throw new Error("DateFormat is forbidden for SSR, use TimeTagFormat instead");
  }

  return useDateFormat(date, format);
});
DateFormat.displayName = "DateFormat";

export { DateFormat };

import { useSelector } from "react-redux";
import { Time } from "@sb/utils";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { getSelfProtectionDuration } from "../Model/SelfProtectionInterval";

const useFormatDuration = (period: number | undefined) => {
  const locale = useSelector(localeSelector);

  return Time.formatDuration(getSelfProtectionDuration(period) ?? {}, locale);
};

export { useFormatDuration };


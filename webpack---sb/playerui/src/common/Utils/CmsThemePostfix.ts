import { DEFAULT_CMS_THEME_POSTFIX } from "@sb/cms-config";
import { isDev } from "@sb/utils";

const CMS_THEME_POSTFIX = process.env.MULTI_THEME_FEATURE_ENABLED ||
isDev
  ? process.env.THEME
  : DEFAULT_CMS_THEME_POSTFIX;

export {
  CMS_THEME_POSTFIX,
};

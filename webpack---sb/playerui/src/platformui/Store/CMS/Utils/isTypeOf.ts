import { isAnyObject, isArray, isNotNil, isString, type TExplicitAny } from "@sb/utils";
import type {
  TCms_MediaLink_Union_Fragment,
  TCms_MultiLang_Type_Fragment,
  TCms_ThemeFive_Footer_BlockContent_Fragment,
  TCms_ThemeFour_Footer_BlockContent_Fragment,
  TCms_ThemeOne_Footer_BlockContent_Fragment,
  TCms_ThemeSix_Footer_BlockContent_Fragment,
  TCms_ThemeTwo_Footer_BlockContent_Fragment,
} from "@sb/graphql-client/CmsUI";

type TThemesFooter = TCms_ThemeOne_Footer_BlockContent_Fragment |
  TCms_ThemeTwo_Footer_BlockContent_Fragment
  | TCms_ThemeFour_Footer_BlockContent_Fragment
  | TCms_ThemeFive_Footer_BlockContent_Fragment
  | TCms_ThemeSix_Footer_BlockContent_Fragment

const isThemeOneFooter = (content: TThemesFooter):
  content is TCms_ThemeOne_Footer_BlockContent_Fragment => content.__typename === "ThemeOne_Footer_BlockContent";

const isThemeFiveFooter = (content: TThemesFooter):
  content is TCms_ThemeFive_Footer_BlockContent_Fragment => content.__typename === "ThemeFive_Footer_BlockContent";

const isThemeTwoFooter = (content: TThemesFooter):
  content is TCms_ThemeTwo_Footer_BlockContent_Fragment => content.__typename === "ThemeTwo_Footer_BlockContent";

const isThemeFourFooter = (content: TThemesFooter):
  content is TCms_ThemeFour_Footer_BlockContent_Fragment => content.__typename === "ThemeFour_Footer_BlockContent";

const isThemeSixFooter = (content: TThemesFooter):
  content is TCms_ThemeSix_Footer_BlockContent_Fragment => content.__typename === "ThemeSix_Footer_BlockContent";

const isMediaLink = (content: TExplicitAny): content is TCms_MediaLink_Union_Fragment =>
  isNotNil(content) && (isString(content?.url) || isString(content?.pageId));

const isMultiLang = (candidate: unknown): candidate is TCms_MultiLang_Type_Fragment =>
  isAnyObject(candidate) && (isString(candidate.locale) && "translate" in candidate);

const isMultiLangArray = (candidate: unknown): candidate is TCms_MultiLang_Type_Fragment[] =>
  isArray(candidate) && candidate.every(isMultiLang);

export {
  isMultiLangArray,
  isThemeSixFooter,
  isThemeFiveFooter,
  isThemeFourFooter,
  isMediaLink,
  isThemeTwoFooter,
  isThemeOneFooter,
};

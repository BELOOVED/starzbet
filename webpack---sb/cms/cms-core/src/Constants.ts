import { EGamePage } from "@sb/betting-core/EGamePage";
import { EComponentsType, EPageType, ERootPages } from "./EnumTypes";

const PAGE_ID = "pageId";

const BLOCK_ID = "@blockId";

const TAG_ID = "tagId";

const TAG_CONST = "tag";

const VERSION = "version";

const PARENT_PAGE_ID = "@parentPageId";

const META_CONTENT = "metaContent";

const PRIORITY = "_priority_";

const LIST_ELEMENT_NAME = "listElementName";

const CHILD_PAGES_COUNT = "@childPagesCount";

const SHOW_CHILDREN_BY_DEFAULT = "@showChildrenByDefault";

const MEDIA_TYPE = "_mediaType_";

const BLOCK_TYPE = "@blockType";

const BLOCK_CONTENT = "blockContent";

const PAGE_CONTENT = "pageContent";

const VARIABLES = "@variables";

const CURRENT_LOCALE = "@currentLocale";

const STATE_WAS_CHANGED = "@stateWasChanged";

const TAG_LIST_MAP = "tagListMap";

const TAGS_PATH_LIST = "tagsPathList";

const PAGE = "page";

const PAGE_TYPE = "@pageType";

const DISABLED_FIELD = "_DISABLED_";

const CMS_PLATFORM_FORM_NAME = "CMS_PLATFORM_FORM_NAME";

const CMS_AFFILIATE_FORM_NAME = "CMS_AFFILIATE_FORM_NAME";

const CMS_FORM_NAMES = [CMS_PLATFORM_FORM_NAME, CMS_AFFILIATE_FORM_NAME] as const;

const LANDING_GAME_PAGES = [EGamePage.CASINO, EGamePage.LIVE_CASINO];

const PAGE_TYPE_TO_ROOT_PAGE_MAP: Partial<Record<EPageType, ERootPages>> = {
  [EPageType.infoPage]: ERootPages.infoPageName,
  [EPageType.childInfoPage]: ERootPages.infoPageName,
  [EPageType.termsPage]: ERootPages.termsConditionsPageName,
  [EPageType.privacyPage]: ERootPages.privacyPolicyPageName,
  [EPageType.promoPage]: ERootPages.promotionsPageName,
};

const RICH_TEXT_COMPONENTS = [EComponentsType.textAreaWithVariables, EComponentsType.textEditor];

export {
  RICH_TEXT_COMPONENTS,
  PAGE_TYPE_TO_ROOT_PAGE_MAP,
  CMS_PLATFORM_FORM_NAME,
  CMS_AFFILIATE_FORM_NAME,
  CMS_FORM_NAMES,
  META_CONTENT,
  CHILD_PAGES_COUNT,
  VARIABLES,
  PAGE_CONTENT,
  VERSION,
  LIST_ELEMENT_NAME,
  BLOCK_CONTENT,
  BLOCK_ID,
  TAG_CONST,
  TAGS_PATH_LIST,
  CURRENT_LOCALE,
  SHOW_CHILDREN_BY_DEFAULT,
  TAG_LIST_MAP,
  PAGE_TYPE,
  PAGE,
  PAGE_ID,
  PARENT_PAGE_ID,
  PRIORITY,
  STATE_WAS_CHANGED,
  MEDIA_TYPE,
  TAG_ID,
  BLOCK_TYPE,
  DISABLED_FIELD,
  LANDING_GAME_PAGES,
};

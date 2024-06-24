import { cmsui_general_blocks, cmsui_general_pages, cmsui_general_variables, type TKey } from "@sb/translates/cmsui/Keys";

enum ETypes {
  SIMPLE = "simple",
  ONE_OF = "oneOf",
  ONE_OF_GROUP = "oneOfGroup",
  LIST = "list",
  GROUP = "group",
}

enum EBlockTypeMap {
  BLOCKS = "Blocks",
  PAGES = "Pages",
  VARIABLES = "Variables",
}

const blocksTypeTranslate: Record<EBlockTypeMap, TKey> = {
  [EBlockTypeMap.BLOCKS]: cmsui_general_blocks,
  [EBlockTypeMap.PAGES]: cmsui_general_pages,
  [EBlockTypeMap.VARIABLES]: cmsui_general_variables,
};

enum EPlatformBlockMap {
  FOOTER = "footer",
  CONTACT_US = "Player profile - contact us",
  E2ETest = "E2ETest",
  LANDING = "landing",
  TV_CHANNEL = "TV channel",
  BANNERS = "Banners",
  HIGHLIGHTS = "Highlights",
}

enum EAffiliateBlockMap {
  SLIDER = "Slider",
  CHOOSE = "Choose Us",
  COMMISSIONS = "Commissions",
  CONTACTS = "Contacts",
  TERMS_CONDITIONS = "Terms and Conditions"
}

enum EGqlIds {
  NOOP = "NOOP",
  SIMPLE_PAGE_CONTENT_THEME_ONE = "SIMPLE_PAGE_CONTENT_THEME_ONE",
  CONTACT_US_PROFILE_BLOCK = "CONTACT_US_PROFILE_BLOCK",
  SIMPLE_PAGE_CONTENT_THEME_FOUR = "SIMPLE_PAGE_CONTENT_THEME_FOUR",
  PROMO_PAGE_CONTENT_THEME_TWO = "PROMO_PAGE_CONTENT_THEME_TWO",
  PROMO_PAGE_CONTENT_THEME_FOUR = "PROMO_PAGE_CONTENT_THEME_FOUR",
  SIMPLE_PAGE_CONTENT_LIST = "SIMPLE_PAGE_CONTENT_LIST",
  PROMO_TAGS_LIST = "PROMO_TAGS_LIST",
  LINKS_BLOCK_LIST = "LINKS_BLOCK_LIST",
  LINKS_BLOCK_LIST_WITH_TITLE = "LINKS_BLOCK_LIST_WITH_TITLE",
  LIST_WITH_IMAGE = "LIST_WITH_IMAGE",
  LIST_WITH_IMAGE_AND_MULTILANG_INPUT = "LIST_WITH_IMAGE_AND_MULTILANG_INPUT",
  LICENSE_BLOCK = "LICENSE_BLOCK",
  LABELS_LIST_WRAPPER = "LABELS_LIST_WRAPPER",
  LABELS_WITH_IMAGE_LIST_WRAPPER = "LABELS_WITH_IMAGE_LIST_WRAPPER",
  IMAGE_WITH_OR_WITHOUT_MEDIA_LINK = "IMAGE_WITH_OR_WITHOUT_MEDIA_LINK",
  LIST_WITH_IMAGE_AND_SIMPLE_INPUT = "LIST_WITH_IMAGE_AND_SIMPLE_INPUT",
  VIP_TABLES = "VIP_TABLES",
  BANNER = "BANNER",
  HIGHLIGHTS = "HIGHLIGHTS",
}

enum EIdsBlock {
  fileField = "fileField",
  select = "select",
  tag = "tag",
  faq = "faq",
  phone = "phone",
  richText = "richText",
  image = "image",
  imageWithTheme = "imageWithTheme",
  apk = "apk",
  promo = "promo",
  promoWithoutImage = "promoWithoutImage",
  simplePromoWithBonus = "simplePromoWithBonus",
  simplePromoWithBonusThemeTwo = "simplePromoWithBonusThemeTwo",
  simplePromoWithoutBonus = "simplePromoWithoutBonus",
  simplePromoWithoutBonusThemeTwo = "simplePromoWithoutBonusThemeTwo",
  infoTitle = "infoTitle",
  linksBlock = "linksBlock",
  commissionCardType = "commissionCardType",
  simpleText = "simpleText",
  simpleBonus = "simpleBonus",
  textBlock = "textBlock",
  coupon = "coupon",
  game = "game",
  licence = "licence",
  textAreaWithVariables = "textAreaWithVariables",
  textArea = "textArea",
  variablesBlock = "variablesBlock",
  variablesTable = "variablesTable",
  metaContent = "metaContent",
  textEditor = "textEditor",
  gameLabel = "gameLabel",
  gameLabelWithImage = "gameLabelWithImage",
  games = "games",
  gamesWithImage = "gamesWithImage",
  colorPicker = "colorPicker",
}

enum ETypeInput {
  eternal = "eternal",
  external = "external",
}

enum EFieldKeys {
  CHILD_FORM = "@CHILD_FORM",
}

enum EPageType {
  childInfoPage = "childInfoPage",
  infoPage = "infoPage",
  termsPage = "termsPage",
  privacyPage = "privacyPage",
  promoPage = "promoPage",
  landingPage = "landingPage"
}

enum EPageContentType {
  simplePage = "simplePage",
  promoPage = "promoPage",
  landingPage = "landingPage"
}

enum ERootPages {
  infoPageName = "Info",
  termsConditionsPageName = "TermsConditions",
  privacyPolicyPageName = "PrivacyPolicy",
  promotionsPageName = "Promotions",
  landingPageName = "Landing"
}

enum EComponentsType {
  fileField = "fileField",
  emptyContainer = "emptyContainer",
  tagsContainer = "tagsContainer",
  blockContainer = "blockContainer",
  mainContainer = "mainContainer",
  mediaInput = "mediaInput",
  chooseTags = "chooseTags",
  filesField = "filesField",
  chooseBonus = "chooseBonus",
  variableInput = "variableInput",
  tagsList = "tagsList",
  tagsInput = "tagsInput",
  listContainer = "listContainer",
  oneOfContainer = "oneOfContainer",
  tagForm = "tagForm",
  textInputUrl = "textInputUrl",
  multiLangInput = "multiLangInput",
  imageInput = "imageInput",
  apkInput = "apkInput",
  multiLangInputTitle = "multiLangInputTitle",
  priorityInput = "priorityInput",
  textInput = "textInput",
  commissionCardType = "commissionCardType",
  idInput = "idInput",
  pageTypeInput = "pageTypeInput",
  couponInput = "couponInput",
  gameContainer = "gameContainer",
  textAreaWithVariables = "textAreaWithVariables",
  textArea = "textArea",
  textEditor = "textEditor",
  phone = "phone",
  variableTable = "variableTable",
  variableField = "variableField",
  gameLabelField = "gameLabelField",
  gamesField = "gamesField",
  listElementNameField = "listElementNameField",
  colorPickerField = "colorPickerField",
  select = "select",
}

type TCmsSelectProps<V extends string | number = string | number> = {
  label: TKey;
  options: {value: V;}[];
  titleMap: Record<V, TKey>;
  defaultValue?: V;
  placeholder: TKey;
}

type TCmsColorPickerProps = {
  label: TKey;
  name: TKey;
};

type TCmsFileFieldProps = {
  allowedTypes: string[];
  fileType: string;
  multiple?: boolean;
  label: TKey;
  uploadTitle: TKey;
};

type TComponentsPropsMap = {
  [EComponentsType.fileField]: TCmsFileFieldProps;
  [EComponentsType.select]: TCmsSelectProps;
  [EComponentsType.colorPickerField]: TCmsColorPickerProps;
  [EComponentsType.imageInput]: undefined;
  [EComponentsType.emptyContainer]: undefined;
  [EComponentsType.tagsContainer]: undefined;
  [EComponentsType.blockContainer]: undefined;
  [EComponentsType.mainContainer]: undefined;
  [EComponentsType.mediaInput]: undefined;
  [EComponentsType.chooseTags]: undefined;
  [EComponentsType.filesField]: undefined;
  [EComponentsType.chooseBonus]: undefined;
  [EComponentsType.variableInput]: undefined;
  [EComponentsType.tagsList]: undefined;
  [EComponentsType.tagsInput]: undefined;
  [EComponentsType.listContainer]: undefined;
  [EComponentsType.oneOfContainer]: undefined;
  [EComponentsType.tagForm]: undefined;
  [EComponentsType.textInputUrl]: undefined;
  [EComponentsType.multiLangInput]: undefined;
  [EComponentsType.apkInput]: undefined;
  [EComponentsType.multiLangInputTitle]: undefined;
  [EComponentsType.priorityInput]: undefined;
  [EComponentsType.textInput]: undefined;
  [EComponentsType.commissionCardType]: undefined;
  [EComponentsType.idInput]: undefined;
  [EComponentsType.pageTypeInput]: undefined;
  [EComponentsType.couponInput]: undefined;
  [EComponentsType.gameContainer]: undefined;
  [EComponentsType.textAreaWithVariables]: undefined;
  [EComponentsType.textArea]: undefined;
  [EComponentsType.textEditor]: undefined;
  [EComponentsType.phone]: undefined;
  [EComponentsType.variableTable]: undefined;
  [EComponentsType.variableField]: undefined;
  [EComponentsType.gameLabelField]: undefined;
  [EComponentsType.gamesField]: undefined;
  [EComponentsType.listElementNameField]: undefined;
}

enum EThemeSegment {
  allTheme = "allTheme",
  dark = "dark",
  light = "light"
}

export {
  EThemeSegment,
  EPlatformBlockMap,
  EGqlIds,
  EAffiliateBlockMap,
  EComponentsType,
  ERootPages,
  ETypeInput,
  EIdsBlock,
  EPageContentType,
  EBlockTypeMap,
  ETypes,
  EFieldKeys,
  EPageType,
  blocksTypeTranslate,
  type TComponentsPropsMap,
};

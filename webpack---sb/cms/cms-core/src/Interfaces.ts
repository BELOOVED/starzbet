import {
  type _HIDDEN_FIELD_,
  type CMS_EXTENSION_KEY,
  type EDefType,
  type FILES_FIELD,
  type ICreateFormParams,
  type IDef,
  type IFieldDef,
  type IFormDef,
  type IObjectFieldDef,
  type IOneOfDef,
  type IWithFormsState,
  type TFieldPath,
} from "@sb/form-new";
import { type ELocale, type TExplicitAny } from "@sb/utils";
import { type TKey } from "@sb/translates/cmsui/Keys";
import {
  type EAffiliateBlockMap,
  type EComponentsType,
  type EGqlIds,
  EIdsBlock,
  type EPageType,
  type EPlatformBlockMap,
  type ERootPages,
  type ETypeInput,
  type ETypes,
  type TComponentsPropsMap,
} from "./EnumTypes";
import {
  type BLOCK_CONTENT,
  type BLOCK_ID,
  type BLOCK_TYPE,
  type CHILD_PAGES_COUNT,
  type DISABLED_FIELD,
  type META_CONTENT,
  type PAGE_CONTENT,
  type PAGE_ID,
  type PAGE_TYPE,
  type PARENT_PAGE_ID,
  type PRIORITY,
  type STATE_WAS_CHANGED,
  type VARIABLES,
  type VERSION,
} from "./Constants";
import {
  apkForm,
  bonusField,
  colorPickerField,
  commissionCardTypeForm,
  couponBlock,
  faqForm,
  fileField,
  gameBlock,
  gameLabel,
  gameLabelWithImage,
  games,
  gamesWithImage,
  imageForm,
  imageFormWithTheme,
  infoTitle,
  licenceBlock,
  linksBlockForm,
  metaContentForm,
  phone,
  promoForm,
  promoFormWithoutImage,
  richTextForm,
  selectField,
  simplePromoWithBonus,
  simplePromoWithBonusStarzbet,
  simplePromoWithoutBonus,
  simplePromoWithoutBonusStarzbet,
  simpleText,
  tagForm,
  textAreaForm,
  textAreaWithVariablesForm,
  textBlockForm,
  textEditorField,
  variablesBlockForm,
  variablesTableForm,
} from "./Utils/CMSFormType";

type TBlockTypeUnion = IListBlock | IGroupBlock | ISimpleBlock | IOneOfBlock | IOneOfGroup

interface IExtensions {
  required: boolean;
  listChild: boolean;
  [CMS_EXTENSION_KEY]: ICMSExtensions;
}

interface ICMSExtensions {
  componentType: EComponentsType;
  customExtensions: ICustomExtensions;
  [PAGE_TYPE]: EPageType;
  oneOfDescription?: TKey;
  containerTitle?: TKey;
  title?: string;
  simpleForm?: boolean;
}

interface IDefByTaxonomy<State extends IWithFormsState> {
  mainDefinitions: ICreateFormParams<State>;
  testDefinitions: IFormDef<State>;
}

interface IMetaDataDef {
  readonly type: EDefType;
  readonly extensions: IExtensions;
}

interface IBlockTypeDef {
  fields: Record<TBlockUnion, IBlockGeneralDef> & ISystemFieldsDef;
  readonly type: EDefType.form;
}

interface ICommonExtensions {
  required: boolean;
  simpleConfig?: ISimpleConfig;
  listChild?: boolean;
  enumCode?: EGqlIds;
  valueType?: string;
}

interface IBlockGeneralDef extends IMetaDataDef {
  fields: IBlockGeneralFieldsDef;
}

interface IBlockGeneralFieldsDef extends ISystemFieldsDef {
  [BLOCK_CONTENT]: IFormDef;
  [BLOCK_ID]: IFieldDef;
  [BLOCK_TYPE]: IBlockTypeDef;
}

interface IBlockGeneralFields {
  [BLOCK_CONTENT]: IBlockContent;
  [BLOCK_ID]: string;
  [BLOCK_TYPE]: string;
  [DISABLED_FIELD]?: string;
  [_HIDDEN_FIELD_]?: string;
}

interface IGeneralField extends ISystemFieldsDef {
  [BLOCK_TYPE]: IBlockTypeDef;
}

interface ISystemFieldsDef {
  [DISABLED_FIELD]: IFieldDef;
  [_HIDDEN_FIELD_]: IFieldDef;
}

interface IGeneralDef extends IDef {
  fields: IGeneralField & Record<string, IFormPageDef>;
  readonly type: EDefType.form;
}

interface IListDefWithOneOf extends IDef {
  readonly type: EDefType.list;
  fields: IOneOfDef;
}

interface IPageDefFields {
  [DISABLED_FIELD]: IFieldDef;
  [_HIDDEN_FIELD_]: IFieldDef;
  [PAGE_ID]: IFieldDef;
  [PARENT_PAGE_ID]: IFieldDef;
  [PRIORITY]: IFieldDef;
  title: IObjectFieldDef;
  url: IFieldDef;
  [PAGE_CONTENT]: IPageContentDef;
  page?: IListPageDef;
}

interface IPageContentDef extends IMetaDataDef {
  readonly type: EDefType.form;
  fields: IBlockGeneralFieldsDef;
}

interface IResetState {
  [_HIDDEN_FIELD_]?: string;
  [PRIORITY]?: number;
}

interface IFormPageDef extends IMetaDataDef {
  readonly type: EDefType.form;
  fields: IPageDefFields;
}

interface IPageData {
  [PAGE_ID]: string;
  title?: string;
  url?: string;
  [PARENT_PAGE_ID]?: string | null;
  page?: Record<string | number, IPageData>;
}

interface IListPageDef extends IMetaDataDef {
  readonly type: EDefType.list;
  fields: IFormPageDef;
}

interface IGroupBlock {
  block: TBlockTypeUnion[];
  blockName: TKey;
  blockConfig: IBlockConfig;
  readonly type: ETypes.GROUP;
}

interface ISimpleBlock extends IBlockObj {
  readonly type: ETypes.SIMPLE;
}

interface ISimplePage extends IChildPage {
  readonly type: ETypes.SIMPLE;
}

interface IOneOfBlock {
  block: (IGroupBlock | ISimpleBlock | IOneOfBlock | IOneOfGroup)[];
  canDisabled: boolean;
  readonly type: ETypes.ONE_OF;
}

interface IOneOfGroup {
  block: (IGroupBlock | ISimpleBlock | IOneOfBlock | IOneOfGroup)[];
  readonly type: ETypes.ONE_OF_GROUP;
  canDisabled: boolean;
}

interface IListBlock {
  block: TBlockTypeUnion;
  title: TKey;
  maxCount: number;
  blockConfig: IBlockConfig;
  readonly type: ETypes.LIST;
}

interface IMultilang {
  locale: ELocale;
  translate: string;
}

interface IVariables {
  slug: string;
  name: IMultilang[];
  value: IMultilang[];
}

interface IMediaInputValue {
  [PAGE_ID]: string;
  url?: string;
  anchor: IMultilang[];
  [_HIDDEN_FIELD_]: ETypeInput;
}

interface IPage extends IChildPage {
  title: string;
}

interface IChildPage {
  [VERSION]: number;
  pageType: EPageType;
  blocksMap?: TBlockTypeUnion[];
  childPage?: IChildPageBuilder;
  metaContent?: TBlockTypeUnion[];
}

interface IMaxCount {
  maxCount: number;
}

interface ISignatureBlockList extends IMaxCount {
  block: TBlockTypeUnion;
  title: TKey;
  isNotDraggableChild?: boolean;
  inline?: boolean;
  isHiddenTitle?: boolean;
}

interface ISignaturePageList extends IMaxCount {
  page: ISimplePage;
}

interface IPageBuilder {
  static: TStaticPage;
  dynamic?: TDynamicPage;
}

type TStaticPage = Record<string, IPage>

type TDynamicPage = Record<string, ISimplePage | IListPage>

interface IListPage {
  page: ISimplePage;
  maxCount: number;
  readonly type: ETypes.LIST;
}

interface IChildPageBuilder {
  static?: IListPage;
  dynamic?: IListPage;
}

interface IBlock {
  id: EIdsBlock;
}

interface ISimpleConfig {
  blockTitle: string;
  withoutWrapper: boolean;
  oneOfDescription?: TKey;
  listChild?: boolean;
  componentProps: TComponentsPropsMap[EComponentsType];
}

interface IBlockObj {
  block: IBlock;
  customExtensions: ICommonExtensions;
}

type TRenderPanelState = Record<ERootPages, IData> & IVariablesContent & {
  [BLOCK_TYPE]?: Record<EPlatformBlockMap, TExplicitAny>;
}

type TBlockUnion = EPlatformBlockMap | EAffiliateBlockMap

interface IVariablesContent {
  [VARIABLES]: {
    list: {
      content: IVariables[];
    };
  };
}

interface IPageContentWrap {
  [PAGE_CONTENT]?: IPageContent;
}

interface IData extends IPageContentWrap {
  [PAGE_ID]: string;
  [PARENT_PAGE_ID]: null | string;
  [PAGE_TYPE]: string;
  [PRIORITY]: number;
  url: string;
  title: IMultilang[];
  [CHILD_PAGES_COUNT]: number;
  page?: IData[];
  [DISABLED_FIELD]?: boolean;
}

interface IMetaTag {
  simpleBlock: string;
  description: {
    description: IMultilang[];
  };
}

interface IBlockContentContainer {
  [STATE_WAS_CHANGED]?: boolean;
  [BLOCK_CONTENT]?: IBlockContent;
  [BLOCK_TYPE]?: EPageType;
  [BLOCK_ID]?: string;
  [META_CONTENT]?: IMetaContent;
}

interface IPageContent {
  [BLOCK_CONTENT]?: IPageBlockContent;
  [BLOCK_TYPE]?: EPageType;
  [BLOCK_ID]?: string;
}

interface IPageBlockContent extends Record<string, TExplicitAny> {
  [META_CONTENT]?: IMetaContent;
  [FILES_FIELD]?: string[];
}

interface IBlockContent extends Record<string, TExplicitAny> {
  [FILES_FIELD]?: string[];
}

interface IMetaContent {
  content?: IMetaTag[];
}

interface IWithPriority {
  [PRIORITY]: number;
}

interface IDraggableContent {
  onDrop: (path: TFieldPath, list: number[]) => void;
  onDropPages: (dragIndex: number, dropIndex: number, list: number[]) => void;
}

interface ICustomExtensions {
  [VERSION]: number;
  [PAGE_TYPE]?: EPageType;
  [BLOCK_TYPE]?: EPageType | EPlatformBlockMap;
  required?: boolean;
  simpleConfig?: ISimpleConfig;
  isPage?: boolean;
  [PRIORITY]?: number;
  canDisabled?: boolean;
  isNotDraggableChild?: boolean;
  isBlockContent?: boolean;
  defaultPageName?: string;
  withMetaContent?: boolean;
  maxCount?: number;
  blockTitle?: TKey;
  withoutTitle?: boolean;
}

interface IBlockConfig {
  canDisabled: boolean;
  enumCode: EGqlIds;
  oneOfDescription?: TKey;
}

interface IRecord {
  key: string;
  value: string;
}

const blocksMap: IBlocks = {
  [EIdsBlock.fileField]: fileField,
  [EIdsBlock.select]: selectField,
  [EIdsBlock.colorPicker]: colorPickerField,
  [EIdsBlock.faq]: faqForm,
  [EIdsBlock.richText]: richTextForm,
  [EIdsBlock.image]: imageForm,
  [EIdsBlock.imageWithTheme]: imageFormWithTheme,
  [EIdsBlock.apk]: apkForm,
  [EIdsBlock.promo]: promoForm,
  [EIdsBlock.promoWithoutImage]: promoFormWithoutImage,
  [EIdsBlock.simplePromoWithBonus]: simplePromoWithBonus,
  [EIdsBlock.simplePromoWithoutBonus]: simplePromoWithoutBonus,
  [EIdsBlock.simplePromoWithoutBonusThemeTwo]: simplePromoWithoutBonusStarzbet,
  [EIdsBlock.simplePromoWithBonusThemeTwo]: simplePromoWithBonusStarzbet,
  [EIdsBlock.infoTitle]: infoTitle,
  [EIdsBlock.linksBlock]: linksBlockForm,
  [EIdsBlock.licence]: licenceBlock,
  [EIdsBlock.tag]: tagForm,
  [EIdsBlock.textBlock]: textBlockForm,
  [EIdsBlock.coupon]: couponBlock,
  [EIdsBlock.game]: gameBlock,
  [EIdsBlock.simpleText]: simpleText,
  [EIdsBlock.phone]: phone,
  [EIdsBlock.gameLabel]: gameLabel,
  [EIdsBlock.games]: games,
  [EIdsBlock.gameLabelWithImage]: gameLabelWithImage,
  [EIdsBlock.gamesWithImage]: gamesWithImage,
  [EIdsBlock.simpleBonus]: bonusField,
  [EIdsBlock.textAreaWithVariables]: textAreaWithVariablesForm,
  [EIdsBlock.textArea]: textAreaForm,
  [EIdsBlock.variablesBlock]: variablesBlockForm,
  [EIdsBlock.variablesTable]: variablesTableForm,
  [EIdsBlock.metaContent]: metaContentForm,
  [EIdsBlock.commissionCardType]: commissionCardTypeForm,
  [EIdsBlock.textEditor]: textEditorField,
};

interface IBlocks {
  [EIdsBlock.fileField]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof fileField>;
  [EIdsBlock.select]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof selectField>;
  [EIdsBlock.colorPicker]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof colorPickerField>;
  [EIdsBlock.faq]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof faqForm>;
  [EIdsBlock.richText]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof richTextForm>;
  [EIdsBlock.image]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof imageForm>;
  [EIdsBlock.imageWithTheme]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof imageFormWithTheme>;
  [EIdsBlock.apk]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof apkForm>;
  [EIdsBlock.promo]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof promoForm>;
  [EIdsBlock.promoWithoutImage]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof promoFormWithoutImage>;
  [EIdsBlock.simplePromoWithBonus]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof simplePromoWithBonus>;
  [EIdsBlock.simplePromoWithoutBonus]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof simplePromoWithoutBonus>;
  [EIdsBlock.simplePromoWithoutBonusThemeTwo]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof simplePromoWithoutBonusStarzbet>;
  [EIdsBlock.simplePromoWithBonusThemeTwo]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof simplePromoWithBonusStarzbet>;
  [EIdsBlock.infoTitle]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof infoTitle>;
  [EIdsBlock.linksBlock]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof linksBlockForm>;
  [EIdsBlock.licence]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof licenceBlock>;
  [EIdsBlock.tag]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof tagForm>;
  [EIdsBlock.textBlock]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof textBlockForm>;
  [EIdsBlock.coupon]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof couponBlock>;
  [EIdsBlock.game]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof gameBlock>;
  [EIdsBlock.simpleText]: (customExtensions: ICommonExtensions) =>
    ReturnType<typeof simpleText>;
  [EIdsBlock.phone]: (customExtensions: ICommonExtensions) =>
    ReturnType<typeof phone>;
  [EIdsBlock.gameLabel]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof gameLabel>;
  [EIdsBlock.games]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof games>;
  [EIdsBlock.gameLabelWithImage]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof gameLabelWithImage>;
  [EIdsBlock.gamesWithImage]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof gamesWithImage>;
  [EIdsBlock.simpleBonus]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof bonusField>;
  [EIdsBlock.textAreaWithVariables]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof textAreaWithVariablesForm>;
  [EIdsBlock.textArea]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof textAreaForm>;
  [EIdsBlock.variablesBlock]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof variablesBlockForm>;
  [EIdsBlock.variablesTable]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof variablesTableForm>;
  [EIdsBlock.metaContent]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof metaContentForm>;
  [EIdsBlock.commissionCardType]: (customExtensions: ICommonExtensions, isOneOf?: boolean) =>
    ReturnType<typeof commissionCardTypeForm>;
  [EIdsBlock.textEditor]: (customExtensions: ICommonExtensions) =>
    ReturnType<typeof textEditorField>;
}

export {
  blocksMap,
  type IBlocks,
  type ISystemFieldsDef,
  type IMetaContent,
  type IBlockGeneralFields,
  type IBlockGeneralDef,
  type IVariables,
  type IPageDefFields,
  type IBlockTypeDef,
  type IDefByTaxonomy,
  type IBlock,
  type IBlockObj,
  type IPageBuilder,
  type ISignatureBlockList,
  type ISignaturePageList,
  type IChildPageBuilder,
  type IWithPriority,
  type IPageContentDef,
  type IPageContentWrap,
  type IDraggableContent,
  type TRenderPanelState,
  type IData,
  type IListDefWithOneOf,
  type IResetState,
  type IFormPageDef,
  type IListPageDef,
  type IGeneralDef,
  type IRecord,
  type IChildPage,
  type IMultilang,
  type IBlockConfig,
  type IBlockContent,
  type TBlockUnion,
  type ISimpleConfig,
  type IBlockContentContainer,
  type IPageData,
  type IMetaTag,
  type IVariablesContent,
  type ICommonExtensions,
  type ICMSExtensions,
  type IPage,
  type IMediaInputValue,
};

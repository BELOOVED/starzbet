import { EDefType, type IFormDef, type IListDef, type TFieldDef, type TFieldDefs } from "@sb/form-new";
import { isNotNil, isNotVoid, isObject, isString, type TExplicitAny } from "@sb/utils";
import { keys } from "@sb/utils/Keys";
import {
  type TFormNames,
  type TGeneralForPage,
  type TGeneralGroupBlock,
  type TGroupBlock,
  type TListBlock,
  type TListPage,
  type TOneOfBlock,
  type TOneOfGroup,
  type TPageDefFields,
  type TPageDefFieldsWithChildPage,
  type TSimpleBlock,
  type TSimplePage,
  type TTaxonomy,
  type TThemeTaxonomy,
} from "../Types";
import { EAffiliateBlockMap, EPlatformBlockMap, ETypes } from "../EnumTypes";
import {
  type IBlockGeneralFields,
  type IBlockTypeDef,
  type IChildPage,
  type IData,
  type IFormPageDef,
  type IGeneralDef,
  type IListDefWithOneOf,
  type IListPageDef,
  type IPage,
  type IPageDefFields,
  type IVariablesContent,
  type TBlockUnion,
} from "../Interfaces";
import { BLOCK_CONTENT, BLOCK_TYPE, CMS_FORM_NAMES, PAGE, PAGE_ID, PAGE_TYPE, VARIABLES } from "../Constants";

const isRequired = (str: string, pages: Record<string, TGeneralForPage | IPage>): pages is Record<string, IPage> => str === "static";

const isDynamic = (str: string, pages: Record<string, IPage | TGeneralForPage>): pages is Record<string, TGeneralForPage> => str === "dynamic";

const isSimpleBlock = (block: TGeneralGroupBlock): block is TSimpleBlock => block.type === ETypes.SIMPLE;

const isOneOfBlock = (block: TGeneralGroupBlock): block is TOneOfBlock => block.type === ETypes.ONE_OF;

const isListBlock = (block: TGeneralGroupBlock): block is TListBlock => block.type === ETypes.LIST;

const isGroupBlock = (block: TGeneralGroupBlock): block is TGroupBlock => block.type === ETypes.GROUP;

const isOneOfGroup = (block: TGeneralGroupBlock): block is TOneOfGroup => block.type === ETypes.ONE_OF_GROUP;

const isSimplePage = (block: TGeneralForPage): block is TSimplePage => block.type === ETypes.SIMPLE;

const isListPage = (block: TGeneralForPage): block is TListPage => block.type === ETypes.LIST;

const isPage = (page: IPage | IChildPage): page is IPage => "title" in page && isString(page.title);

const isListDefWithOneOfDef = (def: IListDefWithOneOf | IListDef): def is IListDefWithOneOf =>
  def.type === EDefType.list && def.fields.type === EDefType.oneOf;

const isFormDefWithChildPage =
  (def: TPageDefFieldsWithChildPage | TPageDefFields | IFormPageDef | TFieldDef | TFieldDefs | IPageDefFields):
    def is TPageDefFieldsWithChildPage =>
    PAGE in def;

const isFormPageDef = (def: IListPageDef | IFormPageDef | IGeneralDef | TFieldDef): def is IFormPageDef =>
  def.type === EDefType.form && isNotNil(def.fields[PAGE_ID]) && def.fields[PAGE_ID].type === EDefType.field;

const isListPageDef = (def: IListPageDef | IFormPageDef | IGeneralDef | TFieldDef): def is IListPageDef =>
  def.type === EDefType.list && isFormPageDef(def.fields);

const isBlockTypeDef = (def: IFormDef | IBlockTypeDef): def is IBlockTypeDef =>
  isNotNil(def.fields[EPlatformBlockMap.FOOTER]) || isNotNil(def.fields[EAffiliateBlockMap.CHOOSE]);

const isGeneralDef = (def: IFormDef | IGeneralDef): def is IGeneralDef => isNotNil(def.fields[BLOCK_TYPE]);

const isAllFieldsNotNil = <T>(arr: T[], length: number) => arr.filter(isNotVoid).length === length;

const isAnyPage = (page: TExplicitAny): page is IData => isObject(page) && PAGE_ID in page && PAGE_TYPE in page;

const isPlatformTaxonomy = (tax: TTaxonomy): tax is TThemeTaxonomy => keys(tax).length > 2;

const isAnyBlock = (block: IBlockGeneralFields | IVariablesContent): block is IBlockGeneralFields =>
  isObject(block) && BLOCK_CONTENT in block;

const isVariables = (content: IVariablesContent | IBlockGeneralFields): content is IVariablesContent =>
  isObject(content) && VARIABLES in content;

const isCorrectFormName = (formName: string): formName is TFormNames =>
  CMS_FORM_NAMES.includes(formName as TFormNames);

const isBlockUnion = (candidate: unknown): candidate is TBlockUnion =>
  isString(candidate) &&
  (Object.values(EPlatformBlockMap).some((it) => it === candidate) || Object.values(EAffiliateBlockMap).some((it) => it === candidate));

export {
  isBlockUnion,
  isCorrectFormName,
  isVariables,
  isAnyBlock,
  isPlatformTaxonomy,
  isAnyPage,
  isAllFieldsNotNil,
  isPage,
  isGeneralDef,
  isBlockTypeDef,
  isListPageDef,
  isDynamic,
  isSimplePage,
  isSimpleBlock,
  isOneOfBlock,
  isGroupBlock,
  isListBlock,
  isListDefWithOneOfDef,
  isListPage,
  isOneOfGroup,
  isRequired,
  isFormPageDef,
  isFormDefWithChildPage,
};

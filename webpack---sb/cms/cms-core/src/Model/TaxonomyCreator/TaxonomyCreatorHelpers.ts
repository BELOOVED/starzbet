import { type TKey } from "@sb/translates/cmsui/Keys";
import { EGqlIds, ETypes } from "../../EnumTypes";
import {
  type IBlockConfig,
  type IBlockObj,
  type IChildPage,
  type IChildPageBuilder,
  type IPage,
  type IPageBuilder,
  type ISignatureBlockList,
  type ISignaturePageList,
} from "../../Interfaces";
import {
  type TGeneralGroupBlock,
  type TGroupBlock,
  type TListBlock,
  type TListPage,
  type TOneOfBlock,
  type TOneOfGroup,
  type TSignatureGroupBlock,
  type TSignatureGroupBlockWithoutList,
  type TSimpleBlock,
  type TSimplePage,
} from "../../Types";

// Blocks
const simpleBlock = (block: IBlockObj): TSimpleBlock =>
  ({ ...block, type: ETypes.SIMPLE });

const oneOfBlock = (block: TSignatureGroupBlockWithoutList, canDisabled = false): TOneOfBlock =>
  ({ block, canDisabled, type: ETypes.ONE_OF });

const listBlock = (
  block: ISignatureBlockList,
  blockConfig: IBlockConfig = { canDisabled: false, enumCode: EGqlIds.NOOP },
): TListBlock =>
  ({ ...block, blockConfig, type: ETypes.LIST });

const oneOfGroup = (block: TGroupBlock[], canDisabled = false): TOneOfGroup =>
  ({ block, canDisabled, type: ETypes.ONE_OF_GROUP });

const groupBlock = (
  blockName: TKey,
  block: TSignatureGroupBlock,
  blockConfig: IBlockConfig = { canDisabled: false, enumCode: EGqlIds.NOOP },
): TGroupBlock =>
  ({
    blockName,
    blockConfig,
    block,
    type: ETypes.GROUP,
  });

// Pages
const staticPage = (obj: IPage): IPage => obj;
const simplePage = (page: IChildPage): TSimplePage =>
  ({ ...page, type: ETypes.SIMPLE });
const listPage = (page: ISignaturePageList): TListPage =>
  ({ ...page, type: ETypes.LIST });

const pageBuilder = (pageDef: IPageBuilder): IPageBuilder => <IPageBuilder>pageDef;

const blockBuilder = (version: number, canDisabled: boolean, group: TGeneralGroupBlock[], enumCode?: EGqlIds) => ({
  version,
  canDisabled,
  group,
  enumCode,
});

const childPageBuilder = (
  pageDef: {
    static?: TListPage;
    dynamic?: TListPage;
  },
): IChildPageBuilder => <IChildPageBuilder>pageDef;

export {
  blockBuilder,
  childPageBuilder,
  groupBlock,
  listBlock,
  listPage,
  oneOfBlock,
  oneOfGroup,
  pageBuilder,
  simpleBlock,
  simplePage,
  staticPage,
};

import { type IFormDef, type IOneOfDef, type TFieldDef, type TFieldDefs, type TResolver, withValidation } from "@sb/form-new";
import { isArray, isNil, type TNullable } from "@sb/utils";
import { type TKey } from "@sb/translates/cmsui/Keys";
import { blocksMap, type IBlockConfig } from "../../Interfaces";
import {
  type TGeneralGroupBlock,
  type TGroupBlock,
  type TOneOfBlock,
  type TOneOfGroup,
  type TSignatureGroupBlock,
  type TSimpleBlock,
} from "../../Types";
import { isGroupBlock, isListBlock, isOneOfBlock, isOneOfGroup, isSimpleBlock } from "../../Utils/CMSTypeGuards";
import { CMSTypeError, getBlockName } from "../../Utils/CMSHelpers";
import { formContainer, listContainerWithWrapper, oneOfContainer } from "../../Utils/CMSFieldBuilders";
import { oneOfRules } from "../../Utils/CMSFormType";
import { childValidator } from "../../CMSValidations";
import { EComponentsType, EGqlIds } from "../../EnumTypes";
import { filesField } from "./FilesField";

const mapToGroupBlockChild = (block: TGeneralGroupBlock, oneOfFunc: TResolver, currentIndex: number, listChild = false) => {
  const blockName = getBlockName(block, currentIndex);
  if (isOneOfBlock(block)) {
    return ({
      [blockName]: oneOfDefForBlocks(block, oneOfFunc, listChild),
    });
  }
  if (isOneOfGroup(block)) {
    return ({
      [blockName]: oneOfDefForGroup(block, oneOfFunc, listChild),
    });
  }
  if (isSimpleBlock(block)) {
    return ({
      [blockName]: simpleForBlock(block, listChild),
    });
  }

  if (isGroupBlock(block)) {
    return ({
      [blockName]: groupDefForBlock(block, oneOfFunc, false, listChild),
    });
  }

  if (isListBlock(block)) {
    return ({
      [blockName]: listDefForBlocks(
        block.block,
        block.maxCount,
        oneOfFunc,
        block.title,
        block.isNotDraggableChild,
        block.isHiddenTitle,
        block.inline,
        block.blockConfig,
      ),
    });
  }

  return {};
};
const groupDefForBlock = (blockMap: TGroupBlock, oneOfFunc: TResolver, withFilesField = false, listChild = false): IFormDef => {
  const { block, blockName, blockConfig } = blockMap;

  if (!isArray(block)) {
    throw new CMSTypeError("Block is not array");
  }
  const obj: TFieldDefs = block.reduce(
    (acc, value, currentIndex) =>
      ({
        ...acc,
        ...mapToGroupBlockChild(value, oneOfFunc, currentIndex),
      }),
    {},
  );

  const files = withFilesField ? filesField : {};

  return formContainer({
    fields: {
      ...obj,
      ...files,
    },
    componentType: EComponentsType.blockContainer,
    oneOfDescription: blockConfig.oneOfDescription,
    containerTitle: blockName,
    customExtensions: { listChild, blockConfig, enumCode: blockConfig.enumCode },
    extensions: withValidation(childValidator()),
  });
};

const oneOfDefForBlocks = (blockMap: TOneOfBlock, oneOfFunc: TResolver, listChild = false): IOneOfDef => {
  const { block } = blockMap;
  if (!isArray(block)) {
    throw new CMSTypeError("Block is not array");
  }
  const obj = block.reduce(
    (acc, value, currentIndex) => {
      if (isListBlock(value)) {
        return ({
          ...acc,
          ...mapToGroupBlockChild(value, oneOfFunc, currentIndex, true),
        });
      }
      if (isSimpleBlock(value)) {
        return ({
          ...acc,
          ...blocksMap[value.block.id](value.customExtensions, true),
        });
      }

      return ({});
    },
    {},
  );

  return oneOfContainer({
    fields: obj,
    customExtensions: { listChild },
    resolver: oneOfFunc,
  });
};

const roundBlocks = (blocksMap: TNullable<TSignatureGroupBlock>, listChild?: boolean) => {
  if (isNil(blocksMap)) {
    return {};
  }

  return blocksMap.reduce<TFieldDefs>(
    (acc, block, index) => {
      const blockName = getBlockName(block, index);
      if (isOneOfBlock(block)) {
        return ({
          ...acc,
          [blockName]: oneOfDefForBlocks(block, oneOfRules.simple(), listChild),
        });
      }
      if (isListBlock(block)) {
        return ({
          ...acc,
          [blockName]:
          listDefForBlocks(
            block.block,
            block.maxCount,
            oneOfRules.simple(),
            block.title,
            block.isNotDraggableChild,
            block.isHiddenTitle,
            block.inline,
            block.blockConfig,
            listChild,
          ),
        });
      }

      if (isGroupBlock(block)) {
        return ({
          ...acc,
          [blockName]: groupDefForBlock(block, oneOfRules.simple(), false,  listChild),
        });
      }

      if (isSimpleBlock(block)) {
        return ({
          ...acc,
          [blockName]: simpleForBlock(block, listChild) as TFieldDef,
        });
      }

      return acc;
    },
    {},
  );
};

const oneOfDefForGroup = (blockMap: TOneOfGroup, oneOfFunc: TResolver, listChild = false): IOneOfDef => {
  const { block, canDisabled } = blockMap;
  if (!isArray(block)) {
    throw new CMSTypeError("Block is not array");
  }

  return oneOfContainer({
    fields: roundBlocks(block, listChild),
    customExtensions: { listChild, oneOfGroup: true, canDisabled },
    resolver: oneOfFunc,
  });
};

const simpleForBlock = ({ block, customExtensions }: TSimpleBlock, listChild = false) =>
  blocksMap[block.id]({ ...customExtensions, listChild });

const listDefForBlocks = (
  block: TGeneralGroupBlock,
  maxCount: number,
  oneOfFunc: TResolver,
  blockTitle: TKey,
  isNotDraggableChild = false,
  isHiddenTitle = false,
  inline = false,
  blockConfig: IBlockConfig = { canDisabled: false, enumCode: EGqlIds.NOOP },
  listChild = false,
): TFieldDef => {
  if (isOneOfBlock(block)) {
    return listContainerWithWrapper({
      fields: oneOfDefForBlocks(block, oneOfFunc, true),
      customExtensions: {
        maxCount,
        blockConfig,
        listChild,
        enumCode: blockConfig.enumCode,
        isNotDraggableChild,
        isHiddenTitle,
        inline,
        blockTitle,
      },
    });
  }
  if (isOneOfGroup(block)) {
    return listContainerWithWrapper({
      fields: oneOfDefForGroup(block, oneOfFunc, true),
      customExtensions: {
        maxCount,
        blockConfig,
        listChild,
        enumCode: blockConfig.enumCode,
        isNotDraggableChild,
        blockTitle,
        isHiddenTitle,
        inline,
      },
    });
  }
  //todo @DS refactor this shit id1
  if (isSimpleBlock(block)) {
    return listContainerWithWrapper({
      fields: simpleForBlock(block, true) as TFieldDef,
      customExtensions: {
        maxCount,
        listChild,
        blockTitle,
        enumCode: blockConfig.enumCode,
        isNotDraggableChild,
        isHiddenTitle,
        inline,
      },
    });
  }

  if (isListBlock(block)) {
    return listContainerWithWrapper({
      fields: listDefForBlocks(
        block.block,
        block.maxCount,
        oneOfFunc,
        block.title,
        block.isNotDraggableChild,
        block.isHiddenTitle,
        block.inline,
        block.blockConfig,
        true,
      ),
      customExtensions: {
        maxCount,
        blockConfig,
        listChild,
        enumCode: blockConfig.enumCode,
        isNotDraggableChild,
        isHiddenTitle,
        inline,
        blockTitle,
      },
    });
  }

  return listContainerWithWrapper({
    fields: groupDefForBlock(block, oneOfFunc, false, true),
    customExtensions: {
      maxCount,
      isGroupChild: true,
      blockConfig,
      listChild,
      isNotDraggableChild,
      enumCode: blockConfig.enumCode,
      blockTitle,
      isHiddenTitle,
      inline,
    },
  });
};
export {
  roundBlocks,
  groupDefForBlock,
};

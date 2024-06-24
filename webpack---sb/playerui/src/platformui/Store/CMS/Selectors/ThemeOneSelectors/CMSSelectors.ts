import { BLOCK_CONTENT, type EPlatformBlockMap } from "@sb/cms-core";
import { type ICmsThemeOneContentState, type ICmsWrapperState, type TContent, type TWithServerLoaded } from "../../Model/CmsModel";

const CMSThemeOneContentSelector = (state: ICmsWrapperState<TContent>): ICmsThemeOneContentState | null => {
  const content = state.CMS.content;

  return content.theme === "ThemeOne" ? content : null;
};

const isExistedBlock = <Content extends TContent["blockContent"], T extends Exclude<EPlatformBlockMap, EPlatformBlockMap.E2ETest>>(
  blockContent: Content,
  blockType: T,
): blockContent is Content & Record<T, TWithServerLoaded | null> => blockType in blockContent;

const isCmsBlockServerLoadedSelector = (
  state: ICmsWrapperState<TContent>,
  blockType: Exclude<EPlatformBlockMap, EPlatformBlockMap.E2ETest>,
) => {
  const blockContent = state.CMS.content[BLOCK_CONTENT];

  return isExistedBlock(blockContent, blockType) && blockContent[blockType]?.isServerLoaded;
};

export { CMSThemeOneContentSelector, isCmsBlockServerLoadedSelector };

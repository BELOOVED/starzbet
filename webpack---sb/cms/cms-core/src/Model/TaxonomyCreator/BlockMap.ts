import { withValidation } from "@sb/form-new";
import { cmsui_general_blockContent, cmsui_general_blocks } from "@sb/translates/cmsui/Keys";
import { type EPlatformBlockMap, EComponentsType } from "../../EnumTypes";
import { BLOCK_CONTENT, BLOCK_ID, STATE_WAS_CHANGED, VERSION, BLOCK_TYPE } from "../../Constants";
import { type TBlockDSL } from "../../Types";
import { formContainer, simpleField } from "../../Utils/CMSFieldBuilders";
import { childValidator } from "../../CMSValidations";
import { roundBlocks } from "./BlockDefCreator";
import { filesField } from "./FilesField";

//create form definition for blocks
const blockMap = (blocks: TBlockDSL, key: EPlatformBlockMap) => formContainer({
  fields: {
    [STATE_WAS_CHANGED]: simpleField(),
    [BLOCK_CONTENT]: formContainer({
      componentType: EComponentsType.blockContainer,
      containerTitle: cmsui_general_blockContent,
      fields: {
        ...roundBlocks(blocks.group),
        ...filesField,
      },
      customExtensions: {
        enumCode: blocks.enumCode,
      },
    }),
    [BLOCK_ID]: simpleField({ componentType: EComponentsType.idInput }),
    [BLOCK_TYPE]: simpleField({ componentType: EComponentsType.pageTypeInput }),
  },
  containerTitle: cmsui_general_blocks,
  extensions: withValidation(childValidator()),
  customExtensions: {
    canDisabled: blocks.canDisabled,
    [VERSION]: blocks[VERSION],
    [BLOCK_TYPE]: key,
  },
});

export { blockMap };

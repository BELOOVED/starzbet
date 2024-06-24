import { createOptionalPropertySelector } from "@sb/utils";
import { BLOCK_CONTENT, DISABLED_FIELD, EPlatformBlockMap } from "@sb/cms-core";
import { callManagerWasSucceededSelector } from "@sb/call-manager";
import { isAllFieldNilOrEmpty } from "../../../Utils/IsAllFieldInObjectAreNil";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ICmsWrapperState, type TContent } from "../Model/CmsModel";
import { CMS_BLOCKS_SYMBOL } from "../Model/CmsSymbols";

const cmsContactUsBlockSelector = (state: ICmsWrapperState<TContent>) => state.CMS.content[BLOCK_CONTENT]["Player profile - contact us"];

const notEmptyCmsContactUsBlockSelector = (state: ICmsWrapperState<TContent>) => {
  const contactUsContent = cmsContactUsBlockSelector(state);

  return !isAllFieldNilOrEmpty(contactUsContent);
};

const cmsContactUsTitleSelector = createOptionalPropertySelector(
  cmsContactUsBlockSelector,
  ["title", "description"],
);

const cmsContactUsDisabledSelector = createOptionalPropertySelector(
  cmsContactUsBlockSelector,
  DISABLED_FIELD,
);

const cmsContactUsDescriptionSelector = createOptionalPropertySelector(
  cmsContactUsBlockSelector,
  ["description", "description"],
);

const cmsContactUsContactUsContentSelector = createOptionalPropertySelector(
  cmsContactUsBlockSelector,
  ["contactUsContent", "content"],
);

const cmsContactUsConditionSelector = (state: TPlatformAppState) => {
  const wasSucceeded = callManagerWasSucceededSelector(state, CMS_BLOCKS_SYMBOL, EPlatformBlockMap.CONTACT_US);

  if (!wasSucceeded) {
    return false;
  }

  const isDisabled = cmsContactUsDisabledSelector(state);

  if (isDisabled) {
    return false;
  }

  return notEmptyCmsContactUsBlockSelector(state);
};

export {
  cmsContactUsConditionSelector,
  cmsContactUsTitleSelector,
  cmsContactUsDescriptionSelector,
  cmsContactUsContactUsContentSelector,
};

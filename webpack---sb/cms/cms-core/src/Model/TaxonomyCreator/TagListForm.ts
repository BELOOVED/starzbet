import { TAGS_PATH_LIST } from "../../Constants";
import { EComponentsType } from "../../EnumTypes";
import { listContainerWithoutWrapper, simpleField } from "../../Utils/CMSFieldBuilders";

const tagListForm = {
  [TAGS_PATH_LIST]: listContainerWithoutWrapper({
    componentType: EComponentsType.tagsContainer,
    fields: simpleField({ componentType: EComponentsType.tagsList }),
  }),
};

export { tagListForm };

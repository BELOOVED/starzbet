import {
  CMS_EXTENSION_KEY,
  field,
  form,
  list,
  objectField,
  oneOf,
  type TFieldDef,
  type TFieldDefs,
  type TResolver,
  withValidation,
} from "@sb/form-new";
import { type TExplicitAny } from "@sb/utils/TAny";
import {
  cmsui_general_element,
  cmsui_general_imageInput,
  cmsui_general_list,
  cmsui_general_title,
  type TKey,
} from "@sb/translates/cmsui/Keys";
import { DISABLED_FIELD, LIST_ELEMENT_NAME, PRIORITY, SHOW_CHILDREN_BY_DEFAULT } from "../Constants";
import { EComponentsType, type EGqlIds } from "../EnumTypes";
import { requiredValidator } from "../CMSValidations";

interface IExtensions {
  required: boolean;
  listChild: boolean;
  simpleConfig?: ISimpleConfig;
  enumCode: EGqlIds | undefined;
}

interface ISimpleConfig {
  blockTitle: string;
  withoutWrapper: boolean;
}

interface IOneOfContainer {
  fields: TFieldDefs;
  resolver: TResolver;
  componentType?: EComponentsType;
  containerTitle?: TKey;
  extensions?: Record<string, TExplicitAny>;
  customExtensions?: Record<string, TExplicitAny>;
}

const oneOfContainer = ({
  fields,
  resolver,
  componentType = EComponentsType.oneOfContainer,
  containerTitle = cmsui_general_element,
  extensions = {},
  customExtensions = {},
}: IOneOfContainer) => oneOf({
  fields,
  resolver,
  extensions: {
    ...extensions,
    [CMS_EXTENSION_KEY]: {
      componentType,
      containerTitle,
      customExtensions,
    },
  },
});

interface ISimpleField {
  componentType?: EComponentsType;
  title?: TKey;
  extensions?: Record<string, TExplicitAny>;
  multi?: boolean;
  customExtensions?: IExtensions | Record<string, TExplicitAny>;
}

const simpleField = ({
  componentType = EComponentsType.textInput,
  title = cmsui_general_title,
  customExtensions = {},
  extensions = {},
  multi = false,
}: ISimpleField = {}) => {
  const fieldTitle = customExtensions.simpleConfig?.blockTitle ?? title;

  return field({
    multi: multi,
    extensions: {
      ...extensions,
      [CMS_EXTENSION_KEY]: {
        customExtensions,
        componentType,
        title: fieldTitle,
      },
    },
  });
};

interface ISimpleObjectField {
  componentType?: EComponentsType;
  title?: TKey;
  extensions?: Record<string, TExplicitAny>;
  customExtensions?: Record<string, TExplicitAny>;
  multi?: boolean;
  style?: Record<string, string>;
}

const simpleObjectField = ({
  componentType = EComponentsType.imageInput,
  title = cmsui_general_imageInput,
  extensions = {},
  customExtensions = {},
  multi = false,
  style = {},
}: ISimpleObjectField = {}) => objectField({
  multi,
  extensions: {
    ...extensions,
    [CMS_EXTENSION_KEY]: {
      componentType,
      customExtensions,
      title,
      style,
    },
  },
});

interface IFormWithDisabledField {
  fields: TFieldDefs;
  oneOfDescription?: TKey;
  componentType?: EComponentsType;
  containerTitle?: TKey | string;
  extensions?: Record<string, TExplicitAny>;
  customExtensions?: Record<string, TExplicitAny>;
}

const formContainer = ({
  fields,
  componentType = EComponentsType.blockContainer,
  containerTitle = cmsui_general_title,
  oneOfDescription,
  extensions = {},
  customExtensions = {},
}: IFormWithDisabledField) => {
  if (customExtensions.listChild) {
    return form({
      fields: {
        [SHOW_CHILDREN_BY_DEFAULT]: field(),
        [PRIORITY]: simpleField({ componentType: EComponentsType.priorityInput }),
        [LIST_ELEMENT_NAME]: simpleField({
          componentType: EComponentsType.listElementNameField,
          extensions: withValidation(requiredValidator()),
        }),
        ...fields,
      },
      withHiddenField: true,
      extensions: {
        ...extensions,
        [CMS_EXTENSION_KEY]: {
          oneOfDescription,
          containerTitle,
          componentType,
          customExtensions,
        },
      },
    });
  }

  return form({
    fields: {
      [SHOW_CHILDREN_BY_DEFAULT]: field(),
      [DISABLED_FIELD]: field(),
      ...fields,
    },
    withHiddenField: true,
    extensions: {
      ...extensions,
      [CMS_EXTENSION_KEY]: {
        containerTitle,
        componentType,
        customExtensions,
      },
    },
  });
};

const simpleFormContainer = ({
  fields,
  componentType = EComponentsType.blockContainer,
  containerTitle = cmsui_general_title,
  oneOfDescription,
  extensions = {},
  customExtensions = {},
}: IFormWithDisabledField) => form({
  fields,
  withHiddenField: true,
  extensions: {
    ...extensions,
    [CMS_EXTENSION_KEY]: {
      oneOfDescription,
      containerTitle,
      componentType,
      customExtensions,
      simpleForm: true,
    },
  },
});

interface IListBuilder {
  fields: TFieldDef;
  componentType?: EComponentsType;
  containerTitle?: TKey;
  extensions?: Record<string, TExplicitAny>;
  customExtensions?: Record<string, TExplicitAny>;
}

const listContainerWithoutWrapper = ({
  fields,
  componentType = EComponentsType.listContainer,
  containerTitle = cmsui_general_list,
  extensions = {},
  customExtensions = {},
}: IListBuilder) => list({
  fields: fields,
  extensions: {
    ...extensions,
    [CMS_EXTENSION_KEY]: {
      containerTitle,
      customExtensions,
      componentType,
    },
  },
});

const listContainerWithWrapper = ({
  fields,
  componentType = EComponentsType.listContainer,
  containerTitle = cmsui_general_list,
  extensions = {},
  customExtensions = {},
}: IListBuilder) => form({
  fields: {
    [DISABLED_FIELD]: field(),
    content: list({
      fields,
      extensions: {
        ...extensions,
        [CMS_EXTENSION_KEY]: {
          containerTitle,
          customExtensions,
          componentType,
        },
      },
    }),
  },
  extensions: {
    ...extensions,
    [CMS_EXTENSION_KEY]: {
      containerTitle,
      customExtensions,
      componentType,
    },
  },
});

const getOneOfBlockName = (blockName: string) => `Block_${blockName}`;

export {
  getOneOfBlockName,
  simpleFormContainer,
  listContainerWithWrapper,
  simpleField,
  simpleObjectField,
  formContainer,
  oneOfContainer,
  listContainerWithoutWrapper,
};

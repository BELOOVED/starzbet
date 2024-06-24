import {
  _HIDDEN_FIELD_,
  type IFormDef,
  type TFieldDef,
  type TFieldDefs,
  type TFieldValue,
  type TResolver,
  withValidation,
} from "@sb/form-new";
import { isNil, isObject } from "@sb/utils";
import {
  cmsui_block_constant_promo_simplePromoWithBonus,
  cmsui_block_constant_promo_simplePromoWithoutBonus,
  cmsui_block_title_promo,
  cmsui_general_action_link,
  cmsui_general_addAnswerToQuestion,
  cmsui_general_addQuestion,
  cmsui_general_anchor,
  cmsui_general_apk,
  cmsui_general_backgroundImage,
  cmsui_general_bonus,
  cmsui_general_chooseBonus,
  cmsui_general_chooseCoupon,
  cmsui_general_chooseGame,
  cmsui_general_chooseTags,
  cmsui_general_commissionCardType,
  cmsui_general_coupon,
  cmsui_general_ctaTitle,
  cmsui_general_darkImageInput,
  cmsui_general_description,
  cmsui_general_externalUrl,
  cmsui_general_externalUrlDescription,
  cmsui_general_faq,
  cmsui_general_game,
  cmsui_general_goToCtaTitle,
  cmsui_general_height,
  cmsui_general_imageInput,
  cmsui_general_infoTitle,
  cmsui_general_iternalUrl,
  cmsui_general_iternalUrlDescription,
  cmsui_general_licenceBlock,
  cmsui_general_licenceDiv,
  cmsui_general_licenceScript,
  cmsui_general_lightImageInput,
  cmsui_general_linksBlock,
  cmsui_general_logoImage,
  cmsui_general_mediaInput,
  cmsui_general_metaTagContent,
  cmsui_general_metaTagName,
  cmsui_general_name,
  cmsui_general_placeholder_enterUrl,
  cmsui_general_richText,
  cmsui_general_simpleBlock,
  cmsui_general_slug,
  cmsui_general_subTitle,
  cmsui_general_tag,
  cmsui_general_templateVariables,
  cmsui_general_textBlock,
  cmsui_general_title,
  cmsui_general_value,
  cmsui_general_width,
  type TKey,
} from "@sb/translates/cmsui/Keys";
import { CMSBonusSizeValidator, requiredValidator } from "../CMSValidations";
import { EComponentsType, EFieldKeys, EGqlIds, EIdsBlock, EThemeSegment, ETypeInput } from "../EnumTypes";
import { PAGE_ID, TAG_ID } from "../Constants";
import {
  formContainer,
  getOneOfBlockName,
  listContainerWithoutWrapper,
  oneOfContainer,
  simpleField,
  simpleFormContainer,
  simpleObjectField,
} from "./CMSFieldBuilders";
import { fileExtensions } from "./WithFiles";

interface IExtensions {
  required: boolean;
  simpleConfig?: ISimpleConfig;
  inList?: true;
}

interface ISimpleConfig {
  blockTitle: string;
  withoutWrapper: boolean;
}

const getRequiredValidator = (isRequired: boolean) => isRequired ? withValidation(requiredValidator()): {};

const getCorrectForm = (
  conditions: boolean | undefined,
  simpleForm: (customExtensions: IExtensions) => IFormDef,
  extensions: IExtensions,
  blockType: EIdsBlock,
  form: (form: IFormDef, formName?: string) => TFieldDefs | TFieldDef = getForm,
) =>
  conditions ? form(simpleForm(extensions), blockType) : simpleForm(extensions);

const oneOfRules = {
  simple: <V extends TFieldValue = TFieldValue>(): TResolver<V> => (value) => {
    if (isNil(value)) {
      return undefined;
    }
    if (isObject(value)) {
      if (_HIDDEN_FIELD_ in value && value[_HIDDEN_FIELD_] && typeof value[_HIDDEN_FIELD_] === "string") {
        return value[_HIDDEN_FIELD_];
      }

      return EFieldKeys.CHILD_FORM;
    }

    throw new TypeError("Incorrect defType");
  },
};

const getForm = (form: IFormDef, formName?: string): TFieldDefs | TFieldDef => {
  if (formName) {
    return ({
      [getOneOfBlockName(formName)]: form,
    });
  } else {
    return form;
  }
};

const faqFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_faq,
  customExtensions,
  fields: {
    question: simpleObjectField({
      title: cmsui_general_addQuestion,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
    textEditor: simpleObjectField({
      title: cmsui_general_addAnswerToQuestion,
      componentType: EComponentsType.textEditor,
      multi: true,
    }),
  },
});

const richTextFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_richText,
  customExtensions,
  fields: {
    description: simpleObjectField({
      title: cmsui_general_title,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
  },
});

const metaContentBlockSimple = (customExtensions: IExtensions) => formContainer({
  componentType: EComponentsType.emptyContainer,
  customExtensions,
  fields: {
    pageTitle: simpleObjectField({
      title: cmsui_general_title,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
    pageIcon: simpleObjectField(),
    metaTags: listContainerWithoutWrapper({
      fields: formContainer({
        componentType: EComponentsType.blockContainer,
        fields: {
          metaTagName: simpleField({
            componentType: EComponentsType.textInput,
            title: cmsui_general_metaTagName,
            extensions: withValidation(requiredValidator()),
          }),
          metaTagContent: simpleObjectField({
            componentType: EComponentsType.multiLangInput,
            title: cmsui_general_metaTagContent,
            extensions: withValidation(requiredValidator()),
          }),
        },
      }),
    }),
  },
});

const variablesTableFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_templateVariables,
  componentType: EComponentsType.variableTable,
  customExtensions: {
    ...customExtensions,
    withoutTitle: true,
  },
  fields: {
    name: simpleObjectField({
      title: cmsui_general_name,
      componentType: EComponentsType.variableField,
      extensions: withValidation(requiredValidator()),
      multi: true,
    }),
    slug: simpleField({
      title: cmsui_general_slug,
      componentType: EComponentsType.variableField,
      extensions: withValidation(requiredValidator()),
    }),
    value: simpleObjectField({
      title: cmsui_general_value,
      componentType: EComponentsType.variableField,
      multi: true,
      extensions: withValidation(requiredValidator()),
    }),
  },
});

const variablesBlockFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_templateVariables,
  customExtensions: {
    ...customExtensions,
    withoutTitle: true,
  },
  fields: {
    name: simpleObjectField({
      title: cmsui_general_name,
      componentType: EComponentsType.multiLangInput,
      extensions: withValidation(requiredValidator()),
      multi: true,
      style: {
        backgroundColor: "inherit",
        borderLeft: "inherit",
        width: "30%",
      },
    }),
    slug: simpleField({
      title: cmsui_general_slug,
      componentType: EComponentsType.variableInput,
      extensions: withValidation(requiredValidator()),
    }),
    value: simpleObjectField({
      title: cmsui_general_value,
      componentType: EComponentsType.textArea,
      multi: true,
      extensions: withValidation(requiredValidator()),
    }),
  },
});

const textAreaWithVariablesFormSimple = (customExtensions: IExtensions) =>  formContainer({
  containerTitle: customExtensions.simpleConfig?.blockTitle || cmsui_general_richText,
  customExtensions,
  fields: {
    description: simpleObjectField({
      title: customExtensions.simpleConfig?.blockTitle === cmsui_general_simpleBlock
        ? cmsui_general_title
        //todo fix type
        : customExtensions.simpleConfig?.blockTitle as TKey,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
      extensions: customExtensions.required ? withValidation(requiredValidator()) : {},

    }),
  },
});

const GameLabelSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: customExtensions.simpleConfig?.blockTitle || cmsui_general_richText,
  customExtensions,
  fields: {
    labelId: simpleField({
      componentType: EComponentsType.gameLabelField,
      extensions: getRequiredValidator(customExtensions.required),
      customExtensions,
    }),
  },
});

const GameLabelSimpleWithImage = (customExtensions: IExtensions) => formContainer({
  containerTitle: customExtensions.simpleConfig?.blockTitle || cmsui_general_richText,
  customExtensions,
  fields: {
    image: simpleObjectField({
      title: cmsui_general_imageInput,
      extensions: fileExtensions(false),
    }),
    labelId: simpleField({
      componentType: EComponentsType.gameLabelField,
      extensions: getRequiredValidator(customExtensions.required),
      customExtensions,
    }),
  },
});

const GamesSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: customExtensions.simpleConfig?.blockTitle || cmsui_general_richText,
  customExtensions,
  fields: {
    title: simpleObjectField({
      title: cmsui_general_title,
      componentType: EComponentsType.textArea,
      multi: true,
      extensions: customExtensions.required ? withValidation(requiredValidator()) : {},
    }),
    gameIds: simpleField({
      componentType: EComponentsType.gamesField,
      extensions: getRequiredValidator(customExtensions.required),
      multi: true,
    }),
  },
});

const GamesSimpleWithImage = (customExtensions: IExtensions) => formContainer({
  containerTitle: customExtensions.simpleConfig?.blockTitle || cmsui_general_richText,
  customExtensions,
  fields: {
    title: simpleObjectField({
      title: cmsui_general_title,
      componentType: EComponentsType.textArea,
      multi: true,
      extensions: getRequiredValidator(customExtensions.required),
    }),
    image: simpleObjectField({
      title: cmsui_general_imageInput,
      extensions: fileExtensions(false),
    }),
    gameIds: simpleField({
      componentType: EComponentsType.gamesField,
      extensions: getRequiredValidator(customExtensions.required),
      multi: true,
    }),
  },
});

const textAreaFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_richText,
  customExtensions,
  fields: {
    description: simpleObjectField({
      title: customExtensions.simpleConfig?.blockTitle === cmsui_general_simpleBlock
        ? cmsui_general_title
        //todo fix type
        : customExtensions.simpleConfig?.blockTitle as TKey,
      componentType: EComponentsType.textArea,
      multi: true,
      extensions: customExtensions.required ? withValidation(requiredValidator()) : {},
    }),
  },
});

const tagFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_tag,
  customExtensions,
  fields: {
    tag: simpleField({ title: cmsui_general_title, componentType: EComponentsType.textInput }),
    [TAG_ID]: simpleField({ componentType: EComponentsType.idInput }),
  },
});

const commissionCardTypeSimple = (customExtensions: IExtensions) => formContainer({
  customExtensions,
  fields: {
    cardType: simpleField({
      title: cmsui_general_commissionCardType,
      componentType: EComponentsType.commissionCardType,
    }),
  },
});

const imageFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: customExtensions.simpleConfig?.blockTitle ?? cmsui_general_imageInput,
  customExtensions,
  fields: {
    image: simpleObjectField({
      extensions: fileExtensions(customExtensions.required),
    }),
  },
});

const imageFormWithThemeSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: customExtensions.simpleConfig?.blockTitle ?? cmsui_general_imageInput,
  customExtensions: {
    ...customExtensions,
    imageWrapperWithTheme: true,
  },
  fields: {
    image: imageWithTheme(customExtensions.required),
  },
});

const imageWithTheme = (required: boolean, title = cmsui_general_title) => simpleFormContainer({
  containerTitle: title,
  customExtensions: {
    imageWithTheme: true,
  },
  fields: {
    [EThemeSegment.dark]: simpleObjectField({
      title: cmsui_general_darkImageInput,
      extensions: fileExtensions(required),
    }),
    [EThemeSegment.light]: simpleObjectField({
      title: cmsui_general_lightImageInput,
      extensions: fileExtensions(required),
    }),
  },
});

const apkFormSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_apk,
  customExtensions,
  fields: {
    file: simpleObjectField({
      componentType: EComponentsType.apkInput,
      extensions: fileExtensions(customExtensions.required),
    }),
  },
});

const linksBlockSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_linksBlock,
  customExtensions,
  fields: {
    mediaLink: oneOfContainer({
      resolver: oneOfRules.simple(),
      componentType: EComponentsType.mediaInput,
      containerTitle: cmsui_general_mediaInput,
      fields: {
        [ETypeInput.external]: simpleFormContainer({
          containerTitle: cmsui_general_externalUrl,
          oneOfDescription: cmsui_general_externalUrlDescription,
          fields: {
            url: simpleField({ title: cmsui_general_placeholder_enterUrl }),
            anchor: simpleObjectField({
              title: cmsui_general_anchor,
              componentType: EComponentsType.textAreaWithVariables,
              multi: true,
            }),
          },
        }),
        [ETypeInput.eternal]: simpleFormContainer({
          containerTitle: cmsui_general_iternalUrl,
          oneOfDescription: cmsui_general_iternalUrlDescription,
          fields: {
            [PAGE_ID]: simpleField(),
            url: simpleField({ title: cmsui_general_placeholder_enterUrl }),
            anchor: simpleObjectField({
              title: cmsui_general_anchor,
              componentType: EComponentsType.textAreaWithVariables,
              multi: true,
            }),
          },
        }),
      },
    }),
  },
});

const textBlockSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_textBlock,
  customExtensions,
  fields: {
    title: simpleObjectField({
      title: cmsui_general_title,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
      extensions: withValidation(requiredValidator()),
    }),
    description: simpleObjectField({
      componentType: EComponentsType.textAreaWithVariables,
      title: cmsui_general_description,
      multi: true,
      extensions: withValidation(requiredValidator()),
    }),
    cta: simpleObjectField({
      componentType: EComponentsType.textAreaWithVariables,
      title: cmsui_general_ctaTitle,
      multi: true,
      extensions: withValidation(requiredValidator()),
    }),
    url: simpleField({
      title: cmsui_general_placeholder_enterUrl,
      componentType: EComponentsType.textInput,
      extensions: withValidation(requiredValidator()),
    }),
    subTitle: simpleObjectField({
      componentType: EComponentsType.textAreaWithVariables,
      title: cmsui_general_subTitle,
      multi: true,
    }),
  },
});

const couponBlockSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_coupon,
  customExtensions,
  fields: {
    couponId: simpleField({
      componentType: EComponentsType.couponInput,
      title: cmsui_general_chooseCoupon,
    }),
  },
});

const colorPickerField = (customExtensions: IExtensions) => simpleField({
  customExtensions,
  componentType: EComponentsType.colorPickerField,
  //todo fix type
  title: "color" as TKey,
});

const gameBlockSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_game,
  customExtensions,
  fields: {
    gameId: simpleField({
      componentType: EComponentsType.gameContainer,
      title: cmsui_general_chooseGame,
      extensions: withValidation(requiredValidator()),
    }),
  },
});

const licenceBlockSimple = (customExtensions: IExtensions) => simpleFormContainer({
  containerTitle: cmsui_general_licenceBlock,
  customExtensions: {
    ...customExtensions,
    enumCode: EGqlIds.LICENSE_BLOCK,
  },
  fields: {
    licenceScript: simpleField({
      title: cmsui_general_licenceScript,
      componentType: EComponentsType.textInput,
    }),
    licenceDiv: simpleField({
      title: cmsui_general_licenceDiv,
      componentType: EComponentsType.textInput,
    }),
  },
});

const promoSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_block_title_promo,
  customExtensions,
  fields: {
    image: imageWithTheme(false),
    title: simpleObjectField({
      title: cmsui_general_title,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
    chooseTags: simpleField({
      title: cmsui_general_chooseTags,
      componentType: EComponentsType.chooseTags,
      extensions: withValidation(requiredValidator()),
      multi: true,
    }),
  },
});

const promoSimpleWithoutImage = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_block_title_promo,
  customExtensions,
  fields: {
    title: simpleObjectField({
      title: cmsui_general_title,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
    chooseTags: simpleField({
      title: cmsui_general_chooseTags,
      componentType: EComponentsType.chooseTags,
      extensions: withValidation(requiredValidator()),
      multi: true,
    }),
  },
});

const SimplePromoWithBonusSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_block_constant_promo_simplePromoWithBonus,
  customExtensions,
  fields: {
    width: simpleField({
      title: cmsui_general_width,
      componentType: EComponentsType.textInput,
      extensions: withValidation(CMSBonusSizeValidator(4), requiredValidator()),
    }),
    height: simpleField({
      title: cmsui_general_height,
      componentType: EComponentsType.textInput,
      extensions: withValidation(CMSBonusSizeValidator(2), requiredValidator()),
    }),
    image: imageWithTheme(false),
    bonusId: simpleField({
      componentType: EComponentsType.chooseBonus,
      title: cmsui_general_chooseBonus,
      extensions: withValidation(requiredValidator()),
    }),
    chooseTags: simpleField({
      title: cmsui_general_chooseTags,
      componentType: EComponentsType.chooseTags,
      extensions: withValidation(requiredValidator()),
      multi: true,
    }),
  },
});

const SimplePromoWithBonusSimpleStarzbet = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_block_constant_promo_simplePromoWithBonus,
  customExtensions,
  fields: {
    image: imageWithTheme(false),
    bonusId: simpleField({
      componentType: EComponentsType.chooseBonus,
      title: cmsui_general_chooseBonus,
      extensions: withValidation(requiredValidator()),
    }),
    chooseTags: simpleField({
      title: cmsui_general_chooseTags,
      componentType: EComponentsType.chooseTags,
      extensions: withValidation(requiredValidator()),
      multi: true,
    }),
  },
});

const SimplePromoWithoutBonusSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_block_constant_promo_simplePromoWithoutBonus,
  customExtensions,
  fields: {
    width: simpleField({
      title: cmsui_general_width,
      componentType: EComponentsType.textInput,
      extensions: withValidation(CMSBonusSizeValidator(4), requiredValidator()),
    }),
    height: simpleField({
      title: cmsui_general_height,
      componentType: EComponentsType.textInput,
      extensions: withValidation(CMSBonusSizeValidator(2), requiredValidator()),
    }),
    image: imageWithTheme(false),
    bonusContent: simpleObjectField({
      title: cmsui_general_richText,
      componentType: EComponentsType.textEditor,
      multi: true,
    }),
    goToButtonText: simpleObjectField({
      title: cmsui_general_goToCtaTitle,
      extensions: withValidation(requiredValidator()),
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
    goToLink: simpleField({
      title: cmsui_general_action_link,
      componentType: EComponentsType.textInput,
    }),
    chooseTags: simpleField({
      title: cmsui_general_chooseTags,
      componentType: EComponentsType.chooseTags,
      extensions: withValidation(requiredValidator()),
      multi: true,
    }),
  },
});

const SimplePromoWithoutBonusSimpleStarzbet = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_block_constant_promo_simplePromoWithoutBonus,
  customExtensions,
  fields: {
    image: imageWithTheme(false),
    description: simpleObjectField({
      title: cmsui_general_description,
      extensions: withValidation(requiredValidator()),
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
    bonusContent: simpleObjectField({
      title: cmsui_general_richText,
      componentType: EComponentsType.textEditor,
      multi: true,
    }),
    goToButtonText: simpleObjectField({
      title: cmsui_general_goToCtaTitle,
      extensions: withValidation(requiredValidator()),
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
    goToLink: simpleField({
      title: cmsui_general_action_link,
      componentType: EComponentsType.textInput,
    }),
    chooseTags: simpleField({
      title: cmsui_general_chooseTags,
      componentType: EComponentsType.chooseTags,
      extensions: withValidation(requiredValidator()),
      multi: true,
    }),
  },
});

const infoTitleSimple = (customExtensions: IExtensions) => formContainer({
  containerTitle: cmsui_general_infoTitle,
  customExtensions,
  fields: {
    background: imageWithTheme(false, cmsui_general_backgroundImage),
    logoImage: imageWithTheme(false, cmsui_general_logoImage),
    image: imageWithTheme(false),
    subTitle: simpleObjectField({
      title: cmsui_general_subTitle,
      componentType: EComponentsType.textAreaWithVariables,
      multi: true,
    }),
  },
});

const selectField = (customExtensions: IExtensions) => simpleField({
  componentType: EComponentsType.select,
  extensions: getRequiredValidator(customExtensions.required),
  customExtensions,
});

const faqForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, faqFormSimple, customExtensions, EIdsBlock.faq);

const textAreaWithVariablesForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, textAreaWithVariablesFormSimple, customExtensions, EIdsBlock.textAreaWithVariables);

const textAreaForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, textAreaFormSimple, customExtensions, EIdsBlock.textArea);

const variablesBlockForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, variablesBlockFormSimple, customExtensions, EIdsBlock.variablesBlock);

const variablesTableForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, variablesTableFormSimple, customExtensions, EIdsBlock.variablesTable);

const metaContentForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, metaContentBlockSimple, customExtensions, EIdsBlock.metaContent);

const commissionCardTypeForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, commissionCardTypeSimple, customExtensions, EIdsBlock.commissionCardType);

const couponBlock = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, couponBlockSimple, customExtensions, EIdsBlock.coupon);

const textBlockForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, textBlockSimple, customExtensions, EIdsBlock.textBlock);

const bonusField = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, simpleBonus, customExtensions, EIdsBlock.simpleBonus);

const gameBlock = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, gameBlockSimple, customExtensions, EIdsBlock.game);

const richTextForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, richTextFormSimple, customExtensions, EIdsBlock.richText);

const imageForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, imageFormSimple, customExtensions, EIdsBlock.image);

const imageFormWithTheme = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, imageFormWithThemeSimple, customExtensions, EIdsBlock.imageWithTheme);

const apkForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, apkFormSimple, customExtensions, EIdsBlock.apk);

const linksBlockForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, linksBlockSimple, customExtensions, EIdsBlock.linksBlock);

const tagForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, tagFormSimple, customExtensions, EIdsBlock.tag);

const licenceBlock = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, licenceBlockSimple, customExtensions, EIdsBlock.licence);

const promoForm = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, promoSimple, customExtensions, EIdsBlock.promo);

const promoFormWithoutImage = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, promoSimpleWithoutImage, customExtensions, EIdsBlock.promoWithoutImage);

const simplePromoWithBonus = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, SimplePromoWithBonusSimple, customExtensions, EIdsBlock.simplePromoWithBonus);

const simplePromoWithoutBonus = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, SimplePromoWithoutBonusSimple, customExtensions, EIdsBlock.simplePromoWithoutBonus);

const simplePromoWithBonusStarzbet = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, SimplePromoWithBonusSimpleStarzbet, customExtensions, EIdsBlock.simplePromoWithBonusThemeTwo);

const simplePromoWithoutBonusStarzbet = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, SimplePromoWithoutBonusSimpleStarzbet, customExtensions, EIdsBlock.simplePromoWithoutBonusThemeTwo);

const games = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, GamesSimple, customExtensions, EIdsBlock.games);

const gameLabel = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, GameLabelSimple, customExtensions, EIdsBlock.gameLabel);

const gamesWithImage = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, GamesSimpleWithImage, customExtensions, EIdsBlock.games);

const gameLabelWithImage = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, GameLabelSimpleWithImage, customExtensions, EIdsBlock.gameLabel);

const infoTitle = (customExtensions: IExtensions, isOneOf?: boolean) =>
  getCorrectForm(isOneOf, infoTitleSimple, customExtensions, EIdsBlock.infoTitle);

const simpleText = (customExtensions: IExtensions) => simpleField({
  componentType: EComponentsType.textInput,
  extensions: getRequiredValidator(customExtensions.required),
  customExtensions,
});

const phone = (customExtensions: IExtensions) => simpleField({
  componentType: EComponentsType.phone,
  extensions: getRequiredValidator(customExtensions.required),
  customExtensions,
});

const textEditorField = (customExtensions: IExtensions) => simpleObjectField({
  title: cmsui_general_richText,
  componentType: EComponentsType.textEditor,
  multi: true,
  customExtensions,
});

//todo @DS refactor this shit id1
const fileField = (customExtensions: IExtensions) => {
  const obj = simpleObjectField({
    componentType: EComponentsType.fileField,
    extensions: fileExtensions(customExtensions.required),
    customExtensions,
  });

  return customExtensions.inList
    ? formContainer(
      {
        containerTitle: customExtensions.simpleConfig?.blockTitle ?? cmsui_general_imageInput,
        customExtensions: customExtensions,
        fields: {
          image: obj,
        },
      },
    )
    : obj;
};

const simpleBonus = (customExtensions: IExtensions) => formContainer({
  customExtensions,
  containerTitle: cmsui_general_bonus,
  fields: {
    simpleBonus: simpleField({
      componentType: EComponentsType.chooseBonus,
      title: cmsui_general_chooseBonus,
      extensions: withValidation(requiredValidator()),
    }),
  },
});

export {
  gameLabel,
  games,
  simplePromoWithBonus,
  simplePromoWithoutBonus,
  metaContentForm,
  variablesBlockForm,
  textAreaWithVariablesForm,
  couponBlock,
  faqForm,
  richTextForm,
  gameBlock,
  variablesTableForm,
  imageFormWithTheme,
  imageForm,
  textAreaForm,
  licenceBlock,
  apkForm,
  promoForm,
  gamesWithImage,
  gameLabelWithImage,
  phone,
  simplePromoWithoutBonusStarzbet,
  promoFormWithoutImage,
  simplePromoWithBonusStarzbet,
  infoTitle,
  simpleText,
  commissionCardTypeForm,
  textEditorField,
  textBlockForm,
  bonusField,
  tagForm,
  oneOfRules,
  linksBlockForm,
  colorPickerField,
  selectField,
  fileField,
};

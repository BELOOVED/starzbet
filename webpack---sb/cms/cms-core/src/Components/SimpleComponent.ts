import { cmsui_general_simpleBlock, type TKey } from "@sb/translates/cmsui/Keys";
import { type TSimpleBlock } from "../Types";
import { type EComponentsType, EGqlIds, EIdsBlock, ETypes, type TComponentsPropsMap } from "../EnumTypes";

const defaultConfig = {
  enumCode: EGqlIds.NOOP,
  required: false,
  withoutWrapper: true,
  blockTitle: cmsui_general_simpleBlock as TKey,
  componentProps: undefined,
};

type TDefConf<T extends EComponentsType | null> = {
  enumCode?: EGqlIds;
  required?: boolean;
  withoutWrapper?: boolean;
  listChild?: boolean;
  blockTitle?: string;
  componentProps?: T extends EComponentsType ? TComponentsPropsMap[T] : null;
  valueType?: string;
  inList?: true;
};

const SimpleComponent = <
  T extends EComponentsType | null = null,
>(id: EIdsBlock) => (
    {
      enumCode,
      required,
      withoutWrapper,
      listChild,
      blockTitle,
      componentProps,
      valueType,
      inList,
    }: TDefConf<T> = defaultConfig,
  ): TSimpleBlock => {
    const withInList = inList ? { inList } : {};

    return ({
      type: ETypes.SIMPLE,
      block: { id },
      customExtensions: {
        required: required ?? defaultConfig.required,
        listChild,
        enumCode: enumCode ?? defaultConfig.enumCode,
        simpleConfig: {
          withoutWrapper: withoutWrapper ?? defaultConfig.withoutWrapper,
          blockTitle: blockTitle ?? defaultConfig.blockTitle,
          listChild,
          componentProps: componentProps ?? defaultConfig.componentProps,
        },
        ...withInList,
        valueType,
      },
    });
  };

const createSimpleComponentFunctions = () => {
  const simpleComponentFunctions: Record<
    EIdsBlock,
    (config?: TDefConf<null>) => TSimpleBlock
  > = {} as Record<EIdsBlock, (config?: TDefConf<null>) => TSimpleBlock>;

  const enumValues = Object.values(EIdsBlock);
  for (const id of enumValues) {
    simpleComponentFunctions[id] = SimpleComponent(id);
  }

  return simpleComponentFunctions;
};

const select = SimpleComponent<EComponentsType.select>(EIdsBlock.select);

const colorPicker = SimpleComponent<EComponentsType.colorPickerField>(EIdsBlock.colorPicker);

const fileField = SimpleComponent<EComponentsType.fileField>(EIdsBlock.fileField);

const {
  tag,
  faq,
  phone,
  richText,
  imageWithTheme,
  apk,
  promo,
  promoWithoutImage,
  simplePromoWithBonus,
  simplePromoWithBonusThemeTwo,
  simplePromoWithoutBonus,
  simplePromoWithoutBonusThemeTwo,
  // infoTitle,
  linksBlock,
  commissionCardType,
  simpleText,
  // simpleBonus,
  // textBlock,
  // coupon,
  // game,
  licence,
  textAreaWithVariables,
  textArea,
  variablesBlock,
  variablesTable,
  // metaContent,
  textEditor,
  gameLabel,
  gameLabelWithImage,
  games,
  gamesWithImage,
  image,
} = createSimpleComponentFunctions();

export {
  tag,
  faq,
  phone,
  richText,
  image,
  imageWithTheme,
  apk,
  promo,
  promoWithoutImage,
  simplePromoWithBonus,
  simplePromoWithBonusThemeTwo,
  simplePromoWithoutBonus,
  simplePromoWithoutBonusThemeTwo,
  // infoTitle,
  linksBlock,
  commissionCardType,
  simpleText,
  // simpleBonus,
  // textBlock,
  // coupon,
  // game,
  licence,
  textAreaWithVariables,
  textArea,
  variablesBlock,
  variablesTable,
  // metaContent,
  textEditor,
  gameLabel,
  gameLabelWithImage,
  games,
  gamesWithImage,
  colorPicker,
  select,
  fileField,
};


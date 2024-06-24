import type { ActionCreator } from "redux";
import {
  type IDecoratorDefinition,
  type IFormAction,
  type IWithFormsState,
  submittingExtension,
  type TFieldDefs,
  type TFormExtension,
  touchedExtension,
  validationExtension,
  withValidation,
} from "@sb/form-new";
import { entries, isNil, isNotNil } from "@sb/utils";
import { type TBlockDSL, type TTaxonomy } from "../../Types";
import { BLOCK_TYPE, CURRENT_LOCALE, VARIABLES } from "../../Constants";
import { EPlatformBlockMap, EComponentsType } from "../../EnumTypes";
import { isDynamic, isPlatformTaxonomy, isRequired } from "../../Utils/CMSTypeGuards";
import { formContainer, simpleField } from "../../Utils/CMSFieldBuilders";
import { childValidator } from "../../CMSValidations";
import { type IDefByTaxonomy } from "../../Interfaces";
import { testBlock } from "./CMSTaxonomy";
import { blockMap } from "./BlockMap";
import { roundDynamicPages, roundStaticPages } from "./PageDefCreator";
import { roundBlocks } from "./BlockDefCreator";

const taxonomyCreator =<State extends IWithFormsState> (
  taxonomy: TTaxonomy,
  decorators: IDecoratorDefinition<ActionCreator<IFormAction>, State>[],
  customExtensions: TFormExtension<State>[] = [],
): IDefByTaxonomy<State> => {
  const roundTax = (tax: TTaxonomy) => {
    // this fn iterate to taxonomy, and create form definition
    let taxonomyDefWithoutBlockType: TFieldDefs = {};

    if (isPlatformTaxonomy(tax)) {
      taxonomyDefWithoutBlockType = entries(tax.pages).reduce(
        (acc, value) => {
          if (isNil(value) || isNil(value[1])) {
            return acc;
          }
          const [childKey, childValue] = value;

          if (isRequired(childKey, childValue)) {
            return ({
              ...acc,
              ...roundStaticPages(childValue),
            });
          }
          if (isDynamic(childKey, childValue)) {
            return ({
              ...acc,
              ...roundDynamicPages(childValue),
            });
          }

          return acc;
        },
        {},
      );
    }
    const blocksMap = tax[BLOCK_TYPE] as Record<EPlatformBlockMap, TBlockDSL>;
    // blockObj include our block
    if (isNil(blocksMap)) {
      return taxonomyDefWithoutBlockType;
    }
    const blockObj = entries(blocksMap).reduce(
      (acc, [key, value]) => {
        if (isNotNil(value)) {
          return ({
            ...acc,
            [key]: blockMap(value, key),
          });
        }

        return acc;
      },
      {},
    );

    const taxonomyDefWithBlockType: TFieldDefs = {
      ...taxonomyDefWithoutBlockType,
      [BLOCK_TYPE]: formContainer({
        fields: blockObj,
      }),
    };

    return taxonomyDefWithBlockType;
  };

  return ({
    mainDefinitions: {
      extensions: [validationExtension, submittingExtension, touchedExtension, ...customExtensions],
      decorators: decorators,
      form: formContainer({
        componentType: EComponentsType.mainContainer,
        fields: {
          ...roundTax(taxonomy),
          [VARIABLES]: formContainer({
            fields: {
              ...roundBlocks(taxonomy[VARIABLES]),
            },
            extensions: withValidation(childValidator()),
          }),
          [CURRENT_LOCALE]: simpleField(),
        },
      }),
    },
    testDefinitions: blockMap(testBlock(), EPlatformBlockMap.E2ETest),
  });
};

export { taxonomyCreator };

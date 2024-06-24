import { type IWithFormsState, type TFieldValue, type TSyncValidator, validationRules } from "@sb/form-new";
import { isGradientColorRegExp, isHexColor, isNotNil, isRgbOrRgbaColor, type TExplicitAny } from "@sb/utils";
import { type IOptions } from "@sb/translator";
import {
  cmsui_form_validation_colorTypeIncorrect,
  cmsui_form_validation_invalidChild,
  cmsui_form_validation_maxGridSize,
  cmsui_form_validation_required,
  type TKey,
} from "@sb/translates/cmsui/Keys";

const CMSBonusSizeValidator = (gridCountBonusSize: number): TSyncValidator<string> => (value) => {
  // grid bonus size cannot be below then 0
  if (isNotNil(value) && (isNaN(+value) || (gridCountBonusSize < +value || +value < 1))) {
    return ({ tKey: cmsui_form_validation_maxGridSize, options: { count: gridCountBonusSize } });
  }

  return undefined;
};

const backgroundColorValidator = (): TSyncValidator<string> => (value) => {
  if (isNotNil(value) && !(isHexColor(value) || isRgbOrRgbaColor(value) || isGradientColorRegExp(value))) {
    return ({ tKey: cmsui_form_validation_colorTypeIncorrect });
  }

  return undefined;
};

type TValidatorResult<TKey extends string> = {
  tKey: TKey;
  options?: IOptions;
};

// copypast from javascript/packages/adminui-core/src/Utils/FormUtils/ValidationRules.ts
const decorateRuleFactory = <TKey extends string, State extends IWithFormsState>() => <A extends TExplicitAny[], V extends TFieldValue>(
  defaultTKey: TKey,
  validatorFactory: (...args: A) => TSyncValidator<V, TExplicitAny>,
  optionsComposer?: (...args: A) => IOptions,
) => (tKey = defaultTKey, ...factoryArgs: A): TSyncValidator<V, State, TValidatorResult<TKey>> => {
    const validator = validatorFactory(...factoryArgs);

    return (...validatorArgs) => {
      const result = validator(...validatorArgs);

      if (isNotNil(result)) {
        return {
          tKey,
          options: optionsComposer ? optionsComposer(...factoryArgs) : {},
        };
      }

      return undefined;
    };
  };

// copypast from javascript/packages/adminui/src/Bundles/App/Utils/FormUtils/ValidationRules.ts
const decorateRule = decorateRuleFactory<TKey, IWithFormsState>();

const requiredValidator = decorateRule(
  cmsui_form_validation_required,
  validationRules.required,
);

const childValidator = decorateRule(
  cmsui_form_validation_invalidChild,
  validationRules.childValidation,
);

export {
  CMSBonusSizeValidator,
  backgroundColorValidator,
  requiredValidator,
  childValidator,
};

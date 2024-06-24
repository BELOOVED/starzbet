import { memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector, withCondition, withParamCondition } from "@sb/utils";
import {
  platformui_starzbet_depositPromoBonusSelect_placeholder,
  platformui_starzbet_depositPromoBonusSelect_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { type ISelectOption } from "../../../../../../common/Components/Field/SelectModel";
import {
  availableDepositPromotionBonusOptionsSelector,
  isAnyDepositPromotionBonusesAvailableSelector,
} from "../../../../../Store/Bonuses/Selectors/DepositPromotionBonusesSelectors";
import { availableBonusByIdNotNilSelectors, isAvailableBonusExistSelector } from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { TranslateRecord } from "../../../../../Components/TranslateRecord/TranslateRecord";
import { DEPOSIT_BASE_FIELD_PATHS } from "../../../../../Store/Banking/Form/BaseFormModel";

const Option = withParamCondition(
  isAvailableBonusExistSelector,
  ["value"],
  memo<ISelectOption<string>>(({ value }) => {
    const bonusName = useParamSelector(availableBonusByIdNotNilSelectors.name, [value]);

    return (
      <TranslateRecord record={bonusName} />
    );
  }),
);
Option.displayName = "Option";

const DepositPromotionBonusField = withCondition(
  isAnyDepositPromotionBonusesAvailableSelector,
  memo(() => {
    const [t] = useTranslation();

    const options = useSelector(availableDepositPromotionBonusOptionsSelector);

    return (
      <SelectField<string>
        fieldPath={DEPOSIT_BASE_FIELD_PATHS.depositPromotionBonusId}
        options={options}
        placeholder={t.plain(platformui_starzbet_depositPromoBonusSelect_placeholder)}
        label={t(platformui_starzbet_depositPromoBonusSelect_title)}
        optionComponent={Option}
        allowClear
      />
    );
  }),
);
DepositPromotionBonusField.displayName = "DepositPromotionBonusField";

export { DepositPromotionBonusField };


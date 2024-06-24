import { createMemoSelector, createSimpleSelector, getNotNil, type TSelector } from "@sb/utils";
import { platformConfigSystemLocaleSelector } from "../../../../common/Store/Config/Selectors/ConfigSelectors";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { localClientTimeZoneOffsetSelector } from "../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { bonusTemplateDataSelectorCombiner, bonusTemplateDataSelectorCombinerCms } from "../Utils/BonusTemplateUtils";
import { bonusForCMSByIdSelector, notNilBonusSelector } from "./BonusesSelectors";

type TTemplateDataSelector = TSelector<
  TMixAppState,
  ReturnType<typeof bonusTemplateDataSelectorCombiner>,
  [bonusId: string, forAvailable: boolean]
>;

const bonusTemplateDataSelector: TTemplateDataSelector = createMemoSelector(
  [
    notNilBonusSelector,
    playerCurrencySelector,
    localClientTimeZoneOffsetSelector,
    localeSelector,
    platformConfigSystemLocaleSelector,
  ],
  bonusTemplateDataSelectorCombiner,
);

const notNilBonusForCMSByIdSelector = createSimpleSelector(
  [bonusForCMSByIdSelector],
  (bonus) =>
    getNotNil(bonus, ["notNilBonusForCMSByIdSelector"], "bonus"),
);

const bonusTemplateCMSDataSelector: TTemplateDataSelector = createMemoSelector(
  [
    notNilBonusForCMSByIdSelector,
    playerCurrencySelector,
    localClientTimeZoneOffsetSelector,
    localeSelector,
    platformConfigSystemLocaleSelector,
  ],
  bonusTemplateDataSelectorCombinerCms,
);

export {
  type TTemplateDataSelector,
  bonusTemplateDataSelector,
  bonusTemplateCMSDataSelector,
};

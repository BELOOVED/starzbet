import { useSelector } from "react-redux";
import { type ELocale, isNil, isNotNil, isNotVoid, isVoid, type TExplicitAny } from "@sb/utils";
import type { TCms_MultiLang_Type_Fragment } from "@sb/graphql-client/CmsUI";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import type { TPlatform_Bonus_Template_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TMixAppState } from "../../sportsbookui/Store/CreateMixInitialState";
import { localeSelector } from "../Store/Locale/Selectors/localeSelector";
import { isAllElementInArrayNotNil } from "../Store/CMS/Utils/Helpers";
import { type TArrayNullable } from "../Themes/Starzbet/Model/FooterInterfaceAndTypes";

const useCorrectTextByLocale = (array: TArrayNullable<TCms_MultiLang_Type_Fragment | TTranslateRecord_Fragment>) => {
  const systemLocale = useSelector<TMixAppState, ELocale>(localeSelector);

  if (!isAllElementInArrayNotNil(array)) {
    return null;
  }

  const correctTranslate = array.find(({ locale }) => systemLocale === locale)?.translate;

  if(isNil(correctTranslate) || isVoid(correctTranslate.trim())) {
    return array.find(({ translate }) => isNotNil(translate) && isNotVoid(translate.trim()))?.translate;
  }

  return correctTranslate;
};

const useGetBonusInfo = (bonusInfo?: TPlatform_Bonus_Template_Fragment) => {
  const correctName = useCorrectTextByLocale(bonusInfo?.name as TExplicitAny);

  const correctTitle = useCorrectTextByLocale(bonusInfo?.descriptionTitle as TExplicitAny);

  const correctBonusRules = useCorrectTextByLocale(bonusInfo?.descriptionBonusRules as TExplicitAny);

  if (isNil(correctName) && isNil(correctTitle) && isNil(correctBonusRules)) {
    return null;
  }

  return ({ correctName, correctTitle, correctBonusRules });
};

export { useCorrectTextByLocale, useGetBonusInfo };

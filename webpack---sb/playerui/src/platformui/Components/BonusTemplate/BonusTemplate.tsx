import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { isVoid, type TNullable, type TWithRequired, useParamSelector } from "@sb/utils";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import classes from "./BonusTemplate.module.css";
import { platformConfigSystemLocaleSelector } from "../../../common/Store/Config/Selectors/ConfigSelectors";
import { localeSelector } from "../../Store/Locale/Selectors/localeSelector";
import {
  bonusTemplateCMSDataSelector,
  bonusTemplateDataSelector,
  type TTemplateDataSelector,
} from "../../Store/Bonuses/Selectors/BonusTemplateDataSelector";
import { replaceTemplateValues } from "../../Store/Bonuses/Utils/BonusTemplateUtils";
import { getTranslatedText } from "../TranslateRecord/TranslateRecord";

interface IBonusTemplateProps {
  note: TNullable<TTranslateRecord_Fragment[]>;
  bonusId: string;
  className?: string;
  forAvailable?: boolean;
}

type TBonusTemplateBase = TWithRequired<IBonusTemplateProps, "note"> & {
  selector: TTemplateDataSelector;
}

const BonusTemplateBase = memo<TBonusTemplateBase>(({
  note,
  className,
  bonusId,
  selector,
  forAvailable = false,
}) => {
  const locale = useSelector(localeSelector);
  const systemLocale = useSelector(platformConfigSystemLocaleSelector);
  const playerTranslate = getTranslatedText(note, locale, systemLocale);

  const [staticData, dynamicData] = useParamSelector(selector, [bonusId, forAvailable]);

  const replaced = playerTranslate ? replaceTemplateValues(playerTranslate, staticData, dynamicData) : "";

  const innerHtml = { __html: replaced };

  return (
    <div className={clsx(classes.defaultTemplateWrapper, className)}>
      <div dangerouslySetInnerHTML={innerHtml} />
    </div>
  );
});
BonusTemplateBase.displayName = "BonusTemplateBase";

const BonusTemplate = memo<IBonusTemplateProps>((props) => {
  if (isVoid(props.note)) {
    return null;
  }

  return <BonusTemplateBase {...props} selector={bonusTemplateDataSelector} />;
});
BonusTemplate.displayName = "BonusTemplate";

const BonusTemplateCMS = memo<IBonusTemplateProps>((props) => {
  if (isVoid(props.note)) {
    return null;
  }

  return <BonusTemplateBase {...props} selector={bonusTemplateCMSDataSelector} forAvailable={true} />;
});
BonusTemplateCMS.displayName = "BonusTemplateCMS";

export type { IBonusTemplateProps };

export { BonusTemplate, BonusTemplateCMS };

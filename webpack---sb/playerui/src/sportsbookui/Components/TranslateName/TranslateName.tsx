import { useSelector } from "react-redux";
import { memo } from "react";
import { getPredefinedName } from "@sb/betting-core/TranslateEntity/GetPredefinedName";
import { type TTranslateItem, type TTranslateRecord } from "@sb/utils";
import { localeSelector } from "../../Store/Locale/LocaleSelector";
import { normalizeTranslatedName } from "../../Utils/NormalizeTranslatedName";

interface ITranslateNameProps{
  name:  TTranslateRecord | TTranslateItem[];
}

const TranslateName = memo<ITranslateNameProps>(({ name }) => {
  const locale = useSelector(localeSelector);

  return (
    <>
      {getPredefinedName(normalizeTranslatedName(name), locale)}
    </>
  );
});
TranslateName.displayName = "TranslateName";

export { TranslateName };

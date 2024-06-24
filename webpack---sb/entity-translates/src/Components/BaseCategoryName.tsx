import { memo } from "react";
import { categoryIconTKeys } from "@sb/betting-core/SharedTKeys/CategoryIconTKeys";
import { useTranslation } from "@sb/translator";
import { getCategoryTranslate } from "@sb/betting-core/TranslateEntity/LineTranslates";

type TSportsbookCategoryIcon = keyof typeof categoryIconTKeys | null

interface IBaseCategoryNameProps {
  id: string;
  name: string;
  icon?: TSportsbookCategoryIcon;
}

const BaseCategoryName = memo<IBaseCategoryNameProps>(({
  id,
  name,
  icon,
}) => {
  const [t] = useTranslation();

  const tKey = icon ? categoryIconTKeys[icon] : null;

  const fallback = tKey
    ? t.plain(tKey, { skipTemplateRendering: true })
    : name;

  return t(getCategoryTranslate(id), { fallback });
});
BaseCategoryName.displayName = "BaseCategoryName";

export { BaseCategoryName };

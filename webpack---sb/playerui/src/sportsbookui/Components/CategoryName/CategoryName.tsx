// @ts-nocheck
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { BaseCategoryName } from "@sb/entity-translates";
import { categoryByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";

const CategoryName = memo<IWithId>(({ id }) => {
  const { name, icon } = useParamSelector(categoryByIdSelector, [id]);

  return (
    <BaseCategoryName id={id} name={name} icon={icon} />
  );
});
CategoryName.displayName = "CategoryName";

export { CategoryName };

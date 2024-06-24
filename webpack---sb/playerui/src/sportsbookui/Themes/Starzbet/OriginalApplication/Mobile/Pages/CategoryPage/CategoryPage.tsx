// @ts-nocheck
import { memo } from "react";
import { entriesSelectorByCategoryId } from "../../../Selectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";

const CategoryPage = memo(({ match: { params: { id } } }) => {
  const deps = [id];

  return (
    <EventsVirtualContainer
      selectorFactory={entriesSelectorByCategoryId}
      deps={deps}
    />
  );
});
CategoryPage.displayName = "CategoryPage";

export { CategoryPage };

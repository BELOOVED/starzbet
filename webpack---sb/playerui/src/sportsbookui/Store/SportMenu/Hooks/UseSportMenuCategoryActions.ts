import { useActionWithBind } from "@sb/utils";
import { sportMenuAddCategoryIdAction, sportMenuRemoveCategoryIdAction } from "../SportMenuActions";

const useSportMenuCategoryActions = (id: string, active: boolean) => {
  const remove = useActionWithBind(sportMenuRemoveCategoryIdAction, id);
  const add = useActionWithBind(sportMenuAddCategoryIdAction, id);

  return active
    ? remove
    : add;
};

export { useSportMenuCategoryActions };

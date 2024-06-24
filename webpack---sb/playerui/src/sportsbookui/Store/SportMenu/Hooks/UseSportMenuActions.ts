import { type Action } from "redux";
import { type TActionCreator, useActionWithBind } from "@sb/utils";
import { sportMenuAddSportIdAction, sportMenuRemoveSportIdAction } from "../SportMenuActions";

const useMenuActions = (id: string, active: boolean, addSportAction: TActionCreator<string[], Action>) => {
  const add = useActionWithBind(addSportAction, id);
  const remove = useActionWithBind(sportMenuRemoveSportIdAction, id);

  return active
    ? remove
    : add;
};

const useSportMenuActions = (id: string, active: boolean) => useMenuActions(id, active, sportMenuAddSportIdAction);

export { useSportMenuActions };

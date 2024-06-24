import { useActionWithBind } from "@sb/utils";
import { sportMenuAddTournamentIdAction, sportMenuRemoveTournamentIdAction } from "../SportMenuActions";

const useSportMenuTournamentActions = (id: string, active: boolean) => {
  const remove = useActionWithBind(sportMenuRemoveTournamentIdAction, id);
  const add = useActionWithBind(sportMenuAddTournamentIdAction, id);

  return active
    ? remove
    : add;
};

export { useSportMenuTournamentActions };

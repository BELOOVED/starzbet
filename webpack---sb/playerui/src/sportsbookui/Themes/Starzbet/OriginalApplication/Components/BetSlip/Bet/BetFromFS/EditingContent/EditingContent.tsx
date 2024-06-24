import { memo } from "react";
import { useSelector } from "react-redux";
import { editableBetSelector, editingByBetIdSelector } from "../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { EventStatus } from "../../BaseBet/EventStatus/EventStatus";
import { OutcomeStatus } from "../../BaseBet/OutcomeStatus/OutcomeStatus";
import { AddSelections } from "./AddSelections/AddSelections";
import { EditPick } from "./EditPick/EditPick";

const EditingContentBase = memo(() => {
  const editableBet = useSelector(editableBetSelector);
  const applied = editableBet?.picks.filter(({ applied }) => applied) ?? [];
  const notApplied = editableBet?.picks.filter(({ applied }) => !applied) ?? [];

  return (
    <>
      <AddSelections />

      {
        notApplied.map((pick) => (
          <EditPick
            {...pick}
            key={pick.id}
            editableBet={editableBet}
            eventStatus={EventStatus}
            outcomeStatus={OutcomeStatus}
          />
        ))
      }

      {
        applied.map((pick) => (
          <EditPick
            {...pick}
            key={pick.id}
            editableBet={editableBet}
            eventStatus={EventStatus}
            outcomeStatus={OutcomeStatus}
          />
        ))
      }
    </>
  );
});
EditingContentBase.displayName = "EditingContentBase";

const EditingContent = memo<IWithId>(({ id }) => {
  const editing = useSelector(editingByBetIdSelector(id));

  if (!editing) {
    return null;
  }

  return <EditingContentBase />;
});
EditingContent.displayName = "EditingContent";

export { EditingContent };

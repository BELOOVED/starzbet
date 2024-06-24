import { createRootReducer } from "@sb/utils";
import { closedDgaGameAction, fetchedSnapshotAction, openedDgaGameAction } from "../PragmaticDgaActions";
import { pragmaticDgaReceivedReducer } from "./PragmaticDgaReceivedReducer";
import { openedDgaGameReducer } from "./OpenedDgaGameReducer";
import { closedDgaGameReducer } from "./ClosedDgaGameReducer";

const pragmaticDgaRootReducer = createRootReducer([
  [pragmaticDgaReceivedReducer, fetchedSnapshotAction],
  [openedDgaGameReducer, openedDgaGameAction],
  [closedDgaGameReducer, closedDgaGameAction],
]);

export { pragmaticDgaRootReducer };

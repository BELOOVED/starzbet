import { createRootReducer } from "@sb/utils";
import { platformCPFClearAction } from "../FormActions";
import { platformCPFClearReducer } from "./platformCPFClearReducer";

const platformFormRootReducer = createRootReducer([
  [platformCPFClearReducer, platformCPFClearAction],
]);

export { platformFormRootReducer };

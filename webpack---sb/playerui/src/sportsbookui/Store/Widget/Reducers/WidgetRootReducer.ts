import { createRootReducer } from "@sb/utils";
import { widgetControllerInitializeAction } from "../WidgetActions";
import { widgetControllerInitializeReducer } from "./WidgetControllerInitializeReducer";

const widgetRootReducer = createRootReducer([
  [widgetControllerInitializeReducer, widgetControllerInitializeAction],
]);

export { widgetRootReducer };

import { type IWithWidgetState } from "../WidgetState";

const widgetControllerInitializeSelector = ({ widget }: IWithWidgetState) => widget.initialize;

export { widgetControllerInitializeSelector };

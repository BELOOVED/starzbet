import { type IWithWidgetState } from "../WidgetState";

const widgetControllerInitializeReducer = (state: IWithWidgetState) => ({
  ...state,
  widget: {
    ...state.widget,
    initialize: true,
  },
});

export { widgetControllerInitializeReducer };

interface IWithWidgetState {
  widget: {
    initialize: boolean;
  };
}

const widgetState = {
  widget: {
    initialize: false,
  },
};

export { widgetState, type IWithWidgetState };

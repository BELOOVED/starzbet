const changeViewportSizeAction = (width: number) => ({
  type: "VIEWPORT_CHANGE_SIZE",
  payload: { width },
});

const changeInnerScrollSizeAction = (width: number) => ({
  type: "VIEWPORT_CHANGE_INNER_SCROLL_SIZE",
  payload: { width },
});

export { changeViewportSizeAction, changeInnerScrollSizeAction };
